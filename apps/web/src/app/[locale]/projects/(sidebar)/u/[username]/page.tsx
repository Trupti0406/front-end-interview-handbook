import { notFound } from 'next/navigation';

import ProjectsProfilePage from '~/components/projects/profile/ProjectsProfilePage';

import prisma from '~/server/prisma';
import { readUserFromToken } from '~/supabase/SupabaseServerGFE';

type Props = Readonly<{
  params: Readonly<{ locale: string; username: string }>;
}>;

export default async function Page({ params }: Props) {
  const [user, profile] = await Promise.all([
    readUserFromToken(),
    prisma.profile.findUnique({
      include: {
        projectsProfile: true,
      },
      where: {
        username: params.username,
      },
    }),
  ]);

  // If no user profile or no projects profile.
  if (profile == null || profile?.projectsProfile.length === 0) {
    return notFound();
  }

  const isMyProfile = user?.id === profile.id;

  return (
    <ProjectsProfilePage initialProfile={profile} isMyProfile={isMyProfile} />
  );
}
