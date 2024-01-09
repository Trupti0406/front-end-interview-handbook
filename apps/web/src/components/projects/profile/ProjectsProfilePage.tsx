'use client';

import { notFound } from 'next/navigation';
import { RiPencilFill } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import ProjectsProfileFeaturedSubmissions from '~/components/projects/profile/ProjectsProfileFeaturedSubmissions';
import ProjectsProfileInfo from '~/components/projects/profile/ProjectsProfileInfo';
import ProjectsProfileStats from '~/components/projects/profile/ProjectsProfileStats';
import type { ProjectsUserProfile } from '~/components/projects/profile/types';
import Button from '~/components/ui/Button';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';

type Props = Readonly<{
  initialProfile: ProjectsUserProfile;
  isMyProfile: boolean;
}>;

export default function ProjectsProfilePage({
  initialProfile,
  isMyProfile,
}: Props) {
  const intl = useIntl();

  // For getting the updated profile data, when there is edit in profile edit page
  const { data: profile } = trpc.projects.profile.projectsProfileGet.useQuery(
    undefined,
    {
      enabled: isMyProfile,
      initialData: initialProfile,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  );

  if (profile === null) {
    return notFound();
  }

  return (
    <Container className="md:pt-16 md:pb-32 pt-6 pb-8">
      <div className="flex flex-col gap-8">
        <div className="md:flex hidden items-center gap-6">
          <Heading level="heading5">
            {isMyProfile ? (
              <FormattedMessage
                defaultMessage="My Profile"
                description="Title of Projects Profile page"
                id="JotoOX"
              />
            ) : (
              <FormattedMessage
                defaultMessage="Profile"
                description="Title of Projects Profile page"
                id="JQT5KD"
              />
            )}
          </Heading>
          {isMyProfile && (
            <Button
              href="/projects/profile/edit"
              icon={RiPencilFill}
              label={intl.formatMessage({
                defaultMessage: 'Edit',
                description: 'Label for edit projects profile button',
                id: 'nsdh11',
              })}
              variant="secondary"
            />
          )}
        </div>
        <ProjectsProfileInfo isMyProfile={isMyProfile} profile={profile} />
        <ProjectsProfileStats />
        <ProjectsProfileFeaturedSubmissions />
      </div>
    </Container>
  );
}
