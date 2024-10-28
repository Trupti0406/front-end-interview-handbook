import { type PreparationPlans } from '~/data/plans/PreparationPlans';

import InterviewsStudyListCard from '~/components/interviews/questions/listings/learning/InterviewsStudyListCard';
import { useIntl } from '~/components/intl';

import InterviewsDashboardLearningSection from './InterviewsDashboardLearningSection';

import type { LearningSession } from '@prisma/client';

type Props = Readonly<{
  preparationPlans: PreparationPlans;
  questionListSessions: Array<
    LearningSession & { _count: { progress: number } }
  >;
}>;

export default function InterviewsDashboardStudyPlansSection({
  preparationPlans,
  questionListSessions,
}: Props) {
  const intl = useIntl();

  const plans = (['one-week', 'one-month', 'three-months'] as const).map(
    (key) => preparationPlans[key],
  );

  return (
    <InterviewsDashboardLearningSection
      description={intl.formatMessage({
        defaultMessage: 'Prepare the best you can within any timeline.',
        description: 'Description for study plans section',
        id: '9B1Aqh',
      })}
      title={intl.formatMessage({
        defaultMessage: 'Study plans',
        description: 'Title for study plans section',
        id: 'KRGHVm',
      })}>
      <div className="flex flex-col gap-4">
        {plans.map((studyPlan) => {
          const session = questionListSessions.find(
            (session_) => session_.key === studyPlan.type,
          );
          const completionCount = session?._count.progress;

          return (
            <InterviewsStudyListCard
              key={studyPlan.type}
              completionCount={completionCount}
              isStarted={session != null}
              metadata={studyPlan}
              schedule={studyPlan.schedule}
              // TODO(interviews): need to pass icon
            />
          );
        })}
      </div>
    </InterviewsDashboardLearningSection>
  );
}
