'use client';

import { useEffect } from 'react';

import { trpc } from '~/hooks/trpc';

import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Prose from '~/components/ui/Prose';

import type { ProjectsChallengeSubmissionItem } from './types';
import type { ProjectsChallengeItem } from '../challenges/types';

type Props = Readonly<{
  challenge: ProjectsChallengeItem;
  submission: ProjectsChallengeSubmissionItem;
}>;

export default function ProjectsChallengeSubmissionPage({
  challenge,
  submission,
}: Props) {
  const viewSubmissionMutation = trpc.projects.submissions.view.useMutation();
  const submissionId = submission.id;

  useEffect(() => {
    viewSubmissionMutation.mutate({
      submissionId,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submissionId]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <Heading level="heading5">{submission.title}</Heading>
        <p>{submission.summary}</p>
      </div>
      <Divider />
      <Section>
        <Prose textSize="sm">
          <div
            dangerouslySetInnerHTML={{ __html: submission.implementation }}
          />
        </Prose>
      </Section>
    </div>
  );
}
