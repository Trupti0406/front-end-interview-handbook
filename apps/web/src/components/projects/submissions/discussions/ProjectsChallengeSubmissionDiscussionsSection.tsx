import clsx from 'clsx';
import { FormattedMessage } from 'react-intl';

import useProfile from '~/hooks/user/useProfile';

import DiscussionsCommentList from '~/components/discussions/DiscussionsCommentList';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import {
  themeBackgroundCardColor,
  themeBorderColor,
} from '~/components/ui/theme';

import ProjectsChallengeSubmissionDiscussionsNewComment from './ProjectsChallengeSubmissionDiscussionsNewComment';
import type { ProjectsChallengeSubmissionAugmented } from '../types';

type Props = Readonly<{
  submission: ProjectsChallengeSubmissionAugmented;
}>;

export default function ProjectsChallengeSubmissionDiscussionsSection({
  submission,
}: Props) {
  const { profile } = useProfile();

  return (
    <div
      className={clsx(
        'flex flex-col gap-8 py-8 px-4 md:px-8 rounded-b-lg',
        ['border-b border-x', themeBorderColor],
        themeBackgroundCardColor,
      )}>
      <Text size="body1" weight="bold">
        <FormattedMessage
          defaultMessage="Discussions"
          description="Challenge submission discussion section title"
          id="fklQmL"
        />
      </Text>
      <Section>
        {profile && (
          <ProjectsChallengeSubmissionDiscussionsNewComment
            submission={submission}
            // TODO(projects): fetch real points
            viewer={{ ...profile, points: 42 }}
          />
        )}
        <div className="w-full">
          <DiscussionsCommentList
            domain="PROJECTS_SUBMISSION"
            entityId={submission.id}
            // TODO(projects): fetch real points
            viewer={profile == null ? null : { ...profile, points: 42 }}
          />
        </div>
      </Section>
    </div>
  );
}
