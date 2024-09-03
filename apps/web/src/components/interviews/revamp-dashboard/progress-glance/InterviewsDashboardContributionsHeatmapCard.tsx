import clsx from 'clsx';
import { sum, values } from 'lodash-es';
import { useMemo } from 'react';
import { RiInformationLine } from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import Text from '~/components/ui/Text';
import {
  themeBorderElementColor,
  themeTextSubtleColor,
} from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

import InterviewsDashboardContributionsChart from './InterviewsDashboardContributionsChart';
import { findMaxConsecutiveDays, getDateRangeFromToday } from './utils';

export default function InterviewsDashboardContributionsHeatMapCard() {
  const { startTime, endTime } = useMemo(() => getDateRangeFromToday(), []);
  const { data: contributions } =
    trpc.questionProgress.getContributionsCount.useQuery({
      endTime,
      startTime,
    });
  const maxConsecutiveDays = findMaxConsecutiveDays(contributions);
  const totalActiveDays = Object.keys(contributions ?? {}).length;
  const totalContributions = sum(values(contributions));

  return (
    <div
      className={clsx(
        'flex flex-col gap-6',
        'rounded-lg',
        'px-6 py-5',
        'bg-neutral-200/40 dark:bg-neutral-800/40',
        ['border', themeBorderElementColor],
      )}>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        {/* Contributions count */}
        <div className="flex items-center gap-2">
          <Text color="secondary" size="body1">
            <FormattedMessage
              defaultMessage="{count, plural, =0 {0 Completions in the last year} one {<bold>{value}</bold> Completion in the last year} other {<bold>{value}</bold> Completions in the last year}}"
              description="Label for completions count"
              id="6IcSN4"
              values={{
                bold: (chunks) => (
                  <Text size="body1" weight="bold">
                    {chunks}
                  </Text>
                ),
                count: totalContributions,
                value: new Intl.NumberFormat().format(totalContributions),
              }}
            />
          </Text>
          <Tooltip
            invert={true}
            label={
              <div>
                <Text>
                  <FormattedMessage
                    defaultMessage="Completions include both questions and articles across the interviews platform."
                    description="Label for completions tooltip"
                    id="EnOEHg"
                  />
                  <ul className="list-inside list-disc">
                    <li>
                      <FormattedMessage
                        defaultMessage="An 'active day' is a day you completed at least 1 question"
                        description="Tooltip label for active day in completions"
                        id="lMWmct"
                      />
                    </li>
                    <li>
                      <FormattedMessage
                        defaultMessage="'Max streak' is the number of continuous active days"
                        description="Tooltip label for active day in completions"
                        id="C9XhYm"
                      />
                    </li>
                  </ul>
                </Text>
              </div>
            }>
            <RiInformationLine
              className={clsx('size-4', themeTextSubtleColor)}
            />
          </Tooltip>
        </div>

        {/* Active days and max streak */}
        <div className="flex flex-wrap gap-x-4">
          <Text color="secondary" size="body1">
            <FormattedMessage
              defaultMessage="Total active days: <bold>{count}</bold>"
              description="Label for active days"
              id="dpBKYx"
              values={{
                bold: (chunks) => (
                  <Text color="subtitle" size="body1" weight="medium">
                    {chunks}
                  </Text>
                ),
                count: new Intl.NumberFormat().format(totalActiveDays),
              }}
            />
          </Text>
          <Text color="secondary" size="body1">
            <FormattedMessage
              defaultMessage="Max streak: <bold>{count}</bold>"
              description="Label for max streak"
              id="glZsYe"
              values={{
                bold: (chunks) => (
                  <Text color="subtitle" size="body1" weight="medium">
                    {chunks}
                  </Text>
                ),
                count: new Intl.NumberFormat().format(maxConsecutiveDays),
              }}
            />
          </Text>
        </div>
      </div>

      {/* Contributions heatmap */}
      <InterviewsDashboardContributionsChart
        contributions={contributions}
        endTime={endTime}
        startTime={startTime}
      />
    </div>
  );
}