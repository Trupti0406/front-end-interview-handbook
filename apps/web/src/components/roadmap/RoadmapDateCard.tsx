import clsx from 'clsx';
import React from 'react';

import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';

type Props = Readonly<{
  day: string;
  month: string;
}>;

function RoadmapDateCard({ day, month }: Props) {
  return (
    <div
      className={clsx(
        'flex flex-col items-center justify-center gap-y-0.5',
        'bg-neutral-50 dark:bg-neutral-800',
        'rounded-md p-2.5',
      )}>
      <Heading level="heading4">{day}</Heading>
      <Text size="body2" weight="medium">
        {month}
      </Text>
    </div>
  );
}

export default RoadmapDateCard;
