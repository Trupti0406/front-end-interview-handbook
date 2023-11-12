import fs from 'fs';
import path from 'path';

import type { QuestionMetadata } from '../components/interviews/questions/common/QuestionsTypes';
import { getQuestionsListOutFilenameCoding } from '../db/questions-bundlers/QuestionsBundlerCodingConfig';
import { readQuestionListMetadataJavaScript } from '../db/questions-bundlers/QuestionsBundlerJavaScript';
import { getQuestionsListOutFilenameJavaScript } from '../db/questions-bundlers/QuestionsBundlerJavaScriptConfig';
import { readQuestionListMetadataQuiz } from '../db/questions-bundlers/QuestionsBundlerQuiz';
import { getQuestionsListOutFilenameQuiz } from '../db/questions-bundlers/QuestionsBundlerQuizConfig';
import { readQuestionListMetadataSystemDesign } from '../db/questions-bundlers/QuestionsBundlerSystemDesign';
import { getQuestionsListOutFilenameSystemDesign } from '../db/questions-bundlers/QuestionsBundlerSystemDesignConfig';
import { readQuestionListMetadataUserInterface } from '../db/questions-bundlers/QuestionsBundlerUserInterface';
import { getQuestionsListOutFilenameUserInterface } from '../db/questions-bundlers/QuestionsBundlerUserInterfaceConfig';

async function generateQuestionsMetadata(
  genFn: (locale_: string) => Promise<ReadonlyArray<QuestionMetadata>>,
  outPath: string,
  locale = 'en-US',
) {
  const metadataList = await genFn(locale);
  const dir = path.dirname(outPath);

  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(metadataList, null, 2));
}

async function codingQuestionsMetadata(outPath: string, locale = 'en-US') {
  const [javaScriptQuestions, userInterfaceQuestions] = await Promise.all([
    readQuestionListMetadataJavaScript(locale),
    readQuestionListMetadataUserInterface(locale),
  ]);

  const combinedQuestions = [
    ...javaScriptQuestions,
    ...userInterfaceQuestions,
  ].sort((a, b) => a.title.localeCompare(b.title));

  const dir = path.dirname(outPath);

  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    outPath,
    JSON.stringify(
      combinedQuestions.filter((file) => file.published),
      null,
      2,
    ),
  );
}

async function generateQuizMetadata() {
  return await Promise.all(
    ['en-US', 'pt-BR', 'zh-CN'].map((locale) =>
      generateQuestionsMetadata(
        readQuestionListMetadataQuiz,
        getQuestionsListOutFilenameQuiz(locale),
        locale,
      ),
    ),
  );
}

export async function generateAllMetadata() {
  const locale = 'en-US';

  return await Promise.all([
    generateQuizMetadata(),
    generateQuestionsMetadata(
      readQuestionListMetadataSystemDesign,
      getQuestionsListOutFilenameSystemDesign(locale),
      locale,
    ),
    generateQuestionsMetadata(
      readQuestionListMetadataJavaScript,
      getQuestionsListOutFilenameJavaScript(locale),
      locale,
    ),
    generateQuestionsMetadata(
      readQuestionListMetadataUserInterface,
      getQuestionsListOutFilenameUserInterface(locale),
      locale,
    ),
    codingQuestionsMetadata(
      path.join(getQuestionsListOutFilenameCoding(locale)),
      locale,
    ),
  ]);
}
