'use client';

import { trpc } from '~/hooks/trpc';

import ProjectsProfileInfo from '~/components/projects/profile/ProjectsProfileInfo';
import ProjectsProfilePinnedSubmissions from '~/components/projects/profile/ProjectsProfilePinnedSubmissions';
import ProjectsProfileStats from '~/components/projects/profile/ProjectsProfileStats';
import ProjectsProfileTabs from '~/components/projects/profile/ProjectsProfileTabs';

import type { ProjectsChallengeSubmissionAugmented } from '../submissions/types';

import type { Profile, ProjectsProfile } from '@prisma/client';

type Props = Readonly<{
  children: React.ReactNode;
  isViewingOwnProfile: boolean;
  pinnedSubmissions:
    | ReadonlyArray<ProjectsChallengeSubmissionAugmented>
    | undefined;
  userProfile: Profile &
    Readonly<{
      projectsProfile: ProjectsProfile;
    }>;
}>;

export default function ProjectsProfilePage({
  children,
  userProfile,
  pinnedSubmissions,
  isViewingOwnProfile,
}: Props) {
  const projectsProfileId = userProfile.projectsProfile.id;
  const { data: profileStatistics } =
    trpc.projects.profile.dashboardStatistics.useQuery({
      projectsProfileId,
    });

  const { projectsProfile } = userProfile;
  const baseUrl = `/projects/u/${userProfile.username}`;

  return (
    <div>
      <ProjectsProfileInfo
        isViewingOwnProfile={isViewingOwnProfile}
        userProfile={{ ...userProfile, projectsProfile }}
      />
      <div className="mt-12">
        <ProjectsProfileStats
          codeReviews={profileStatistics?.codeReviews ?? 0}
          completedChallenges={profileStatistics?.completedChallenges ?? 0}
          isViewingOwnProfile={isViewingOwnProfile}
          submissionViews={profileStatistics?.submissionViews ?? 0}
          upvotes={profileStatistics?.upvotes ?? 0}
        />
      </div>
      <div className="mt-[60px]">
        <ProjectsProfilePinnedSubmissions
          pinnedSubmissions={pinnedSubmissions}
        />
      </div>
      <div className="mt-[72px] flex flex-col gap-8">
        <ProjectsProfileTabs baseUrl={baseUrl} />
        {children}
      </div>
    </div>
  );
}
