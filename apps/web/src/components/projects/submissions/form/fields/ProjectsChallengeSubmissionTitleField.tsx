import { type Control, useController } from 'react-hook-form';
import { useIntl } from 'react-intl';

import TextInput from '~/components/ui/TextInput';

import { getProjectsChallengeSubmissionTitleAttributes } from './ProjectsChallengeSubmissionTitleSchema';
import type { ProjectsChallengeSubmissionFormValues } from '../ProjectsChallengeSubmissionForm';

type Props = Readonly<{
  control: Control<ProjectsChallengeSubmissionFormValues>;
}>;

const fieldName = 'title';

export default function ProjectsChallengeSubmissionTitleField({
  control,
}: Props) {
  const intl = useIntl();
  const attrs = getProjectsChallengeSubmissionTitleAttributes(intl);
  const { field, formState } = useController({
    control,
    name: fieldName,
    rules: { required: true },
  });

  return (
    <TextInput
      autoFocus={true}
      description={attrs.description}
      descriptionStyle="tooltip"
      errorMessage={formState.errors[fieldName]?.message}
      label={attrs.label}
      maxLength={attrs.validation.maxLength}
      placeholder={attrs.placeholder}
      required={attrs.validation.required}
      {...field}
    />
  );
}
