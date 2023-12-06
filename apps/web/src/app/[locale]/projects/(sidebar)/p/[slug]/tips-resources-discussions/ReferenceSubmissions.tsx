import { FormattedMessage } from 'react-intl';

import ProjectsSubmissionCard from '~/components/projects/submissions/ProjectsSubmissionCard';
import type { ProjectsSubmission } from '~/components/projects/submissions/types';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

const exampleSubmissions: Array<ProjectsSubmission> = Array.from(
  { length: 10 },
  (_, i) => ({
    author: {
      app_metadata: {
        provider: 'auth0',
      },
      aud: '',
      created_at: '',
      email: 'example@abc.com',
      id: 'user1',
      user_metadata: {
        avatar_url: 'https://source.unsplash.com/random/48x48',
        full_name: 'John Smith',
      },
    },
    commentCount: 0,
    description:
      'On this project, I found validating the users email address difficult. I was unable to validate the users email because of I was unable to relate the EventListener and the validate email function. I will like to know the best way to go about this and I will appreciate any contributions.',
    imgSrc: 'https://source.unsplash.com/random/640x360',
    likeCount: 0,
    slug: `responsive-solution-built-with-react-${i}`,
    stack: [
      {
        difficulty: 'easy',
        key: 'react',
        label: 'React',
      },
      {
        difficulty: 'medium',
        key: 'css',
        label: 'CSS',
      },
    ],
    submissionDate: new Date(),
    title: 'Responsive solution built with React',
    viewCount: 0,
  }),
);

export default function ReferenceSubmissions() {
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
        <Text className="mt-4" color="secondary" size="body2">
          <FormattedMessage
            defaultMessage="Here are some highly rated submissions you can reference while doing your project. We prioritize submissions by their ratings, the similarity of their tech stack to yours, and the seniority level of the commenter."
            description="Description for Reference Submissions section on Projects project tips & resources page"
            id="y9NC4Q"
          />
        </Text>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {exampleSubmissions.map((submission) => (
            <ProjectsSubmissionCard
              key={submission.slug}
              submission={submission}
            />
          ))}
        </div>
      </Section>
    </div>
  );
}
