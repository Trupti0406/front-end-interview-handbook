import clsx from 'clsx';
import { RiFireLine } from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';

import ProjectsChallengeStatusBadgeCompleted from '~/components/projects/challenges/status/ProjectsChallengeStatusBadgeCompleted';
import ProjectsTrackProgressTag from '~/components/projects/tracks/ProjectsTrackProgressTag';
import type { ProjectsSkillFamily } from '~/components/projects/types';
import Text from '~/components/ui/Text';
import { themeTextSubtleColor } from '~/components/ui/theme';

type Props = Readonly<{
  skill: ProjectsSkillFamily;
}>;

export default function ProjectsSkillFamilyHeading({ skill }: Props) {
  const completed = skill.completedChallenges === skill.totalChallenges;

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex justify-between md:flex-row flex-col gap-2">
        <Text weight="medium">{skill.title}</Text>
        {completed ? (
          <ProjectsChallengeStatusBadgeCompleted />
        ) : (
          <div
            className={clsx(
              'flex md:gap-4 md:flex-row flex-col gap-2',
              themeTextSubtleColor,
            )}>
            <div className="flex gap-1 items-center">
              <RiFireLine className={clsx('h-4 w-4')} />
              <Text color="inherit" size="body3">
                <FormattedMessage
                  defaultMessage="+{points} rep (in total)"
                  description="Total rep count increase label in Projects"
                  id="Lvmetb"
                  values={{
                    points: skill.points,
                  }}
                />
              </Text>
            </div>
            <ProjectsTrackProgressTag
              completed={skill.completedChallenges}
              iconClassName="!h-4 !w-4"
              showProgress={false}
              total={skill.totalChallenges}
            />
          </div>
        )}
      </div>
      <Text color="secondary" size="body3">
        {skill.description}
      </Text>
    </div>
  );
}