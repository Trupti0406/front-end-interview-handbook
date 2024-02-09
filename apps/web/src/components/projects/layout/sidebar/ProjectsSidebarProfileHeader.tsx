import clsx from 'clsx';

import useProfile from '~/hooks/user/useProfile';

import UserProfileDisplayName from '~/components/profile/info/UserProfileDisplayName';
import ProjectsProfileAvatar from '~/components/projects/users/ProjectsProfileAvatar';
import ProjectsUserReputation from '~/components/projects/users/ProjectsUserReputation';
import Text from '~/components/ui/Text';

type Props = Readonly<{
  points: number;
}>;

export function ProjectsSidebarProfileHeader({ points }: Props) {
  const { profile } = useProfile();

  if (profile == null) {
    return null;
  }

  return (
    <div className={clsx('flex gap-3 items-center w-full px-3 py-2')}>
      <ProjectsProfileAvatar
        hovercard={false}
        // TODO(projects): use actual points
        profile={{
          ...profile,
          points,
        }}
        size="lg"
      />
      <div className="flex flex-col gap-1">
        <Text className="line-clamp-2" size="body2" weight="medium">
          <UserProfileDisplayName profile={profile} />
        </Text>
        <ProjectsUserReputation points={points} />
      </div>
    </div>
  );
}
