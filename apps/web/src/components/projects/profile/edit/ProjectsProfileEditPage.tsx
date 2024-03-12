'use client';

import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { z } from 'zod';

import { trpc } from '~/hooks/trpc';

import { useToast } from '~/components/global/toasts/useToast';
import { useProfileNameSchema } from '~/components/profile/fields/ProfileNameSchema';
import { useProfileUsernameSchema } from '~/components/profile/fields/ProfileUsernameSchema';
import useProjectsMotivationReasonSchema, {
  convertProjectsMotivationReasonToFormValue,
} from '~/components/projects/hooks/useProjectsMotivationReasonSchema';
import useProjectsProfileExperienceValueInitializer from '~/components/projects/hooks/useProjectsProfileExperienceValueInitializer';
import ProjectsProfileBasicInfoSection from '~/components/projects/profile/edit/ProjectsProfileBasicInfoSection';
import ProjectsProfileJobSection from '~/components/projects/profile/edit/ProjectsProfileJobSection';
import ProjectsProfileMotivationSection from '~/components/projects/profile/edit/ProjectsProfileMotivationSection';
import ProjectsProfileSkillSection from '~/components/projects/profile/edit/ProjectsProfileSkillSection';
import ProjectsProfileSocialSection from '~/components/projects/profile/edit/ProjectsProfileSocialSection';
import {
  useProjectsJobNotStartedSchema,
  useProjectsJobStartedSchema,
} from '~/components/projects/profile/fields/ProjectsProfileJobSchema';
import { useProjectsSkillListInputSchema } from '~/components/projects/skills/form/ProjectsSkillListInputSchema';
import type { ProjectsProfileEditFormValues } from '~/components/projects/types';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';

import { useI18nRouter } from '~/next-i18nostic/src';

import { zodResolver } from '@hookform/resolvers/zod';
import type { Profile, ProjectsProfile } from '@prisma/client';

function useProjectsProfileEditSchema() {
  const motivationReasonSchema = useProjectsMotivationReasonSchema({
    isRequired: true,
  });
  const skillsProficientSchema = useProjectsSkillListInputSchema({
    required: false,
  });
  const skillsToGrowSchema = useProjectsSkillListInputSchema({
    required: false,
  });
  const nameSchema = useProfileNameSchema();
  const usernameSchema = useProfileUsernameSchema();
  const jobNotStartedSchema = useProjectsJobNotStartedSchema();
  const jobStartedSchema = useProjectsJobStartedSchema();

  const baseSchema = z.object({
    avatarUrl: z.string().optional(),
    bio: z.string(),
    githubUsername: z
      .union([z.string().length(0), z.string().url()])
      .transform((val) => (val ? val : null))
      .nullable(),
    linkedInUsername: z
      .union([z.string().length(0), z.string().url()])
      .transform((val) => (val ? val : null))
      .nullable(),
    motivations: motivationReasonSchema,
    name: nameSchema,
    skillsProficient: skillsProficientSchema,
    skillsToGrow: skillsToGrowSchema,
    username: usernameSchema,
    website: z
      .union([z.string().length(0), z.string().url()])
      .transform((val) => (val ? val : null))
      .nullable(),
  });

  return z.discriminatedUnion('hasStartedWork', [
    baseSchema.extend(jobStartedSchema),
    baseSchema.extend(jobNotStartedSchema),
  ]);
}

type ProjectsEditProfileTransformedValues = z.infer<
  ReturnType<typeof useProjectsProfileEditSchema>
>;

type Props = Readonly<{
  userProfile: Profile &
    Readonly<{
      projectsProfile: ProjectsProfile;
    }>;
}>;

