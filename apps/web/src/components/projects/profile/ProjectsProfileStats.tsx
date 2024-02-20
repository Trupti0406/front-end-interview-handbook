import clsx from 'clsx';

import Card from '~/components/ui/Card';
import CardContainer from '~/components/ui/Card/CardContainer';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import {
  themeBackgroundChipColor,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

import useProjectsProfileStats from '../hooks/useProjectsProfileStats';

function getFormattedNumber(num: number) {
  if (num === 0) {
    return '–';
  }

  const lookup = [
    { symbol: '', value: 1 },
    { symbol: 'k', value: 1e3 },
    { symbol: 'M', value: 1e6 },
    { symbol: 'G', value: 1e9 },
    { symbol: 'T', value: 1e12 },
    { symbol: 'P', value: 1e15 },
    { symbol: 'E', value: 1e18 },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const item = lookup
    .slice()
    .reverse()
    .find((lookupItem) => {
      return num >= lookupItem.value;
    });

  if (!item) {
    return '–';
  }

  const maxNumberOfDigits = 3;
  const decimalPart = Math.floor(num / item.value);
  const numDecimalDegits = decimalPart.toString().length;
  const digits = maxNumberOfDigits - numDecimalDegits;

  return (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol;
}

type Props = Readonly<{
  codeReviews: number | undefined;
  completedChallenges: number | undefined;
  submissionViews: number | undefined;
  upvotes: number | undefined;
}>;

export default function ProjectsProfileStats({
  codeReviews,
  completedChallenges,
  submissionViews,
  upvotes,
}: Props) {
  const stats = useProjectsProfileStats({
    codeReviews,
    completedChallenges,
    submissionViews,
    upvotes,
  });

  return (
    <Section>
      <CardContainer className="grid grid-cols-2 gap-4 lg:gap-6 xl:grid-cols-4">
        {stats.map(({ title, count, icon: Icon }) => {
          return (
            <Card
              key={title}
              className="group/card relative isolate flex flex-col items-start justify-between gap-3 px-4 py-4 md:px-6"
              padding={false}>
              <div className="flex items-center gap-2">
                <span
                  className={clsx(
                    'hidden size-9 items-center justify-center rounded-md md:inline-flex',
                    themeBackgroundChipColor,
                    themeTextSecondaryColor,
                    'border border-transparent transition',
                    'group-hover/card:border-brand-dark group-hover/card:text-brand-dark',
                    'dark:group-hover/card:border-brand dark:group-hover/card:text-brand',
                  )}>
                  <Icon aria-hidden={true} className="size-5" />
                </span>
                <Text color="secondary" size="body2" weight="medium">
                  {title}
                </Text>
              </div>
              <Text
                className="text-4xl font-bold md:text-5xl"
                size="inherit"
                weight="inherit">
                {count ? getFormattedNumber(count) : '-'}
              </Text>
            </Card>
          );
        })}
      </CardContainer>
    </Section>
  );
}
