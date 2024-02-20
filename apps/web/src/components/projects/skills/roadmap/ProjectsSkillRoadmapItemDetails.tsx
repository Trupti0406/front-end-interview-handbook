import clsx from 'clsx';
import { RiArrowRightLine, RiRocketLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import ProjectsChallengeReputationTag from '~/components/projects/challenges/metadata/ProjectsChallengeReputationTag';
import Anchor from '~/components/ui/Anchor';
import ProgressBar from '~/components/ui/ProgressBar';
import Text from '~/components/ui/Text';
import {
  themeBackgroundLayerEmphasized,
  themeTextFaintColor,
  themeTextSubtleColor,
} from '~/components/ui/theme';

import { projectsSkillLabel } from '../data/ProjectsSkillListData';
import type { ProjectsSkillRoadmapItem } from '../types';

type Props = Readonly<{
  skillItem: ProjectsSkillRoadmapItem;
}>;

export default function ProjectsSkillRoadmapItemDetails({ skillItem }: Props) {
  const intl = useIntl();

  return (
    // TODO(projects|skills): Add skills redirection
    <Anchor className="w-full" href="#" variant="unstyled">
      <div
        className={clsx(
          'group flex w-full items-center gap-2 rounded-lg px-4 py-3 md:gap-4',
          themeBackgroundLayerEmphasized,
        )}>
        <div className="flex w-full flex-col gap-2 md:flex-row md:gap-4">
          <div className="flex-1">
            <Text size="body2" weight="medium">
              {projectsSkillLabel(skillItem.key)}
            </Text>
          </div>
          <div className="flex gap-4">
            <ProjectsChallengeReputationTag
              className="gap-2"
              points={skillItem.points}
              variant="flat"
            />
            <div
              className={clsx('flex items-center gap-2', themeTextSubtleColor)}>
              <RiRocketLine className="size-4" />
              <Text color="inherit" size="body2">
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
                    completedCount: skillItem.completed,
                    totalCount: skillItem.total,
                  }}
                />
              </Text>
            </div>
          </div>
          <div className="flex items-center">
            <ProgressBar
              heightClass="h-2 dark:!bg-neutral-700"
              label={intl.formatMessage(
                {
                  defaultMessage:
                    'Label for "Completed projects" progress bar of a Projects component track',
                  description:
                    '{completedCount} out of {totalCount} challenges',
                  id: 'GSfE/S',
                },
                {
                  completedCount: skillItem.completed,
                  totalCount: skillItem.total,
                },
              )}
              total={skillItem.total}
              value={skillItem.completed}
            />
          </div>
        </div>
        <RiArrowRightLine
          aria-hidden={true}
          className={clsx(
            'size-5 shrink-0',
            themeTextFaintColor,
            'group-hover:text-brand dark:group-hover:text-brand',
          )}
        />
      </div>
    </Anchor>
  );
}
