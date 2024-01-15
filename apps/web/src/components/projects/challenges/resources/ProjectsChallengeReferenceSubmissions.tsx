import { FormattedMessage } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Spinner from '~/components/ui/Spinner';
import Text from '~/components/ui/Text';

import type { ProjectsChallengeItem } from '../types';
import ProjectsChallengeSubmissionList from '../../submissions/lists/ProjectsChallengeSubmissionList';

type Props = Readonly<{
  challenge: ProjectsChallengeItem;
}>;

export default function ProjectsChallengeReferenceSubmissions({
  challenge,
}: Props) {
  const { data: referenceSubmissions, isLoading } =
    trpc.projects.submissions.reference.useQuery({
      slug: challenge.metadata.slug,
    });

  return (
    <div className="flex flex-col">
      <Heading level="heading5">
        <FormattedMessage
          defaultMessage="Submissions you can reference"
          description="Title for Reference Submissions section on Projects project tips & resources page"
          id="6PA1sS"
        />
      </Heading>
      <Section>
        <div className="flex flex-col gap-8">
          <Text
            className="mt-4 max-w-screen-md"
            color="secondary"
            display="block"
            size="body2">
            <FormattedMessage
              defaultMessage="Here are some highly-rated submissions you can reference while doing your project. We prioritize submissions by their ratings, the similarity of their tech stack to yours, and the seniority level of the commenter."
              description="Description for Reference Submissions section on Projects project tips & resources page"
              id="TfBpeT"
            />
          </Text>
          {isLoading ? (
            <Spinner display="block" size="lg" />
          ) : (
            <ProjectsChallengeSubmissionList
              submissions={referenceSubmissions ?? []}
            />
          )}
        </div>
      </Section>
    </div>
  );
}
