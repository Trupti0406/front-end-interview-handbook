'use client';

import { FormattedMessage } from 'react-intl';

import ProjectsChallengeGridListWithFilters from '~/components/projects/challenges/lists/ProjectsChallengeGridListWithFilters';
import type { ProjectsChallengeItem } from '~/components/projects/challenges/types';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

type Props = Readonly<{
  challenges: ReadonlyArray<ProjectsChallengeItem>;
}>;

export default function ProjectsChallengeListPage({ challenges }: Props) {
  return (
    <div className="flex flex-col gap-9">
      <div className="flex max-w-prose flex-col gap-1">
        <Heading level="heading6">
          <FormattedMessage
            defaultMessage="Browse all challenges"
            description="Title of Projects challenges page"
            id="uqu1l4"
          />
        </Heading>
        <Section>
          <Text color="secondary" size="body2">
            <FormattedMessage
              defaultMessage="Start building any project you can dream of to train your front end / full stack skills or to build a useful toolkit."
              description="Description of Projects challenges page"
              id="dxQHSA"
            />
          </Text>
        </Section>
      </div>
      <Section>
        <ProjectsChallengeGridListWithFilters challenges={challenges} />
      </Section>
    </div>
  );
}