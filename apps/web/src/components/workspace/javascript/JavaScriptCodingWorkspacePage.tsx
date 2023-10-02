'use client';

import type {
  QuestionJavaScript,
  QuestionMetadata,
} from '~/components/questions/common/QuestionsTypes';

import JavaScriptCodingWorkspaceSection from './JavaScriptCodingWorkspaceSection';
import useCodingWorkspaceWorkingLanguage from '../common/useCodingWorkspaceWorkingLanguage';

type Props = Readonly<{
  canViewPremiumContent: boolean;
  nextQuestions: ReadonlyArray<QuestionMetadata>;
  question: QuestionJavaScript;
  similarQuestions: ReadonlyArray<QuestionMetadata>;
}>;

export default function JavaScriptCodingWorkspacePage({
  canViewPremiumContent,
  question,
  nextQuestions,
  similarQuestions,
}: Props) {
  const [language, setLanguage] = useCodingWorkspaceWorkingLanguage();

  return (
    <JavaScriptCodingWorkspaceSection
      canViewPremiumContent={canViewPremiumContent}
      language={language}
      nextQuestions={nextQuestions}
      question={question}
      similarQuestions={similarQuestions}
      timeoutLoggerInstance="workspace.js"
      onLanguageChange={setLanguage}
    />
  );
}
