import { Controller, useForm } from 'react-hook-form';
import { RiArrowRightLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import ProjectsChallengeReputationTag from '~/components/projects/challenges/metadata/ProjectsChallengeReputationTag';
import ProjectsProfileSocialInput from '~/components/projects/profile/ProjectsProfileSocialInput';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import TextArea from '~/components/ui/TextArea';

import { useI18nRouter } from '~/next-i18nostic/src';

export type ProjectsOnboardingProfileStep2FormValues = Readonly<{
  bio: string;
  githubUsername: string;
  linkedInUsername: string;
  website: string;
}>;

export default function ProjectsOnboardingProfileStep2() {
  const router = useI18nRouter();
  const intl = useIntl();
  const { data: initialValues } =
    trpc.projects.profile.onboardingStep2Get.useQuery();
  const onboardingStep2UpdateMutation =
    trpc.projects.profile.onboardingStep2Update.useMutation({
      onSuccess: () => {
        router.push('/projects/challenges');
      },
    });

  const {
    control,
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = useForm<ProjectsOnboardingProfileStep2FormValues>({
    values: {
      bio: initialValues?.bio ?? '',
      githubUsername: initialValues?.githubUsername ?? '',
      linkedInUsername: initialValues?.linkedInUsername ?? '',
      website: initialValues?.website ?? '',
    },
  });

  return (
    <>
      <div className="mt-8 flex justify-between gap-2">
        <Heading level="heading6">
          <FormattedMessage
            defaultMessage="Set up your profile"
            description="Title for Projects profile onboarding page"
            id="GxJeqH"
          />
        </Heading>
        <Button
          className="-me-5"
          href="/projects/challenges"
          icon={RiArrowRightLine}
          label={intl.formatMessage({
            defaultMessage: 'Skip for now',
            description:
              'Label for "Skip for now" button on Projects profile onboarding page',
            id: 'fs9YFE',
          })}
          variant="tertiary"
        />
      </div>
      <form
        className="mt-6 flex flex-col gap-y-16"
        onSubmit={handleSubmit(async (data) => {
          await onboardingStep2UpdateMutation.mutateAsync(data);
        })}>
        <div className="relative">
          <ProjectsChallengeReputationTag
            className="absolute end-0 top-0"
            points={25}
            variant="filled"
          />
          <Controller
            control={control}
            name="bio"
            render={({ field }) => (
              <TextArea
                description={intl.formatMessage({
                  defaultMessage:
                    'Tell the community about yourself - your background, skills, aspirations and skills and tools you hope to pick up!',
                  description:
                    'Description for Biography input on Projects profile onboarding page',
                  id: 'I60bQN',
                })}
                descriptionStyle="tooltip"
                label={intl.formatMessage({
                  defaultMessage: 'Bio',
                  description:
                    'Label for Biography input on Projects profile onboarding page',
                  id: 'ZNPYCk',
                })}
                placeholder={intl.formatMessage({
                  defaultMessage:
                    'Tell us anything - about your journey as a front end developer, your goals and next steps, or how you want to connect with others',
                  description:
                    'Placeholder for Biography input on Projects profile onboarding page',
                  id: 'jeX0Hi',
                })}
                {...field}
              />
            )}
          />
        </div>
        <div className="flex flex-col gap-y-6">
          <Text weight="bold">
            <FormattedMessage
              defaultMessage="Social links"
              description="Label for Social Links section of Projects profile onboarding page"
              id="jCp/VW"
            />
          </Text>
          <ProjectsProfileSocialInput
            control={control}
            showReputationCountIncreaseTag={true}
          />
        </div>
        <Button
          className="self-end"
          icon={RiArrowRightLine}
          isDisabled={!isDirty || isSubmitting}
          isLoading={isSubmitting}
          label={intl.formatMessage({
            defaultMessage: 'Get started',
            description:
              'Label for Get Started button on Projects profile onboarding page',
            id: 'iBfH9v',
          })}
          size="lg"
          type="submit"
          variant="primary"
        />
      </form>
    </>
  );
}