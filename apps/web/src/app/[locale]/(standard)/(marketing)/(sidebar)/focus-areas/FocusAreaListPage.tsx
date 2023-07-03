'use client';

import clsx from 'clsx';
import { RiArrowRightLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import type {
  FocusArea,
  FocusAreas,
  FocusAreaType,
} from '~/data/focus-areas/FocusAreas';
import { getFocusAreaTheme } from '~/data/focus-areas/FocusAreas';

import type { QuestionDifficulty } from '~/components/questions/common/QuestionsTypes';
import QuestionCountLabel from '~/components/questions/metadata/QuestionCountLabel';
import QuestionDifficultySummary from '~/components/questions/metadata/QuestionDifficultySummary';
import Anchor from '~/components/ui/Anchor';
import Badge from '~/components/ui/Badge';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import { themeGlassyBorder } from '~/components/ui/theme';

import { countNumberOfQuestionsInList } from '~/db/QuestionsUtils';

import CompletionCountSummary from '../study-plans/CompletionCountSummary';

function FocusAreaCard({
  difficultySummary,
  area: { type, name, shortDescription, questions, href },
  isStarted = false,
  completionCount = 0,
}: {
  area: FocusArea;
  completionCount?: number;
  difficultySummary: Record<QuestionDifficulty, number>;
  isStarted?: boolean;
}) {
  const intl = useIntl();
  const questionCount = countNumberOfQuestionsInList(questions);
  const theme = getFocusAreaTheme(type);

  return (
    <div
      className={clsx(
        'group relative flex flex-1 items-center gap-6 rounded-lg px-8 py-5',
        'dark:bg-neutral-800/70 dark:hover:bg-neutral-800/80 bg-white transition',
        themeGlassyBorder,
      )}>
      <div
        className={clsx(
          'flex h-20 w-20 items-center justify-center rounded',
          theme.gradient.className,
        )}>
        <theme.iconOutline className="h-10 w-10 text-white" />
      </div>
      <div className="flex flex-1 flex-col gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex gap-x-4">
            <Anchor href={href} variant="unstyled">
              <span aria-hidden={true} className="absolute inset-0" />
              <Heading level="heading6">{name}</Heading>
            </Anchor>
            {isStarted && (
              <span>
                <Badge
                  label={intl.formatMessage({
                    defaultMessage: 'Started',
                    description: 'Started on study plan label',
                    id: 'cKn3cK',
                  })}
                  size="sm"
                  variant="info"
                />
              </span>
            )}
          </div>
          <Text color="secondary" size="body2">
            {shortDescription}
          </Text>
        </div>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
          <QuestionCountLabel count={questionCount} showIcon={true} />
          <QuestionDifficultySummary
            easy={difficultySummary.easy}
            hard={difficultySummary.hard}
            medium={difficultySummary.medium}
            showIcon={true}
          />
          {isStarted && (
            <CompletionCountSummary
              completed={completionCount}
              total={questionCount}
            />
          )}
        </div>
      </div>
      <RiArrowRightLine className="group-hover:text-brand-dark dark:group-hover:text-brand h-6 w-6 text-neutral-400 transition-colors" />
    </div>
  );
}

type FocusAreasSection = Readonly<{
  areas: Array<FocusArea>;
  title: string;
}>;

export type FocusAreaDifficultySummary = Record<
  FocusAreaType,
  Record<QuestionDifficulty, number>
>;

type Props = Readonly<{
  difficultySummary: FocusAreaDifficultySummary;
  focusAreas: FocusAreas;
}>;

export default function FocusAreaListPage({
  focusAreas,
  difficultySummary,
}: Props) {
  const intl = useIntl();
  const { data: questionListSessions } =
    trpc.questionLists.getActiveSessions.useQuery();

  const sessions = questionListSessions ?? [];

  const focusAreasSections: Array<FocusAreasSection> = [
    {
      areas: Object.values(focusAreas),
      title: intl.formatMessage({
        defaultMessage: 'Important focus areas',
        description: 'Title of list of focus areas',
        id: '6D1OGe',
      }),
    },
  ];

  return (
    <Container
      className={clsx(
        'flex flex-col',
        'py-4 md:py-6 lg:py-8',
        'gap-y-8 md:gap-y-10 2xl:gap-y-12',
      )}>
      <div className="flex flex-col gap-3">
        <Heading level="heading5">
          {intl.formatMessage({
            defaultMessage: 'Focus areas',
            description: 'Title of focus areas page',
            id: 'Zui1cu',
          })}
        </Heading>
        <Text color="secondary" display="block" size="body2">
          {intl.formatMessage({
            defaultMessage:
              'Discover study plans tailored to your needs to help you prepare for your upcoming technical interviews.',
            description: 'Description for study plans page',
            id: 't5nQRB',
          })}
        </Text>
      </div>
      <Section>
        <div className="flex flex-col gap-6">
          {focusAreasSections.map(({ areas, title }) => (
            <div key={title} className="flex flex-col gap-y-4">
              <Heading level="heading6">{title}</Heading>
              <Section>
                <div className="grid gap-4 lg:grid-cols-2">
                  {areas.map((area) => {
                    const session = sessions.find(
                      (session_) => session_.key === area.type,
                    );
                    const completionCount = session?._count.progress;

                    return (
                      <FocusAreaCard
                        key={area.type}
                        area={area}
                        completionCount={completionCount}
                        difficultySummary={difficultySummary[area.type]}
                        isStarted={session != null}
                      />
                    );
                  })}
                </div>
              </Section>
            </div>
          ))}
        </div>
      </Section>
    </Container>
  );
}
