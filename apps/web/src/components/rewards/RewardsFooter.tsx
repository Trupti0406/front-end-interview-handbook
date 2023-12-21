'use client';

import { redirect } from 'next/navigation';
import { RiArrowRightLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import Text from '~/components/ui/Text';

import Anchor from '../ui/Anchor';
import Button from '../ui/Button';

type Props = Readonly<{
  isSignedIn: boolean;
}>;

export default function RewardsHeader({ isSignedIn }: Props) {
  const intl = useIntl();

  return (
    <div className="flex flex-col items-center mx-auto max-w-7xl px-4 pb-8 sm:px-4 lg:pb-12 gap-y-2 sm:gap-y-4">
      <Text className="text-neutral-600 dark:text-neutral-400" display="block" size="body2">
        <FormattedMessage
          defaultMessage="Ready to begin?"
          description="Description for start tasks prompt"
          id="PjWWze"
        />
      </Text>
      <Button
        className="self-stretch sm:self-auto"
        href={isSignedIn ? '/rewards/tasks' : redirect(`/login?next=${encodeURIComponent('/rewards')}`)}
        icon={RiArrowRightLine}
        label={intl.formatMessage({
          defaultMessage: 'Start tasks',
          description: 'Start tasks button',
          id: 'FCFcH2',
        })
        }
        size="lg"
        variant="primary"
      />
      <Text className="text-neutral-600 dark:text-neutral-400" display="block" size="body2">
        By proceeding, you agree to the{' '}
        <Anchor href="/rewards/terms">Campaign's Terms</Anchor>.
      </Text>
    </div>
  );
}
