import clsx from 'clsx';
import { RiRocketLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import ProgressBar from '~/components/ui/ProgressBar';
import Text from '~/components/ui/Text';
import { themeTextSubtleColor } from '~/components/ui/theme';

type Props = Readonly<{
  completed: number;
  iconClassName?: string;
  showProgress?: boolean;
  total: number;
  variant?: 'normal' | 'skills-roadmap';
}>;

export default function ProjectsChallengeProgressTag({
  completed,
  iconClassName = 'size-5',
  showProgress = true,
  total,
  variant = 'normal',
}: Props) {
  const intl = useIntl();

  return (
    <div className={clsx('flex items-center gap-1', themeTextSubtleColor)}>
      <RiRocketLine className={iconClassName} />
      <Text color="inherit" size="body3">
        {variant === 'normal' && (
          <FormattedMessage
            defaultMessage="<bold>{completedCount}</bold>/{totalCount} challenges"
            description="Rep count label in Projects"
            id="26Xmcd"
            values={{
              bold: (chunks) => (
                <Text color="secondary" size="body2" weight="medium">
                  {chunks}
                </Text>
              ),
              completedCount: completed,
              totalCount: total,
            }}
          />
        )}
        {variant === 'skills-roadmap' && (
          <FormattedMessage
            defaultMessage="<bold>{completedCount}</bold>/{totalCount} skill plan challenges"
            description="Rep count label in Projects"
            id="r5RGzk"
            values={{
              bold: (chunks) => (
                <Text color="secondary" size="body2" weight="medium">
                  {chunks}
                </Text>
              ),
              completedCount: completed,
              totalCount: total,
            }}
          />
        )}
      </Text>
      {showProgress && (
        <div>
          <ProgressBar
            heightClass="h-1.5"
            label={intl.formatMessage(
              {
                defaultMessage:
                  'Label for "Completed projects" progress bar of a Projects component track',
                description: '{completedCount} out of {totalCount} challenges',
                id: 'GSfE/S',
              },
              {
                completedCount: completed,
                totalCount: total,
              },
            )}
            total={total}
            value={completed}
          />
        </div>
      )}
    </div>
  );
}
