import clsx from 'clsx';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';

import UserAvatar from '~/components/ui/Avatar/UserAvatar';

import 'react-circular-progressbar/dist/styles.css';

type Props = Readonly<{
  className?: string;
  /**
   * Current level as a number.
   */
  level: number;
  profile?: Readonly<{
    avatarUrl: string | null;
    id: string;
    name: string | null;
    username: string;
  }> | null;
  /**
   * Progress to next level in percent.
   */
  progress: number;
  size?: UserLevelWithAvatarSize;
}>;

const sizeClasses: Record<
  UserLevelWithAvatarSize,
  {
    innerSize: string;
    outerSize: string;
    sizePixels: number;
  }
> = {
  '2xl': {
    innerSize: 'size-12',
    outerSize: 'size-14',
    sizePixels: 56,
  },
  '3xl': {
    innerSize: 'h-[86px] w-[86px]',
    outerSize: 'h-24 w-24',
    sizePixels: 56,
  },
  lg: {
    innerSize: 'size-8',
    outerSize: 'size-10',
    sizePixels: 40,
  },
  xl: {
    innerSize: 'size-10',
    outerSize: 'size-12',
    sizePixels: 48,
  },
};

export type UserLevelWithAvatarSize = '2xl' | '3xl' | 'lg' | 'xl';

export default function UserAvatarWithLevel({
  className,
  level,
  profile,
  progress,
  size = 'lg',
}: Props) {
  const { innerSize, outerSize, sizePixels } = sizeClasses[size];

  return (
    <div className={clsx('relative', className)}>
      <CircularProgressbarWithChildren
        className={outerSize}
        classes={{
          background: 'bg-transparent',
          path: 'stroke-success-light',
          root: '',
          text: '',
          trail: 'dark:stroke-neutral-700 stroke-neutral-300',
        }}
        // Make max value a bit higher than 100 to avoid the level circle
        maxValue={113}
        strokeWidth={Math.round((2 / sizePixels) * 100)}
        styles={{
          path: {
            strokeLinecap: 'round',
            transform: 'rotate(156deg)',
            transformOrigin: 'center center',
          },
        }}
        value={progress}>
        <UserAvatar className={innerSize} profile={profile} size="custom" />
      </CircularProgressbarWithChildren>
      <div
        className={clsx(
          'bg-success text-2xs absolute bottom-0 end-0 flex size-4 items-center justify-center rounded-full font-bold text-white',
          {
            'h-[30px] w-[30px] text-base': size === '3xl',
          },
        )}>
        {level}
      </div>
    </div>
  );
}
