import { fetchProjectsSkillsRoadmapSectionData } from '~/components/projects/skills/data/ProjectsSkillReader';
import ProjectsSkillRoadmapSection from '~/components/projects/skills/roadmap/ProjectsSkillRoadmapSection';
import fetchViewerProjectsProfile from '~/components/projects/utils/fetchViewerProjectsProfile';

import prisma from '~/server/prisma';
import { readViewerFromToken } from '~/supabase/SupabaseServerGFE';
type Props = Readonly<{
  params: Readonly<{ locale: string; username: string }>;
}>;

export default async function Page({ params }: Props) {
  const { username } = params;
  const viewer = await readViewerFromToken();
  const [{ viewerProjectsProfile }, userProfile] = await Promise.all([
    fetchViewerProjectsProfile(viewer),
    prisma.profile.findUnique({
      where: {
        username,
      },
    }),
  ]);

  const skillsRoadmap = await fetchProjectsSkillsRoadmapSectionData(
    userProfile?.id,
  );

  return (
    <ProjectsSkillRoadmapSection
      isViewerPremium={viewerProjectsProfile?.premium ?? false}
      isViewingOwnProfile={false}
      skillsRoadmap={skillsRoadmap}
      userProfile={userProfile}
    />
  );
}
