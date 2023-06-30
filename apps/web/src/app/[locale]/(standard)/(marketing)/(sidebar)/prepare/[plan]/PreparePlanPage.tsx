'use client';

import clsx from 'clsx';
import { RiArrowLeftLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import type { PreparationPlan } from '~/data/plans/PreparationPlans';
import { getPreparationPlanTheme } from '~/data/plans/PreparationPlans';

import { useUserProfile } from '~/components/global/UserProfileProvider';
import QuestionPaywall from '~/components/questions/common/QuestionPaywall';
import { countQuestionsTotalDurationMins } from '~/components/questions/common/QuestionsProcessor';
import type {
  QuestionDifficulty,
  QuestionMetadata,
  QuestionQuizMetadata,
} from '~/components/questions/common/QuestionsTypes';
import QuestionListTitleSection from '~/components/questions/listings/headers/QuestionListTitleSection';
import QuestionsList from '~/components/questions/listings/items/QuestionsList';
import QuestionsPlansList from '~/components/questions/listings/items/QuestionsPlansList';
import Button from '~/components/ui/Button';
import Container from '~/components/ui/Container';
import Section from '~/components/ui/Heading/HeadingContext';

import {
  categorizeQuestionListSessionProgress,
  categorizeQuestionsProgress,
  countNumberOfQuestionsInList,
  filterQuestionsProgressByList,
} from '~/db/QuestionsUtils';

type Props = Readonly<{
  codingQuestions: ReadonlyArray<QuestionMetadata>;
  difficultySummary: Record<QuestionDifficulty, number>;
  plan: PreparationPlan;
  quizQuestions: ReadonlyArray<QuestionQuizMetadata>;
  systemDesignQuestions: ReadonlyArray<QuestionMetadata>;
}>;

export default function PreparePlanPage({
  difficultySummary,
  quizQuestions,
  codingQuestions,
  systemDesignQuestions,
  plan,
}: Props) {
  const intl = useIntl();
  const { userProfile } = useUserProfile();
  const canViewStudyPlans = userProfile?.isPremium;

  const { data: questionProgressParam } =
    trpc.questionProgress.getAll.useQuery();
  const { data: questionListsProgressParam } =
    trpc.questionLists.getSessionProgress.useQuery({ listKey: plan.type });

  const questionsProgressAll = categorizeQuestionsProgress(
    questionProgressParam,
  );
  const questionsListsProgressAll = categorizeQuestionListSessionProgress(
    questionListsProgressParam,
  );

  const questionsOverallProgress = filterQuestionsProgressByList(
    questionsProgressAll,
    plan.questions,
  );
  const questionsSessionProgress = filterQuestionsProgressByList(
    questionsListsProgressAll,
    plan.questions,
  );

  const planTheme = getPreparationPlanTheme(plan.type);
  const questionCount = countNumberOfQuestionsInList(plan.questions);

  const totalDuration = countQuestionsTotalDurationMins([
    ...codingQuestions,
    ...quizQuestions,
    ...systemDesignQuestions,
  ]);

  return (
    <div className="relative flex flex-col gap-y-12 py-6">
      <Container className="relative flex flex-col gap-y-5">
        <div>
          <Button
            addonPosition="start"
            className="-mb-2 -ml-5"
            href="/study-plans"
            icon={RiArrowLeftLine}
            label={intl.formatMessage({
              defaultMessage: 'Back to study plans',
              description: 'Link text to navigate to study plans page',
              id: 'fv+TLc',
            })}
            size="md"
            variant="tertiary"
          />
        </div>
        <QuestionListTitleSection
          description={plan.description}
          difficultySummary={difficultySummary}
          icon={planTheme.iconOutline}
          questionCount={questionCount}
          questionListKey={plan.type}
          schedule={plan.schedule}
          themeBackgroundClass={planTheme.gradient.className}
          title={plan.longName}
          totalDurationMins={totalDuration}
        />
      </Container>
      <Section>
        <Container className="pb-12">
          {canViewStudyPlans ? (
            <QuestionsPlansList
              codingQuestions={codingQuestions}
              listKey={plan.type}
              overallProgress={questionsOverallProgress}
              quizQuestions={quizQuestions}
              sessionProgress={questionsSessionProgress}
              systemDesignQuestions={systemDesignQuestions}
            />
          ) : (
            <div className="relative">
              <div className="border-lg pointer-events-none touch-none select-none">
                <QuestionsList
                  checkIfCompletedQuestion={() => false}
                  questions={codingQuestions.slice(0, 5)}
                />
              </div>
              <div className={clsx('absolute bottom-0 top-0 w-full')}>
                <div
                  className={clsx(
                    'absolute bottom-0 top-0 w-full',
                    'bg-gradient-to-t from-white via-white dark:from-neutral-950 dark:via-neutral-950',
                  )}
                />
                <div className={clsx('absolute bottom-0 w-full px-8')}>
                  <QuestionPaywall
                    background={false}
                    subtitle={intl.formatMessage({
                      defaultMessage:
                        'Purchase premium to unlock full access to the study plans and all questions with high quality solutions',
                      description: 'Study plans paywall description',
                      id: 'KsoiBa',
                    })}
                    title={intl.formatMessage({
                      defaultMessage: 'Premium Study Plans',
                      description: 'Study plans paywall title',
                      id: 'tfonOP',
                    })}
                  />
                </div>
              </div>
            </div>
          )}
        </Container>
      </Section>
    </div>
  );
}
