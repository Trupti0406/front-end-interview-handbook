import clsx from 'clsx';
import { RiGraduationCapLine } from 'react-icons/ri';

import Text from '~/components/ui/Text';
import { themeTextSecondaryColor } from '~/components/ui/theme';

type Size = 'sm' | 'xs';

type Props = Readonly<{
  profile: Readonly<{
    currentStatus: string | null;
    startWorkDate: Date | null;
  }>;
  size?: Size;
}>;

const textClasses: Record<Size, string> = {
  sm: 'text-sm',
  xs: 'text-xs',
};

const iconClasses: Record<Size, string> = {
  sm: 'h-5 w-5',
  xs: 'h-4 w-4',
};

const gap: Record<Size, string> = {
  sm: 'gap-2',
  xs: 'gap-1',
};

export default function UserProfileExperience({ profile, size = 'sm' }: Props) {
  if (profile.currentStatus == null && profile.startWorkDate == null) {
    return null;
  }

  return (
    <div className={clsx('flex items-center', gap[size])}>
      <RiGraduationCapLine
        className={clsx(iconClasses[size], themeTextSecondaryColor)}
      />
      <Text className={textClasses[size]} color="secondary" size="inherit">
        {profile.startWorkDate?.getTime() ?? profile.currentStatus}
      </Text>
    </div>
  );
}
