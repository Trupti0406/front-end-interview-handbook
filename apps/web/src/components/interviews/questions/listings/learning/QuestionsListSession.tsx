import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { RiLoopLeftLine, RiStopCircleLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';
import url from 'url';

import { trpc } from '~/hooks/trpc';
import { useAuthSignInUp } from '~/hooks/user/useAuthFns';

import ConfirmationDialog from '~/components/common/ConfirmationDialog';
import { useToast } from '~/components/global/toasts/useToast';
import { useUserProfile } from '~/components/global/UserProfileProvider';
import Button from '~/components/ui/Button';
import Card from '~/components/ui/Card';
import ProgressBar from '~/components/ui/ProgressBar';
import Text from '~/components/ui/Text';

import QuestionsProgressFraction from '../../common/QuestionsProgressFraction';

import { useUser } from '@supabase/auth-helpers-react';

type Props = Readonly<{
  progressTrackingAvailableToNonPremiumUsers?: boolean;
  questionCount: number;
  questionListKey: string;
  themeBackgroundClass: string;
}>;

export default function QuestionsListSession({
  questionListKey,
  progressTrackingAvailableToNonPremiumUsers,
  questionCount,
  themeBackgroundClass,
}: Props) {
  const intl = useIntl();
  const pathname = usePathname();
  const { replace } = useRouter();

  const trpcUtils = trpc.useUtils();
  const { userProfile } = useUserProfile();
  const user = useUser();
  const { signInUpHref } = useAuthSignInUp();

  const { data: questionListSession, isLoading: isQuestionListSessionLoading } =
    trpc.questionLists.getActiveSession.useQuery(
      {
        listKey: questionListKey,
      },
      {
        enabled: !!user,
      },
    );

  const startSessionMutation = trpc.questionLists.startSession.useMutation({
    onSuccess() {
      trpcUtils.questionLists.invalidate();
    },
  });
  const stopSessionMutation = trpc.questionLists.stopSession.useMutation({
    onSuccess() {
      trpcUtils.questionLists.invalidate();
    },
  });
  const resetSessionProgressMutation =
    trpc.questionLists.resetSessionProgress.useMutation({
      onSuccess() {
        trpcUtils.questionLists.invalidate();
      },
    });

  const completedQuestions = questionListSession?.progress?.length ?? 0;
  const [showStopStudyPlanConfirmation, setShowStopStudyPlanConfirmation] =
    useState(false);
  const [showResetProgressConfirmation, setShowResetProgressConfirmation] =
    useState(false);
  const { showToast } = useToast();

  const clearActionSearchParams = useCallback(() => {
    const params = new URLSearchParams(window.location.search);

    params.delete('action');
    replace(
      url.format({
        pathname,
        query: Object.fromEntries(params),
      }),
    );
  }, [pathname, replace]);

  const onStartLearning = useCallback(() => {
    if (
      !progressTrackingAvailableToNonPremiumUsers &&
      !userProfile?.isInterviewsPremium
    ) {
      // TODO: trigger premium subscription modal
    } else {
      startSessionMutation.mutate(
        {
          listKey: questionListKey,
        },
        {
          onSuccess: () => {
            showToast({
              title: intl.formatMessage({
                defaultMessage: 'Started tracking progress',
                description: 'Success message for starting a study plan',
                id: 'm0cej4',
              }),
              variant: 'success',
            });

            // TODO: trigger import progress flow
          },
        },
      );
    }
  }, [
    progressTrackingAvailableToNonPremiumUsers,
    userProfile?.isInterviewsPremium,
    startSessionMutation,
    questionListKey,
    showToast,
    intl,
  ]);

  useEffect(() => {
    if (
      userProfile == null ||
      isQuestionListSessionLoading ||
      questionListSession != null
    ) {
      return;
    }

    // Read the parameter on-demand to avoid using useSearchParams.
    const params = new URLSearchParams(window.location.search);
    const actionParam = params.get('action');

    if (actionParam) {
      clearActionSearchParams();
    }

    if (actionParam === 'start_session') {
      onStartLearning();
    }
  }, [
    questionListSession,
    isQuestionListSessionLoading,
    userProfile,
    onStartLearning,
    clearActionSearchParams,
  ]);

  return (
    <div>
      {(() => {
        if (isQuestionListSessionLoading && !!user) {
          return null;
        }

        if (questionListSession == null) {
          return (
            <div className="flex flex-col items-end gap-3">
              <Button
                href={
                  userProfile == null
                    ? signInUpHref({
                        next: url.format({
                          pathname,
                          query: {
                            action: 'start_session',
                          },
                        }),
                      })
                    : undefined
                }
                isDisabled={startSessionMutation.isLoading}
                isLoading={startSessionMutation.isLoading}
                label={intl.formatMessage({
                  defaultMessage: 'Start learning',
                  description: 'Button label to start study plan / focus area',
                  id: 'rmYPMV',
                })}
                size="md"
                variant="primary"
                onClick={() => {
                  if (userProfile == null) {
                    return;
                  }

                  onStartLearning();
                }}
              />
              <Text color="secondary" size="body3" weight="medium">
                <FormattedMessage
                  defaultMessage="Track your progress"
                  description="Subtitle for start learning"
                  id="iGkYh3"
                />
              </Text>
            </div>
          );
        }

        return (
          <div className="flex min-w-[363px] flex-col gap-y-2">
            <Card
              className="flex justify-between gap-4 px-4 py-3"
              disableSpotlight={true}
              padding={false}
              pattern={false}>
              <div className="flex flex-col gap-0.5">
                <Text size="body3" weight="bold">
                  <FormattedMessage
                    defaultMessage="Progress"
                    description="Title for learning progress card"
                    id="q+ZK0L"
                  />
                </Text>
                <div className="flex items-center gap-3">
                  <div className="w-[112px]">
                    <ProgressBar
                      heightClass="h-1.5"
                      label={intl.formatMessage({
                        defaultMessage: 'Progress',
                        description:
                          'Label for progress bar for learning progress',
                        id: 'zQFib0',
                      })}
                      progressClass={themeBackgroundClass}
                      total={questionCount}
                      value={completedQuestions}
                    />
                  </div>
                  <QuestionsProgressFraction
                    completed={completedQuestions}
                    total={questionCount}
                  />
                </div>
              </div>
              <div className="flex w-[68px] shrink-0 items-center gap-3">
                <Button
                  icon={RiLoopLeftLine}
                  isDisabled={
                    resetSessionProgressMutation.isLoading ||
                    completedQuestions === 0
                  }
                  isLabelHidden={true}
                  isLoading={resetSessionProgressMutation.isLoading}
                  label={intl.formatMessage({
                    defaultMessage: 'Reset progress',
                    description: 'Label to reset study plan progress',
                    id: '4FirvF',
                  })}
                  size="xs"
                  tooltip={
                    completedQuestions === 0
                      ? intl.formatMessage({
                          defaultMessage: 'No progress to reset',
                          description: 'Label for no progress to reset',
                          id: 'ZqUgX5',
                        })
                      : intl.formatMessage({
                          defaultMessage: 'Reset progress',
                          description: 'Label to reset study plan progress',
                          id: '4FirvF',
                        })
                  }
                  variant="secondary"
                  onClick={() => {
                    if (questionListSession == null) {
                      return;
                    }

                    setShowResetProgressConfirmation(true);
                  }}
                />
                <Button
                  className="text-danger dark:text-danger hover:text-danger dark:hover:text-danger md:-mr-3"
                  icon={RiStopCircleLine}
                  isDisabled={stopSessionMutation.isLoading}
                  isLabelHidden={true}
                  isLoading={stopSessionMutation.isLoading}
                  label={intl.formatMessage({
                    defaultMessage: 'Stop session',
                    description: 'Label to stop study plan',
                    id: 'ECkWMR',
                  })}
                  size="xs"
                  tooltip={intl.formatMessage({
                    defaultMessage: 'Stop session',
                    description: 'Label to stop study plan',
                    id: 'ECkWMR',
                  })}
                  variant="secondary"
                  onClick={() => {
                    if (questionListSession == null) {
                      return;
                    }

                    setShowStopStudyPlanConfirmation(true);
                  }}
                />
              </div>
            </Card>
            <div className="flex w-full flex-row-reverse justify-between gap-x-2"></div>
            <ConfirmationDialog
              confirmButtonVariant="danger"
              isDisabled={stopSessionMutation.isLoading}
              isLoading={stopSessionMutation.isLoading}
              isShown={showStopStudyPlanConfirmation}
              title={intl.formatMessage({
                defaultMessage: 'Stop session',
                description: 'Label to stop study plan',
                id: 'ECkWMR',
              })}
              onCancel={() => {
                setShowStopStudyPlanConfirmation(false);
              }}
              onConfirm={() => {
                stopSessionMutation.mutate(
                  {
                    sessionId: questionListSession.id,
                  },
                  {
                    onSuccess: () => {
                      setShowStopStudyPlanConfirmation(false);
                      showToast({
                        title: intl.formatMessage({
                          defaultMessage: 'Learning session stopped',
                          description:
                            'Success message for stopping a study plan',
                          id: 'IcGeXF',
                        }),
                        variant: 'info',
                      });
                    },
                  },
                );
              }}>
              <FormattedMessage
                defaultMessage="This is an irreversible action. You will not be able to resume the list and all progress will be erased. Are you sure?"
                description="Confirmation text for stopping a study list"
                id="kJjxxA"
              />
            </ConfirmationDialog>
            <ConfirmationDialog
              isDisabled={resetSessionProgressMutation.isLoading}
              isLoading={resetSessionProgressMutation.isLoading}
              isShown={showResetProgressConfirmation}
              title={intl.formatMessage({
                defaultMessage: 'Reset progress',
                description: 'Label to reset study plan progress',
                id: '4FirvF',
              })}
              onCancel={() => {
                setShowResetProgressConfirmation(false);
              }}
              onConfirm={() => {
                resetSessionProgressMutation.mutate(
                  {
                    sessionId: questionListSession.id,
                  },
                  {
                    onSuccess: () => {
                      setShowResetProgressConfirmation(false);
                      showToast({
                        title: intl.formatMessage({
                          defaultMessage: 'Learning progress cleared',
                          description:
                            'Success message for clearing study plan progress',
                          id: 'kQgKV1',
                        }),
                        variant: 'info',
                      });
                    },
                  },
                );
              }}>
              <FormattedMessage
                defaultMessage="This is an irreversible action. You will lose all progress. Are you sure?"
                description="Confirmation text for reseting study plan progress"
                id="Jn7AHE"
              />
            </ConfirmationDialog>
          </div>
        );
      })()}
    </div>
  );
}
