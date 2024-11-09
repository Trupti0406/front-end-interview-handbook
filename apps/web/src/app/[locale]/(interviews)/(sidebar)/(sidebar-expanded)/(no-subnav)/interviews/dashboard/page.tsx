import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import {
  INTERVIEWS_REVAMP_2024,
  INTERVIEWS_REVAMP_BOTTOM_CONTENT,
} from '~/data/FeatureFlags';

import InterviewsDashboardPage from '~/components/interviews/revamp-dashboard/InterviewsDashboardPage';

import { fetchInterviewListingBottomContent } from '~/db/contentlayer/InterviewsListingBottomContentReader';
import { fetchInterviewsStudyLists } from '~/db/contentlayer/InterviewsStudyListReader';
import {
  fetchQuestionsListCoding,
  fetchQuestionsListQuiz,
  fetchQuestionsListSystemDesign,
} from '~/db/QuestionsListReader';
import { categorizeQuestionsByFrameworkAndLanguage } from '~/db/QuestionsUtils';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);

  return defaultMetadata({
    locale,
    pathname: '/interviews/dashboard',
    title: intl.formatMessage({
      defaultMessage: 'Dashboard - Track your interview preparation progress',
      description: 'Title of Get Started page',
      id: '1nme1Z',
    }),
  });
}

export default async function Page({ params }: Props) {
  if (!INTERVIEWS_REVAMP_2024) {
    return notFound();
  }

  const { locale } = params;

  const [
    { questions: quizQuestions },
    { questions: codingQuestions },
    { questions: systemDesignQuestions },
    bottomContent,
    companyGuides,
    focusAreas,
    studyPlans,
  ] = await Promise.all([
    fetchQuestionsListQuiz(locale),
    fetchQuestionsListCoding(locale),
    fetchQuestionsListSystemDesign(locale),
    fetchInterviewListingBottomContent('dashboard'),
    fetchInterviewsStudyLists('company'),
    fetchInterviewsStudyLists('focus-area'),
    fetchInterviewsStudyLists('study-plan'),
  ]);
  const { framework, language } = categorizeQuestionsByFrameworkAndLanguage({
    codingQuestions,
    quizQuestions,
  });
  const sortedGuides = companyGuides
    .slice()
    .sort((a, b) => a.ranking - b.ranking);

  return (
    <InterviewsDashboardPage
      bottomContent={
        INTERVIEWS_REVAMP_BOTTOM_CONTENT ? bottomContent : undefined
      }
      companyGuides={sortedGuides}
      focusAreas={focusAreas}
      questions={{
        codingQuestions,
        frameworkQuestions: framework,
        languageQuestions: language,
        quizQuestions,
        systemDesignQuestions,
      }}
      studyPlans={studyPlans}
    />
  );
}