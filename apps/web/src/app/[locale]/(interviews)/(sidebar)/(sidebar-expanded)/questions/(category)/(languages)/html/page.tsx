import type { Metadata } from 'next/types';

import InterviewsQuestionsCategoryLanguagePage from '~/components/interviews/questions/listings/category/InterviewsQuestionsCategoryLanguagePage';

import { readAllFrontEndInterviewGuides } from '~/db/guides/GuidesReader';
import { fetchQuestionCompletionCount } from '~/db/QuestionsCount';
import {
  fetchQuestionsListCoding,
  fetchQuestionsListQuiz,
} from '~/db/QuestionsListReader';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

const language = 'html';

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
        'Top HTML front end interview coding questions to practice, with detailed solutions and explanations by ex-interviewers at FAANG.',
      description: 'Description of Interview Questions page',
      id: 'JLvCfD',
    }),
    locale,
    pathname: `/questions/${language}`,
    title: intl.formatMessage({
      defaultMessage: 'Practice HTML Interview Questions with Solutions',
      description: 'Title of interview Questions page',
      id: 'eywycX',
    }),
  });
}

export default async function Page({ params }: Props) {
  const { locale } = params;
  const [
    { questions: questionsCoding },
    { questions: questionsQuiz },
    questionCompletionCount,
    guides,
  ] = await Promise.all([
    fetchQuestionsListCoding(locale),
    fetchQuestionsListQuiz(locale),
    fetchQuestionCompletionCount(['javascript', 'user-interface', 'quiz']),
    readAllFrontEndInterviewGuides(params.locale),
  ]);

  const questionsCodingHTML = questionsCoding.filter((metadata) =>
    metadata.languages.includes(language),
  );
  const questionsQuizHTML = questionsQuiz.filter((metadata) =>
    metadata.topics.includes(language),
  );

  return (
    <InterviewsQuestionsCategoryLanguagePage
      guides={guides}
      language={language}
      questionCompletionCount={questionCompletionCount}
      questionsCoding={questionsCodingHTML}
      questionsQuiz={questionsQuizHTML}
    />
  );
}
