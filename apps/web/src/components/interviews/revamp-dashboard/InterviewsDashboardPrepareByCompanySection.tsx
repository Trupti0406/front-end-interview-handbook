import clsx from 'clsx';
import type { InterviewsCompanyGuide } from 'contentlayer/generated';
import { RiArrowRightLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import Anchor from '~/components/ui/Anchor';
import Badge from '~/components/ui/Badge';
import Text from '~/components/ui/Text';
import {
  themeBackgroundCardColor,
  themeBorderElementColor,
  themeTextBrandColor_GroupHover,
  themeTextSubtleColor,
} from '~/components/ui/theme';

import InterviewsDashboardLearningSection from './InterviewsDashboardLearningSection';
import CompletionCountSummary from '../questions/listings/stats/CompletionCountSummary';

import type { LearningSession } from '@prisma/client';

function InterviewsCompanyGuideCard({
  companyGuide,
  completionCount = 0,
  isStarted,
}: {
  companyGuide: InterviewsCompanyGuide;
  completionCount?: number;
  isStarted?: boolean;
}) {
  const {
    name,
    href,
    logoUrl,
    questionsJavaScript,
    questionsUserInterface,
    questionsQuiz,
    questionsSystemDesign,
  } = companyGuide;
  const questionsCodingCount =
    (questionsJavaScript?.length ?? 0) + (questionsUserInterface?.length ?? 0);
  const questionCount =
    questionsCodingCount +
    (questionsQuiz?.length ?? 0) +
    (questionsSystemDesign?.length ?? 0);

  return (
    <div
      className={clsx(
        'flex-2 group relative flex items-center gap-6',
        'rounded-lg p-6',
        'transition',
        themeBackgroundCardColor,
        ['border', themeBorderElementColor],
        'isolate',
      )}>
      <div
        className={clsx(
          'flex shrink-0 items-center justify-center',
          'size-12 rounded',
          'bg-white',
          'shadow-md',
        )}>
        <img
          alt={name}
          className="size-9"
          decoding="async"
          loading="lazy"
          src={logoUrl}
        />
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex items-center gap-2.5">
          <Anchor href={href} variant="unstyled">
            <span aria-hidden={true} className="absolute inset-0" />
            <Text size="body1" weight="medium">
              {name}
            </Text>
          </Anchor>
          <Badge
            label={`${completionCount}/${questionCount}`}
            size="sm"
            variant="neutral"
          />
        </div>
        {isStarted && (
          <CompletionCountSummary
            completed={completionCount}
            total={questionCount}
          />
        )}
      </div>
      <RiArrowRightLine
        className={clsx(
          'size-6 transition-colors',
          themeTextSubtleColor,
          themeTextBrandColor_GroupHover,
        )}
      />
    </div>
  );
}

type Props = Readonly<{
  companyGuides: Array<InterviewsCompanyGuide>;
  questionListSessions: Array<
    LearningSession & { _count: { progress: number } }
  >;
}>;

export default function InterviewsDashboardPrepareByCompanySection({
  companyGuides,
  questionListSessions,
}: Props) {
  const intl = useIntl();

  return (
    <InterviewsDashboardLearningSection
      description={intl.formatMessage({
        defaultMessage:
          'Practice questions specific to the company you are interviewing for.',
        description: 'Description for prepare by company',
        id: 'gVVuq/',
      })}
      title={intl.formatMessage({
        defaultMessage: 'Practice by company',
        description: 'Title for prepare by company',
        id: 'GqmPae',
      })}>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {companyGuides.map((companyGuide) => {
          const session = questionListSessions.find(
            (session_) => session_.key === companyGuide.slug,
          );
          const completionCount = session?._count.progress;

          return (
            <InterviewsCompanyGuideCard
              key={companyGuide.slug}
              companyGuide={companyGuide}
              completionCount={completionCount}
              isStarted={session != null}
            />
          );
        })}
      </div>
    </InterviewsDashboardLearningSection>
  );
}
