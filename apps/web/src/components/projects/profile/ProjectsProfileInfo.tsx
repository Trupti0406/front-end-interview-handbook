import { RiPencilFill, RiStarSmileFill } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import UserProfileInformationRow from '~/components/profile/info/UserProfileInformationRow';
import ProjectsProfileBio from '~/components/projects/profile/info/ProjectsProfileBio';
import ProjectsProfileMotivation from '~/components/projects/profile/info/ProjectsProfileMotivation';
import ProjectsProfileSkillsList from '~/components/projects/profile/info/ProjectsProfileSkillsList';
import ProjectsProfileAvatar from '~/components/projects/users/ProjectsProfileAvatar';
import ProjectsUserReputation from '~/components/projects/users/ProjectsUserReputation';
import Badge from '~/components/ui/Badge';
import Button from '~/components/ui/Button';
import Chip from '~/components/ui/Chip';
import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

import ProjectsProfileSocialLinks from './info/ProjectsProfileSocialLinks';
import ProjectsProfileUsernameBadge from './info/ProjectsProfileUsernameBadge';
import ProjectsProfileDisplayNameLink from '../users/ProjectsProfileDisplayNameLink';

import type { Profile, ProjectsProfile } from '@prisma/client';

type Props = Readonly<{
  isViewingOwnProfile: boolean;
  userProfile: Profile &
    Readonly<{
      projectsProfile: ProjectsProfile;
    }>;
}>;

export default function ProjectsProfileInfo({
  userProfile,
  isViewingOwnProfile,
}: Props) {
  const intl = useIntl();
  const { projectsProfile } = userProfile;

  return (
    <>
      <Section>
        <div className="hidden items-center gap-6 md:flex">
          <ProjectsProfileAvatar
            points={projectsProfile.points}
            profile={userProfile}
            size="3xl"
          />
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-4">
              <Text size="body1" weight="medium">
                <ProjectsProfileDisplayNameLink profile={userProfile} />
              </Text>
              <ProjectsProfileUsernameBadge
                premium={projectsProfile.premium}
                username={userProfile.username}
              />
            </div>
            <UserProfileInformationRow profile={userProfile} />
            <div className="flex items-center gap-3">
              <ProjectsUserReputation
                points={projectsProfile.points}
                size="body2"
              />
              <ProjectsProfileSocialLinks userProfile={userProfile} />
            </div>
          </div>
        </div>
        <div className="flex flex-col md:hidden">
          <div className="flex items-center gap-8">
            <ProjectsProfileAvatar
              points={projectsProfile.points}
              profile={userProfile}
              size="3xl"
            />
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <Text size="body1" weight="medium">
                  <ProjectsProfileDisplayNameLink profile={userProfile} />
                </Text>
                <div className="flex items-center gap-2">
                  {projectsProfile.premium && (
                    <Chip
                      icon={RiStarSmileFill}
                      isLabelHidden={true}
                      label="Premium"
                      size="sm"
                      variant="special"
                    />
                  )}
                  <ProjectsProfileSocialLinks userProfile={userProfile} />
                </div>
              </div>
              <Text color="secondary" size="body2">
                <FormattedMessage
                  defaultMessage="Joined on {date}"
                  description="Projects profile created date"
                  id="IO/eOZ"
                  values={{
                    date: new Date(
                      projectsProfile.createdAt,
                    ).toLocaleDateString('en-US', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    }),
                  }}
                />
              </Text>
              <ProjectsUserReputation points={projectsProfile.points} />
            </div>
          </div>
          <Divider className="mb-6 mt-8" />
          <div className="flex flex-col gap-8">
            <Heading level="heading6">
              <FormattedMessage
                defaultMessage="Profile"
                description="Title of Projects Profile page"
                id="JQT5KD"
              />
            </Heading>
            <UserProfileInformationRow profile={userProfile} />
          </div>
        </div>
      </Section>
      <div className="flex flex-col justify-between gap-8 md:flex-row">
        <div className="flex w-full flex-col gap-8 md:w-2/5">
          {userProfile.bio && <ProjectsProfileBio bio={userProfile.bio} />}
          {projectsProfile.motivations &&
            projectsProfile.motivations.length > 0 && (
              <ProjectsProfileMotivation
                motivations={projectsProfile.motivations}
              />
            )}
        </div>
        <div className="flex w-full flex-col gap-8 md:w-2/5">
          {projectsProfile.skillsProficient.length > 0 && (
            <ProjectsProfileSkillsList
              heading={intl.formatMessage({
                defaultMessage: 'Proficient skills',
                description:
                  'Projects profile tech stack proficient section title',
                id: 'WyHdb2',
              })}
              skills={projectsProfile.skillsProficient}
              tooltipMessage={intl.formatMessage({
                defaultMessage:
                  'Familiar with these skills / tools / frameworks',
                description:
                  'Projects profile tech stack proficient section title',
                id: '2yhoAr',
              })}
            />
          )}
          {projectsProfile.skillsToGrow.length > 0 && (
            <ProjectsProfileSkillsList
              heading={intl.formatMessage({
                defaultMessage: 'Hoping to grow in',
                description:
                  'Projects profile tech stack I am hoping to grow section title',
                id: 'M1iUIY',
              })}
              skills={projectsProfile.skillsToGrow}
              tooltipMessage={intl.formatMessage({
                defaultMessage: 'Hoping to grow in skills / tools / frameworks',
                description:
                  'Projects profile tech stack I am hoping to grow section title',
                id: 'P3mHDw',
              })}
            />
          )}
        </div>
      </div>
      {isViewingOwnProfile && (
        <div className="block md:hidden">
          <Button
            href="/projects/profile/edit"
            icon={RiPencilFill}
            label={intl.formatMessage({
              defaultMessage: 'Edit profile',
              description: 'Label for edit projects profile button',
              id: '4s0s2J',
            })}
            variant="secondary"
          />
        </div>
      )}
    </>
  );
}
