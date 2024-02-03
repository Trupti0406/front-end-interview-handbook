import ProjectsSkillRoadmapGroupCard from '~/components/projects/skills/roadmap/ProjectsSkillRoadmapGroupCard';
import Text from '~/components/ui/Text';

import { skillsRoadmap } from '../data/ProjectsSkillRoadmapData';

export default function ProjectsSkillRoadmapSection() {
  return (
    <div className="flex flex-col gap-10">
      {skillsRoadmap.map((levelItem) => (
        <div key={levelItem.title} className="flex flex-col gap-4">
          <Text size="body2" weight="bold">
            {levelItem.title}
          </Text>
          <div className="flex flex-col gap-4">
            {levelItem.items.map((group) => (
              <ProjectsSkillRoadmapGroupCard key={group.key} group={group} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}