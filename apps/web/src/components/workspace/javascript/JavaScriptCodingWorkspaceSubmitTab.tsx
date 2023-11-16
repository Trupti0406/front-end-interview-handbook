import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import { useToast } from '~/components/global/toasts/ToastsProvider';
import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';
import JavaScriptTestCodesEmitter from '~/components/workspace/javascript/JavaScriptTestCodesEmitter';

import {
  useMutationQuestionProgressAdd,
  useQueryQuestionProgress,
} from '~/db/QuestionsProgressClient';
import { staticUpperCase } from '~/utils/typescript/stringTransform';

import { useJavaScriptCodingWorkspaceContext } from './JavaScriptCodingWorkspaceContext';
import useJavaScriptCodingWorkspaceTilesContext from './useJavaScriptCodingWorkspaceTilesContext';
import { useCodingWorkspaceContext } from '../common/CodingWorkspaceContext';
import type { CodingWorkspaceTabFileType } from '../common/tabs/codingWorkspaceTabId';
import TestsSection from '../common/tests/TestsSection';

import { useUser } from '@supabase/auth-helpers-react';

export default function JavaScriptCodingWorkspaceTestsSubmitTab({
  metadata,
  openBesideTabId,
  specPath,
}: Readonly<{
  metadata: QuestionMetadata;
  openBesideTabId: CodingWorkspaceTabFileType;
  specPath: string;
}>) {
  const intl = useIntl();
  const { dispatch } = useJavaScriptCodingWorkspaceTilesContext();
  const { status } = useCodingWorkspaceContext();
  const { language, mainFileCode } = useJavaScriptCodingWorkspaceContext();
  const addProgressMutation = useMutationQuestionProgressAdd();
  const javaScriptAddSubmissionMutation =
    trpc.questionSubmission.javaScriptAdd.useMutation();

  const user = useUser();
  const { data: questionProgress } = useQueryQuestionProgress(metadata);
  const searchParams = useSearchParams();
  const { showToast } = useToast();

  useEffect(() => {
    if (status === 'submitting') {
      dispatch({
        payload: {
          tabId: 'submit',
        },
        type: 'tab-set-active',
      });
    }
  }, [dispatch, status]);

  return (
    <TestsSection
      specMode="submit"
      specPath={specPath}
      onComplete={(outcome) => {
        function saveSubmission(outcome_: 'correct' | 'wrong') {
          if (user == null) {
            return;
          }

          javaScriptAddSubmissionMutation.mutate({
            code: mainFileCode,
            language: staticUpperCase(language),
            result: staticUpperCase(outcome_),
            slug: metadata.slug,
          });
        }

        function showSuccessToast() {
          showToast({
            title: intl.formatMessage({
              defaultMessage: 'Woohoo! You completed the question!',
              description:
                'Toast congratulating user once they mark a question as complete',
              id: 'Gv0+LY',
            }),
            variant: 'success',
          });
        }

        function markAsComplete() {
          if (user == null || questionProgress?.status === 'complete') {
            return;
          }

          addProgressMutation.mutate({
            format: metadata.format,
            listKey: searchParams?.get('list') ?? undefined,
            progressId: questionProgress?.id,
            slug: metadata.slug,
            status: 'complete',
          });
        }

        // Only need to do something when correct or wrong outcome.
        switch (outcome) {
          case 'correct': {
            saveSubmission(outcome);
            showSuccessToast();
            markAsComplete();

            return;
          }
          case 'wrong': {
            saveSubmission(outcome);

            return;
          }
        }
      }}
      onShowTestCase={(_, index, specParts) => {
        dispatch({
          payload: {
            fallbackNeighborTabId: openBesideTabId,
            tabId: 'submission_test_cases',
          },
          type: 'tab-set-active-otherwise-open',
        });
        setTimeout(() => {
          JavaScriptTestCodesEmitter.emit('focus_on_test', {
            filePath: specPath,
            index,
            specParts,
          });
        }, 0);
      }}
      onShowTestsCases={() => {
        dispatch({
          payload: {
            fallbackNeighborTabId: openBesideTabId,
            tabId: 'submission_test_cases',
          },
          type: 'tab-set-active-otherwise-open',
        });
      }}
    />
  );
}
