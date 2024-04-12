import clsx from 'clsx';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import { useSessionStorage } from 'usehooks-ts';

import { trpc } from '~/hooks/trpc';

import { useUserProfile } from '~/components/global/UserProfileProvider';
import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';
import useQuestionCodingFilters from '~/components/interviews/questions/listings/filters/hooks/useQuestionCodingFilters';
import useQuestionCodingSorting from '~/components/interviews/questions/listings/filters/hooks/useQuestionCodingSorting';
import { QuestionsCodingFiltersNamespaceKey } from '~/components/interviews/questions/listings/filters/hooks/useQuestionsCodingFiltersNamespace';
import useQuestionsWithCompletionStatus from '~/components/interviews/questions/listings/filters/hooks/useQuestionsWithCompletionStatus';
import {
  filterQuestions,
  sortQuestionsMultiple,
} from '~/components/interviews/questions/listings/filters/QuestionsProcessor';
import Button from '~/components/ui/Button';
import CodingWorkspaceQuestionListSlideOut from '~/components/workspace/common/questions/CodingWorkspaceQuestionListSlideOut';

import { hashQuestion } from '~/db/QuestionsUtils';

export default function CodingWorkspaceQuestionListSlideOutButton({
  metadata,
}: Readonly<{
  metadata: QuestionMetadata;
}>) {
  const { userProfile } = useUserProfile();
  const { isLoading, data: codingQuestions } = trpc.questions.coding.useQuery();
  const questionsWithCompletionStatus = useQuestionsWithCompletionStatus(
    codingQuestions ?? [],
  );

  const [namespace] = useSessionStorage(
    QuestionsCodingFiltersNamespaceKey,
    'prepare-coding',
  );
  // Filtering.
  const { filters } = useQuestionCodingFilters({
    namespace,
  });
  // Sorting.
  const { defaultSortFields, premiumSortFields } = useQuestionCodingSorting();
  // Processing.
  const sortedQuestions = sortQuestionsMultiple(
    questionsWithCompletionStatus,
    userProfile?.isPremium
      ? defaultSortFields
      : // Show free questions first if user is not a premium user.
        defaultSortFields.concat(premiumSortFields),
  );
  const processedQuestions = filterQuestions(
    sortedQuestions,
    filters.map(([_, filterFn]) => filterFn),
  );

  // Non-completed questions including the current question.
  const possibleQuestions = processedQuestions.filter(
    (question) =>
      !question.isCompleted ||
      hashQuestion(question.format, question.slug) ===
        hashQuestion(metadata.format, metadata.slug),
  );

  const currentQuestionIndex = possibleQuestions.findIndex(
    (question) =>
      hashQuestion(question.format, question.slug) ===
      hashQuestion(metadata.format, metadata.slug),
  );

  // The current question might not appear in the filtered list,
  // but `currentQuestionIndex` will return -1 and the next question
  // will be 0 index which is the first question in the processed list.
  const prevQuestion = possibleQuestions[currentQuestionIndex - 1];
  const prevQuestionButtonDisabled = isLoading || prevQuestion == null;

  const nextQuestion = possibleQuestions[currentQuestionIndex + 1];
  const nextQuestionButtonDisabled = isLoading || nextQuestion == null;

  return (
    <div>
      <div className="flex gap-x-2">
        <Button
          addonPosition="start"
          className={clsx(prevQuestionButtonDisabled && 'opacity-50')}
          href={prevQuestionButtonDisabled ? undefined : prevQuestion?.href}
          icon={RiArrowLeftSLine}
          isDisabled={prevQuestionButtonDisabled}
          isLabelHidden={true}
          label="Previous question"
          size="xs"
          tooltip={
            prevQuestionButtonDisabled
              ? undefined
              : `Previous question: ${prevQuestion?.title}`
          }
          variant="secondary"
        />
        <CodingWorkspaceQuestionListSlideOut
          isDisabled={isLoading}
          questions={questionsWithCompletionStatus}
        />
        <Button
          addonPosition="start"
          className={clsx(nextQuestionButtonDisabled && 'opacity-50')}
          href={nextQuestionButtonDisabled ? undefined : nextQuestion?.href}
          icon={RiArrowRightSLine}
          isDisabled={nextQuestionButtonDisabled}
          isLabelHidden={true}
          label="Next question"
          size="xs"
          tooltip={
            nextQuestionButtonDisabled
              ? undefined
              : `Next question: ${nextQuestion?.title}`
          }
          variant="secondary"
        />
      </div>
    </div>
  );
}
