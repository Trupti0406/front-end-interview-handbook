import { useIntl } from 'react-intl';

import {
  type FocusAreas,
  getFocusAreaTheme,
} from '~/data/focus-areas/FocusAreas';

import InterviewsLearningListCard from '~/components/interviews/questions/listings/learning/study-plan/InterviewsLearningListCard';
import InterviewsDashboardLearningSection from '~/components/interviews/revamp-dashboard/InterviewsDashboardLearningSection';
import Text from '~/components/ui/Text';

import type { LearningSession } from '@prisma/client';

type Props = Readonly<{
  focusAreas: FocusAreas;
  questionListSessions: Array<
    LearningSession & { _count: { progress: number } }
  >;
}>;

export default function InterviewsDashboardPracticeByFocusAreasSection({
  focusAreas,
  questionListSessions,
}: Props) {
  const intl = useIntl();

  // TODO(interviews): Consolidate with focus area list page.
  const focusAreasCategories = [
    {
      items: [
        focusAreas['javascript-polyfills'],
        focusAreas['async-operations'],
        focusAreas.lodash,
      ],
      title: intl.formatMessage({
        defaultMessage: 'JavaScript Engineering',
        description: 'Title for focus area type',
        id: 'er249T',
      }),
    },
    {
      items: [
        focusAreas['dom-manipulation'],
        focusAreas.forms,
        focusAreas['design-system-components'],
      ],
      title: intl.formatMessage({
        defaultMessage: 'User Interface Development',
        description: 'Title for focus area type',
        id: '2M6LN4',
      }),
    },
    {
      items: [focusAreas.accessibility, focusAreas['state-management']],
      title: intl.formatMessage({
        defaultMessage: 'Accessibility and Performance',
        description: 'Title for focus area type',
        id: '9yHSXW',
      }),
    },
    {
      items: [focusAreas['data-structures-algorithms']],
      title: intl.formatMessage({
        defaultMessage: 'Computer Science Foundations',
        description: 'Title for focus area type',
        id: 'L7w0Ka',
      }),
    },
  ];

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
        defaultMessage: 'Practice by focus areas',
        description: 'Title for practice by focus areas section',
        id: 'WVS7Vj',
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
