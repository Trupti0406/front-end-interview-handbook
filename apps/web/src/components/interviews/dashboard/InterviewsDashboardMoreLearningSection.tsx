import clsx from 'clsx';
import type { InterviewsStudyList } from 'contentlayer/generated';

import type { GuideCategory } from '~/components/guides/types';
import type {
  QuestionFramework,
  QuestionLanguage,
  QuestionMetadata,
  QuestionSlug,
} from '~/components/interviews/questions/common/QuestionsTypes';
import { FormattedMessage } from '~/components/intl';
import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import { themeTextColor } from '~/components/ui/theme';

import InterviewsDashboardPracticeQuestionsSection from './InterviewsDashboardPracticeQuestionsSection';
import InterviewsDashboardCompanySection from './time-savers/InterviewsDashboardCompanySection';
import InterviewsDashboardFocusAreasSection from './time-savers/InterviewsDashboardFocusAreasSection';
import InterviewsDashboardStudyPlansSection from './time-savers/InterviewsDashboardStudyPlansSection';

import type { LearningSession } from '@prisma/client';

type Props = Readonly<{
  companyGuides: Array<InterviewsStudyList>;
  focusAreas: ReadonlyArray<InterviewsStudyList>;
  guidesProgress: ReadonlyArray<
    Readonly<{ id: string; slug: string; type: GuideCategory }>
  >;
  questionListSessions: Array<
    LearningSession & { _count: { progress: number } }
  >;
  questions: {
    codingQuestions: ReadonlyArray<QuestionMetadata>;
    frameworkQuestions: Record<
      QuestionFramework,
      ReadonlyArray<QuestionMetadata>
    >;
    languageQuestions: Record<
      QuestionLanguage,
      ReadonlyArray<QuestionMetadata>
    >;
    quizQuestions: ReadonlyArray<QuestionMetadata>;
    systemDesignQuestions: ReadonlyArray<QuestionMetadata>;
  };
  questionsProgress: ReadonlyArray<
    Readonly<{ format: string; id: string; slug: QuestionSlug }>
  > | null;
  studyPlans: ReadonlyArray<InterviewsStudyList>;
}>;

export default function InterviewsDashboardMoreLearningSection({
  companyGuides,
  studyPlans,
  questionListSessions,
  questions,
  questionsProgress,
  guidesProgress,
  focusAreas,
}: Props) {
  return (
    <div className={clsx('flex flex-col gap-12')}>
      <Text color="subtitle" size="body2" weight="medium">
        <FormattedMessage
          defaultMessage="With extra time, continue working on the lists below depending on your needs!"
          description="Label for more learning section"
          id="gTOYrn"
        />
      </Text>
      <Divider />
      <div className="flex flex-col gap-3">
        <Heading className={themeTextColor} color="custom" level="heading5">
          <FormattedMessage
            defaultMessage="More time-savers"
            description="Label for more time savers"
            id="DK7QZb"
          />
        </Heading>
        <Text color="secondary" size="body2">
          <FormattedMessage
            defaultMessage="Efficient ways to prepare when you're short on time."
            description="Description for time savers"
            id="agUqSZ"
          />
        </Text>
      </div>
      <Section>
        <InterviewsDashboardStudyPlansSection
          questionListSessions={questionListSessions}
          studyPlans={studyPlans}
        />
        <InterviewsDashboardCompanySection
          companyGuides={companyGuides}
          questionListSessions={questionListSessions}
        />
        <InterviewsDashboardFocusAreasSection
          focusAreas={focusAreas}
          questionListSessions={questionListSessions}
        />
        <Divider />
        <InterviewsDashboardPracticeQuestionsSection
          guidesProgress={guidesProgress}
          questions={questions}
          questionsProgress={questionsProgress}
        />
      </Section>
    </div>
  );
}
