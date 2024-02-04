import type { Control } from 'react-hook-form';
import { useController } from 'react-hook-form';
import { useIntl } from 'react-intl';

import { projectsSkillsCategorized } from '~/components/projects/skills/data/ProjectsSkillProcessor';
import ProjectsSkillTechStackInput from '~/components/projects/skills/form/ProjectsSkillTechStackInput';

import { getProjectsChallengeSubmissionTechStackAttributes } from './ProjectsChallengeSubmissionTechStackSchema';
import type { ProjectsChallengeSubmissionFormValues } from '../ProjectsChallengeSubmissionForm';

type Props = Readonly<{
  control: Control<ProjectsChallengeSubmissionFormValues>;
}>;

const fieldName = 'skills';

export default function ProjectsChallengeSubmissionTechStackField({
  control,
}: Props) {
  const intl = useIntl();
  const attrs = getProjectsChallengeSubmissionTechStackAttributes(intl);
  const { field, formState } = useController({
    control,
    name: fieldName,
    rules: { required: true },
  });
  const { roadmapSkills, techStackSkills } = projectsSkillsCategorized(
    field.value,
  );

  return (
    <ProjectsSkillTechStackInput
      errorMessage={
        techStackSkills.length === 0
          ? formState.errors[fieldName]?.message
          : undefined
      }
      required={attrs.validation.required}
      {...field}
      value={techStackSkills}
      onChange={(newTechStackSkills) => {
        field.onChange([...(newTechStackSkills ?? []), ...roadmapSkills]);
      }}
    />
  );
}
