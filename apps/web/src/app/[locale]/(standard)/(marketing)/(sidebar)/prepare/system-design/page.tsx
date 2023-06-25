import type { Metadata } from 'next/types';

import { fetchQuestionsListCount } from '~/db/QuestionsListReader';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

import PrepareSystemDesignPage from './PrepareSystemDesignPage';

export const dynamic = 'force-static';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);

  return defaultMetadata({
    description: intl.formatMessage({
      defaultMessage:
        'Top front end interview system design questions to practice, with detailed solutions and explanations by ex-interviewers at FAANG.',
      description: 'Description of Interview Preparation System Design page',
      id: 'OGpZxl',
    }),
    locale,
    pathname: '/prepare/system-design',
    title: intl.formatMessage({
      defaultMessage:
        'Practice Front End System Design Interview Questions with Solutions',
      description: 'Title of Interview Preparation System Design page',
      id: 'srrlrR',
    }),
  });
}

export default async function Page() {
  const [questionTotalAvailableCount] = await Promise.all([
    fetchQuestionsListCount(),
  ]);

  return (
    <PrepareSystemDesignPage
      questionTotalAvailableCount={questionTotalAvailableCount}
    />
  );
}
