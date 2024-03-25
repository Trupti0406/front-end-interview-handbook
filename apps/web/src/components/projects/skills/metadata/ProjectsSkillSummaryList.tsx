import clsx from 'clsx';

import ProjectsSkillList from '~/components/projects/skills/metadata/ProjectsSkillList';
import Text from '~/components/ui/Text';

import projectsSkillExtractGroups from './projectsSkillExtractGroups';
import ProjectsSkillGroupList from './ProjectsSkillGroupList';
import type { ProjectsSkillKey } from '../types';

type Props = Readonly<{
  isLabelHidden?: boolean;
  label: string;
  limit?: number;
  roadmapSkills: ReadonlyArray<ProjectsSkillKey>;
  techStackSkills: ReadonlyArray<ProjectsSkillKey>;
}>;

export default function ProjectsSkillSummaryList({
  isLabelHidden,
  label,
  roadmapSkills,
  techStackSkills,
}: Props) {
  const groups = projectsSkillExtractGroups(roadmapSkills);

  return (
    <div
      aria-label={isLabelHidden ? label : undefined}
      className={clsx('flex items-center gap-2 overflow-hidden')}>
      {!isLabelHidden && (
        <Text className="whitespace-nowrap" color="secondary" size="body3">
          {label}
        </Text>
      )}
      <div className="shrink-0">
        <ProjectsSkillGroupList skillGroups={groups} />
      </div>
      <div className="shrink-0">
        <ProjectsSkillList
          limit={Math.max(3 - groups.length, 0)}
          skills={techStackSkills}
        />
      </div>
    </div>
  );
}