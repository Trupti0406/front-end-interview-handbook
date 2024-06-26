'use client';

import { useState } from 'react';
import { RiArrowLeftLine, RiFireFill } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import { SUBMISSION_SUCCESS_PAGE_AVAILABLE } from '~/data/FeatureFlags';

import { useToast } from '~/components/global/toasts/useToast';
import type {
  ProjectsChallengeItem,
  ProjectsChallengeVariantImages,
} from '~/components/projects/challenges/types';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

import { useI18nRouter } from '~/next-i18nostic/src';

import ProjectsChallengeSubmissionForm from './ProjectsChallengeSubmissionForm';
import ProjectsChallengeSubmissionSuccessPage from '../ProjectsChallengeSubmissionSuccessPage';
import useProjectsChallengeSubmissionTakeScreenshotMutation from '../screenshots/useProjectsChallengeSubmissionTakeScreenshotMutation';
import { projectsReputationLevel } from '../../reputation/projectsReputationLevelUtils';

import type { ProjectsChallengeSession } from '@prisma/client';
type SuccessPageInformationState = Readonly<{
  gainedPoints: number;
  isLeveledUp: boolean;
  level: number;
  showSuccess: boolean;
  submissionUrl: string;
}>;
type Props = Readonly<{
  challenge: ProjectsChallengeItem;
  isViewerPremium: boolean;
  locale: string;
  points: number;
  session: ProjectsChallengeSession;
}>;

export default function ProjectsChallengeSubmitPage({
  challenge,
  session,
  isViewerPremium,
  locale,
  points: initialPoints,
}: Props) {
  const trpcUtils = trpc.useUtils();
  const intl = useIntl();
  const { showToast } = useToast();
  const router = useI18nRouter();

  const [successPageInfo, setSuccessPageInfo] =
    useState<SuccessPageInformationState>({
      gainedPoints: 0,
      isLeveledUp: false,
      level: projectsReputationLevel(initialPoints).level,
      showSuccess: false,
      submissionUrl: '',
    });

  const { showSuccess, isLeveledUp, level, submissionUrl, gainedPoints } =
    successPageInfo;

  const takeScreenshotMutation =
    useProjectsChallengeSubmissionTakeScreenshotMutation('form');
  const createSubmissionMutation = trpc.projects.submission.create.useMutation({
    onError: () => {
      showToast({
        title: intl.formatMessage({
          defaultMessage: 'Oops something went wrong',
          description: 'Error message',
          id: 'Nz7W/0',
        }),
        variant: 'danger',
      });
    },
    onSuccess: ({ submission, points }) => {
      takeScreenshotMutation.mutate({ submissionId: submission.id });
      trpcUtils.projects.profile.invalidate();
      trpcUtils.projects.submissions.invalidate();

      const formattedPoints = new Intl.NumberFormat().format(points);

      showToast({
        addOnIcon: RiFireFill,
        addOnLabel: `+${formattedPoints}`,
        description: intl.formatMessage(
          {
            defaultMessage:
              'You have gained {points} rep for completing the project! ✨',
            description: 'Success message after submitting a project',
            id: 'dZR5Qu',
          },
          {
            points: formattedPoints,
          },
        ),
        title: intl.formatMessage({
          defaultMessage: 'Congratulations!',
          description: 'Success message',
          id: '5qLBww',
        }),
        variant: 'success',
      });

      if (SUBMISSION_SUCCESS_PAGE_AVAILABLE) {
        const newPoints = initialPoints + points;
        const { level: newLevel } = projectsReputationLevel(newPoints);

        const { level: oldLevel } = successPageInfo;

        setSuccessPageInfo((oldInfo) => ({
          ...oldInfo,
          gainedPoints: points,
          isLeveledUp: newLevel > oldLevel,
          level: newLevel,
          showSuccess: true,
          submissionUrl: submission.hrefs.detail,
        }));
      } else {
        router.push(submission.hrefs.detail);
      }
    },
  });

  const { href } = challenge.metadata;

  if (showSuccess && SUBMISSION_SUCCESS_PAGE_AVAILABLE) {
    return (
      <ProjectsChallengeSubmissionSuccessPage
        isLeveledUp={isLeveledUp}
        isViewerPremium={isViewerPremium}
        level={level}
        locale={locale}
        points={gainedPoints}
        submissionUrl={submissionUrl}
      />
    );
  }

  return (
    <div>
      <div className="flex">
        <Button
          addonPosition="start"
          className="-ms-4 -mt-2"
          href={href}
          icon={RiArrowLeftLine}
          label={intl.formatMessage({
            defaultMessage: 'To challenge',
            description: 'Link label to go back to the challenge details page',
            id: 'IGlDjB',
          })}
          variant="tertiary"
        />
      </div>
      <Heading className="mt-8" level="heading5">
        <FormattedMessage
          defaultMessage="Project submission"
          description="Title for the project submission checklist section"
          id="VuGzvG"
        />
      </Heading>
      <div className="mt-9">
        <Section>
          <ProjectsChallengeSubmissionForm
            cancelButtonHref={challenge.metadata.completionHref}
            challengeDefaultSkills={challenge.metadata.skills}
            challengeDefaultSpecPageLabels={challenge.info.specLabels}
            challengeDefaultSpecPages={(
              challenge.metadata.specImages
                .default as ProjectsChallengeVariantImages
            ).map(({ label }) => label)}
            defaultValues={{
              roadmapSkills: session.roadmapSkills,
              techStackSkills: session.techStackSkills,
            }}
            isDisabled={createSubmissionMutation.isLoading}
            isSaving={createSubmissionMutation.isLoading}
            mode="create"
            onSubmit={(data) => {
              createSubmissionMutation.mutate({
                slug: challenge.metadata.slug,
                ...data,
              });
            }}
          />
        </Section>
      </div>
    </div>
  );
}
