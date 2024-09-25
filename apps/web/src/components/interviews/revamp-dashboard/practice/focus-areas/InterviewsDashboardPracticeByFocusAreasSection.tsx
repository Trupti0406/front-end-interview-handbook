import { useIntl } from 'react-intl';

import {
  categorizeFocusAreas,
  getFocusAreaTheme,
} from '~/data/focus-areas/FocusAreas';

import InterviewsLearningListCard from '~/components/interviews/questions/listings/learning/InterviewsLearningListCard';
import InterviewsDashboardLearningSection from '~/components/interviews/revamp-dashboard/InterviewsDashboardLearningSection';
import Text from '~/components/ui/Text';

import type { LearningSession } from '@prisma/client';

type Props = Readonly<{
  questionListSessions: Array<
    LearningSession & { _count: { progress: number } }
  >;
}>;

export default function InterviewsDashboardPracticeByFocusAreasSection({
  questionListSessions,
}: Props) {
  const intl = useIntl();
  const focusAreasCategories = categorizeFocusAreas(intl);

  return (
    <InterviewsDashboardLearningSection
      className="!gap-12"
      description={intl.formatMessage({
        defaultMessage:
          'Deep-dive into topical focus areas critical for front end interviews',
        description: 'Description for practice by focus areas section',
        id: 'vSV9/q',
      })}
      title={intl.formatMessage({
        defaultMessage: 'Focus Areas',
        description: 'Title for practice by focus areas section',
        id: 'mcrQEE',
      })}>
      <div className="flex flex-col gap-10">
        {focusAreasCategories.map(({ title, items }) => (
          <div key={title} className="flex flex-col gap-6">
            <Text color="subtitle" size="body1" weight="bold">
              {title}
            </Text>
            <div className="flex flex-col gap-4">
              {items.map((focusArea) => {
                const session = questionListSessions.find(
                  (session_) => session_.key === focusArea.type,
                );
                const completionCount = session?._count.progress;
                const theme = getFocusAreaTheme(focusArea.type);

                return (
                  <InterviewsLearningListCard
                    key={focusArea.type}
                    completionCount={completionCount}
                    isStarted={session != null}
                    metadata={focusArea}
                    theme={theme}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </InterviewsDashboardLearningSection>
  );
}