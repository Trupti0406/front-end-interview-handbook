import clsx from 'clsx';
import type { ProjectsChallengeMetadata } from 'contentlayer/generated';
import { FormattedMessage, useIntl } from 'react-intl';

import RelativeTimestamp from '~/components/projects/common/RelativeTimestamp';
import ProjectsProfileAvatar from '~/components/projects/users/ProjectsProfileAvatar';
import Anchor from '~/components/ui/Anchor';
import {
  Hovercard,
  HovercardContent,
  HovercardTrigger,
} from '~/components/ui/Hovercard/Hovercard';
import Text from '~/components/ui/Text';
import {
  themeBackgroundCardAltColor,
  themeGlassyBorder,
} from '~/components/ui/theme';

import ProjectsChallengeHoverCard from './ProjectsChallengeHoverCard';
import ProjectsChallengeSubmissionCardPinButton from './ProjectsChallengeSubmissionCardPinButton';
import type { ProjectsChallengeSubmissionAugmented } from '../types';
import ProjectsChallengeStatusBadge from '../../challenges/status/ProjectsChallengeStatusBadge';
import ProjectsSkillRow from '../../skills/ProjectsSkillRow';
import ProjectsCommentCountTag from '../../stats/ProjectsCommentCountTag';
import ProjectsViewCountTag from '../../stats/ProjectsViewCountTag';
import ProjectsVoteCountTag from '../../stats/ProjectsVoteCountTag';
import ProjectsProfileLink from '../../users/ProjectsProfileLink';
import ProjectsUserJobTitle from '../../users/ProjectsUserJobTitle';
import ProjectsUserYearsOfExperience from '../../users/ProjectsUserYearsOfExperience';

import type { ProjectsChallengeSessionStatus } from '@prisma/client';

type Props = Readonly<{
  challenge?: Readonly<{
    metadata: ProjectsChallengeMetadata;
    status: ProjectsChallengeSessionStatus | null;
  }>;
  isPinned?: boolean;
  submission: ProjectsChallengeSubmissionAugmented;
}>;

export default function ProjectsChallengeSubmissionCard({
  isPinned = false,
  challenge,
  submission,
}: Props) {
  const intl = useIntl();
  const { hrefs, title, stack, summary, comments, views, imgSrc } = submission;
  const author = submission.projectsProfile?.userProfile;
  const { votes } = submission._count;

  return (
    <div
      className={clsx(
        'flex flex-col gap-4',
        'rounded-lg',
        'px-4 py-6',
        themeGlassyBorder,
        themeBackgroundCardAltColor,
      )}>
      {challenge != null && (
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Text color="secondary" size="body3">
              <FormattedMessage
                defaultMessage="Challenge: <hover>{title}</hover>"
                description="Link to project submission's original challenge"
                id="WUv05Y"
                values={{
                  hover: (chunks) => (
                    <Hovercard>
                      <HovercardTrigger>
                        <Anchor href={challenge?.metadata.href}>
                          {chunks}
                        </Anchor>
                      </HovercardTrigger>
                      <HovercardContent
                        className={clsx(
                          'border-none bg-neutral-50 dark:bg-neutral-900',
                        )}>
                        <ProjectsChallengeHoverCard
                          challengeSlug={challenge.metadata.slug}
                          profileId={submission.profileId}
                        />
                      </HovercardContent>
                    </Hovercard>
                  ),
                  title: challenge?.metadata.title,
                }}
              />
            </Text>
            {!isPinned && (
              <ProjectsChallengeStatusBadge status={challenge.status} />
            )}
          </div>
          {isPinned && (
            <ProjectsChallengeSubmissionCardPinButton
              submissionId={submission.id}
            />
          )}
        </div>
      )}
      <div className="flex flex-col gap-3">
        <Anchor href={hrefs.detail}>
          <Text weight="bold">{title}</Text>
        </Anchor>
        <ProjectsSkillRow
          label={intl.formatMessage({
            defaultMessage: 'Stack used',
            description: 'Label for tech stack used in project',
            id: 'aiI8c6',
          })}
          skills={stack}
        />
      </div>
      <img alt={title} className="h-[190px] w-full rounded-md" src={imgSrc} />
      {!isPinned && author != null && (
        <div className="flex items-center gap-4">
          <ProjectsProfileAvatar
            level={11}
            profile={author}
            progress={40}
            size="xl"
          />
          <div className="flex flex-col gap-1">
            <Text size="body2" weight="medium">
              <ProjectsProfileLink profile={author} />
            </Text>
            <div className="flex gap-x-4 flex-wrap gap-y-2">
              {author.title && (
                <ProjectsUserJobTitle jobTitle={author.title} size="2xs" />
              )}
              <ProjectsUserYearsOfExperience size="2xs" yearsOfExperience={2} />
            </div>
          </div>
        </div>
      )}
      <Text color="subtitle" display="block" size="body3">
        {summary}
      </Text>
      <div className="flex justify-between gap-4">
        <div className="flex gap-4">
          <ProjectsVoteCountTag count={votes} />
          <ProjectsViewCountTag count={views} />
          <ProjectsCommentCountTag count={comments ?? 0} />
        </div>
        <Text color="secondary" size="body3">
          <RelativeTimestamp timestamp={submission.createdAt} />
        </Text>
      </div>
    </div>
  );
}
