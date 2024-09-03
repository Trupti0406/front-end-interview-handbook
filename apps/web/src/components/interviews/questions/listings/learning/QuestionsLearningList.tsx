import { FormattedMessage, useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import { useToast } from '~/components/global/toasts/useToast';
import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';
import QuestionsCodingListWithFilters from '~/components/interviews/questions/listings/items/QuestionsCodingListWithFilters';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

import type { QuestionsCategorizedProgress } from '~/db/QuestionsUtils';

import useQuestionsWithListProgressStatus from '../filters/hooks/useQuestionsWithListProgressStatus';
import { sortQuestionsMultiple } from '../filters/QuestionsProcessor';

import { useUser } from '@supabase/auth-helpers-react';

export default function QuestionsLearningList({
  listKey,
  quizQuestions,
  codingQuestions,
  systemDesignQuestions,
  overallProgress,
  showSummarySection = true,
}: Readonly<{
  codingQuestions: ReadonlyArray<QuestionMetadata>;
  listKey: string;
  overallProgress: QuestionsCategorizedProgress;
  quizQuestions: ReadonlyArray<QuestionMetadata>;
  showSummarySection?: boolean;
  systemDesignQuestions: ReadonlyArray<QuestionMetadata>;
}>) {
  const intl = useIntl();
  const user = useUser();
  const trpcUtils = trpc.useUtils();
  const { data: questionListSession, isLoading: isQuestionListSessionLoading } =
    trpc.questionLists.getActiveSession.useQuery(
      {
        listKey,
      },
      {
        enabled: !!user,
      },
    );

  const { showToast } = useToast();

  const questionsWithProgress = useQuestionsWithListProgressStatus(listKey, [
    ...codingQuestions,
    ...quizQuestions,
    ...systemDesignQuestions,
  ]);
  const markCompleteMutation = trpc.questionLists.markComplete.useMutation({
    onSuccess() {
      trpcUtils.questionLists.invalidate();
    },
  });
  const markAsNotCompleteMutation =
    trpc.questionLists.markAsNotComplete.useMutation({
      onSuccess() {
        trpcUtils.questionLists.invalidate();
      },
    });

  function canMarkQuestions() {
    if (isQuestionListSessionLoading) {
      return false;
    }

    if (questionListSession == null) {
      showToast({
        description: intl.formatMessage({
          defaultMessage: 'You need to start the learning session first',
          description:
            'Message telling users that need to start on a study plan session first',
          id: 'CvwT9O',
        }),
        title: intl.formatMessage({
          defaultMessage: 'No ongoing learning session',
          description: 'No active study plan session started',
          id: '7N70T1',
        }),
        variant: 'danger',
      });

      return false;
    }

    return true;
  }

  function markQuestionAsCompleted(question: QuestionMetadata) {
    if (!canMarkQuestions()) {
      return;
    }

    markCompleteMutation.mutate(
      {
        format: question.format,
        listKey,
        slug: question.slug,
      },
      {
        onSuccess: () => {
          showToast({
            title: intl.formatMessage(
              {
                defaultMessage: 'Marked "{questionTitle}" as complete',
                description:
                  'Success message for marking a question as complete',
                id: 'awMxNG',
              },
              {
                questionTitle: question.title,
              },
            ),
            variant: 'success',
          });
        },
      },
    );
  }

  function markQuestionAsNotCompleted(question: QuestionMetadata) {
    if (!canMarkQuestions()) {
      return;
    }

    markAsNotCompleteMutation.mutate(
      {
        format: question.format,
        listKey,
        slug: question.slug,
      },
      {
        onSuccess: () => {
          showToast({
            title: intl.formatMessage(
              {
                defaultMessage: 'Marked "{questionTitle}" as not completed',
                description:
                  'Success message for marking a question as not completed',
                id: 'Hav9UT',
              },
              {
                questionTitle: question.title,
              },
            ),
            variant: 'info',
          });
        },
      },
    );
  }

  return (
    <div className="flex flex-col gap-y-6">
      <Heading className="sr-only" level="custom">
        <FormattedMessage
          defaultMessage="All Practice Questions"
          description="Header for all practice questions section in study plans"
          id="zo65Ck"
        />
      </Heading>
      <Section>
        {(() => {
          const sortedQuestions = sortQuestionsMultiple(questionsWithProgress, [
            { field: 'difficulty', isAscendingOrder: true },
            { field: 'premium', isAscendingOrder: true },
          ]);

          return (
            <QuestionsCodingListWithFilters
              checkIfCompletedQuestionBefore={(question) =>
                overallProgress[question.format].has(question.slug)
              }
              listKey={listKey}
              listMode="learning-list"
              namespace={`${listKey}-coding`}
              questions={sortedQuestions}
              showSummarySection={showSummarySection}
              onMarkAsCompleted={markQuestionAsCompleted}
              onMarkAsNotCompleted={markQuestionAsNotCompleted}
            />
          );
        })()}
      </Section>
    </div>
  );
}