export default function ProjectsProfileEditPage({ userProfile }: Props) {
  const intl = useIntl();
  const router = useI18nRouter();
  const { showToast } = useToast();
  const projectsProfileUpdateMutation =
    trpc.projects.profile.update.useMutation();
  const { data: initialValues } = trpc.projects.profile.viewer.useQuery(
    undefined,
    {
      initialData: userProfile,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  );

  const projectsProfileEditSchema = useProjectsProfileEditSchema();
  const experienceInitialValues = useProjectsProfileExperienceValueInitializer({
    company: initialValues?.company,
    currentStatus: initialValues?.currentStatus,
    startWorkDate: initialValues?.startWorkDate,
    title: initialValues?.title,
  });

  const methods = useForm<
    ProjectsProfileEditFormValues,
    undefined,
    ProjectsEditProfileTransformedValues
  >({
    mode: 'onTouched',
    resolver: zodResolver(projectsProfileEditSchema),
    values: {
      avatarUrl: initialValues?.avatarUrl ?? '',
      bio: initialValues?.bio ?? '',
      githubUsername: initialValues?.githubUsername ?? '',
      linkedInUsername: initialValues?.linkedInUsername ?? '',
      motivations: convertProjectsMotivationReasonToFormValue(
        initialValues?.projectsProfile?.motivations ?? [],
      ),
      name: initialValues?.name ?? '',
      skillsProficient: initialValues?.projectsProfile?.skillsProficient ?? [],
      skillsToGrow: initialValues?.projectsProfile?.skillsToGrow ?? [],
      username: initialValues?.username ?? '',
      website: initialValues?.website ?? '',
      ...experienceInitialValues,
    },
  });
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty },
  } = methods;
  const [usernameExistsError, setUsernameExistsError] = useState(false);

  const onSave = async (data: ProjectsEditProfileTransformedValues) => {
    await projectsProfileUpdateMutation.mutateAsync(
      {
        avatarUrl: data.avatarUrl,
        bio: data.bio,
        company: data.company,
        currentStatus: data.hasStartedWork ? null : data.yoeReplacement,
        githubUsername: data.githubUsername,
        linkedInUsername: data.linkedInUsername,
        motivations: data.motivations.flatMap((motivation) =>
          motivation != null ? [motivation] : [],
        ),
        name: data.name,
        skillsProficient: data.skillsProficient,
        skillsToGrow: data.skillsToGrow,
        startWorkDate: data.monthYearExperience,
        title: data.jobTitle,
        username: data.username,
        website: data.website,
      },
      {
        onError: () => {
          showToast({
            title: (
              <FormattedMessage
                defaultMessage="Something went wrong. Try again later or contact <link>support@greatfrontend.com</link>!"
                description="Error toast for project"
                id="5Gjt4J"
                values={{
                  link: (chunks) => (
                    <Anchor href="mailto:support@greatfrontend.com">
                      {chunks}
                    </Anchor>
                  ),
                }}
              />
            ),
            variant: 'danger',
          });
        },
        onSuccess: () => {
          showToast({
            title: (
              <FormattedMessage
                defaultMessage="Profile saved!"
                description="Toast for project profile saved"
                id="fjj5BL"
              />
            ),
            variant: 'success',
          });
          router.push(`/projects/u/${data.username}`);
        },
      },
    );
  };

  return (
    <div className="flex flex-col gap-8">
      <Heading level="heading5">
        <FormattedMessage
          defaultMessage="Edit Profile"
          description="Title of projects profile edit page"
          id="v2g4rl"
        />
      </Heading>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(
            async (data: ProjectsEditProfileTransformedValues) =>
              await onSave(data),
          )}>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-14 md:gap-20">
              <ProjectsProfileBasicInfoSection
                setUsernameExistsError={setUsernameExistsError}
              />
              <ProjectsProfileMotivationSection view="profile" />
              <ProjectsProfileSkillSection />
              <div className="flex flex-col gap-6 md:flex-row">
                <div className="flex-1">
                  <ProjectsProfileJobSection />
                </div>
                <div className="flex-1">
                  <ProjectsProfileSocialSection />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-4">
              {isDirty && (
                <Button
                  isDisabled={isSubmitting}
                  label={intl.formatMessage({
                    defaultMessage: 'Cancel',
                    description:
                      'Label for cancel button for projects profile edit page',
                    id: 'nepkqj',
                  })}
                  variant="secondary"
                  onClick={() => reset()}
                />
              )}
              <Button
                isDisabled={!isDirty || isSubmitting || usernameExistsError}
                isLoading={isSubmitting}
                label={intl.formatMessage({
                  defaultMessage: 'Save changes',
                  description:
                    'Label for save changes button for projects profile edit page',
                  id: 'Kne0pQ',
                })}
                type="submit"
                variant="primary"
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
