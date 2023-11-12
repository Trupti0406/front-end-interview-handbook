import type { Metadata } from 'next/types';
import { ArticleJsonLd } from 'next-seo';

import { sortQuestionsMultiple } from '~/components/interviews/questions/listings/filters/QuestionsProcessor';
import CodingWorkspacePaywallPage from '~/components/workspace/common/CodingWorkspacePaywallPage';
import JavaScriptCodingWorkspacePage from '~/components/workspace/javascript/JavaScriptCodingWorkspacePage';

import { readQuestionJavaScriptContents } from '~/db/QuestionsContentsReader';
import { fetchQuestionsListCoding } from '~/db/QuestionsListReader';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';
import { getSiteUrl } from '~/seo/siteUrl';
import { fetchUser } from '~/supabase/SupabaseServerGFE';
import { createSupabaseAdminClientGFE } from '~/supabase/SupabaseServerGFE';

type Props = Readonly<{
  params: Readonly<{ locale: string; slug: string }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug: rawSlug, locale } = params;
  // So that we handle typos like extra characters.
  const slug = decodeURIComponent(rawSlug).replaceAll(/[^a-zA-Z-]/g, '');

  const intl = await getIntlServerOnly(locale);
  const { question } = readQuestionJavaScriptContents(slug, locale);

  return defaultMetadata({
    description: question.metadata.excerpt!,
    locale,
    pathname: question.metadata.href,
    title: intl.formatMessage(
      {
        defaultMessage:
          '{questionTitle} | JavaScript Front End Interview Questions with Solutions',
        description: 'Title of Javascript Front End interview questions page',
        id: 'wqIwvv',
      },
      { questionTitle: question.metadata.title },
    ),
  });
}

export default async function Page({ params }: Props) {
  const { slug: rawSlug, locale } = params;
  // So that we handle typos like extra characters.
  const slug = decodeURIComponent(rawSlug).replaceAll(/[^a-zA-Z-]/g, '');
  const supabaseAdmin = createSupabaseAdminClientGFE();

  const user = await fetchUser();
  const { question } = readQuestionJavaScriptContents(slug, locale);

  let canViewPremiumContent = false;

  if (user != null) {
    canViewPremiumContent = await Promise.resolve(
      (async () => {
        const { data: profile } = await supabaseAdmin
          .from('Profile')
          .select('*')
          .eq('id', user.id)
          .single();

        return profile?.premium ?? false;
      })(),
    );
  }

  const isQuestionLockedForUser =
    question.metadata.premium && !canViewPremiumContent;

  const { questions: codingQuestions } = await fetchQuestionsListCoding(locale);
  const nextQuestions = sortQuestionsMultiple(
    codingQuestions.filter((questionItem) =>
      question.metadata.nextQuestions.includes(questionItem.slug),
    ),
    [
      {
        field: 'difficulty',
        isAscendingOrder: true,
      },
      {
        field: 'premium',
        isAscendingOrder: true,
      },
    ],
  );
  const similarQuestions = sortQuestionsMultiple(
    codingQuestions.filter((questionItem) =>
      question.metadata.similarQuestions.includes(questionItem.slug),
    ),
    [
      {
        field: 'difficulty',
        isAscendingOrder: true,
      },
      {
        field: 'premium',
        isAscendingOrder: true,
      },
    ],
  );

  return (
    <>
      <ArticleJsonLd
        authorName={[
          {
            name: 'GreatFrontEnd',
            url: 'https://twitter.com/greatfrontend',
          },
        ]}
        datePublished="2022-11-01T08:00:00+08:00"
        description={question.metadata.excerpt!}
        images={[]}
        isAccessibleForFree={!question.metadata.premium}
        title={`Front End Coding Interview Question: ${question.metadata.title}`}
        url={`${getSiteUrl()}${question.metadata.href}`}
        useAppDir={true}
      />
      {isQuestionLockedForUser ? (
        <CodingWorkspacePaywallPage metadata={question.metadata} />
      ) : (
        <JavaScriptCodingWorkspacePage
          canViewPremiumContent={canViewPremiumContent}
          nextQuestions={nextQuestions}
          question={question}
          similarQuestions={similarQuestions}
        />
      )}
    </>
  );
}
