import type { Control } from 'react-hook-form';
import { useController } from 'react-hook-form';
import { useIntl } from 'react-intl';

import RichTextEditor from '~/components/ui/RichTextEditor';

import { getProjectsChallengeSubmissionImplementationAttributes } from './ProjectsChallengeSubmissionImplementationSchema';
import type { ProjectsChallengeSubmissionFormValues } from '../ProjectsChallengeSubmissionForm';

type Props = Readonly<{
  control: Control<ProjectsChallengeSubmissionFormValues>;
}>;

const fieldName = 'implementation';

export default function ProjectsChallengeSubmissionImplementationField({
  control,
}: Props) {
  const intl = useIntl();
  const attrs = getProjectsChallengeSubmissionImplementationAttributes(intl);
  const { field, formState } = useController({
    control,
    name: fieldName,
    rules: { required: true },
  });

  return (
    <RichTextEditor
      description={attrs.description}
      descriptionStyle="tooltip"
      errorMessage={
        formState.dirtyFields[fieldName] || formState.submitCount > 0
          ? formState.errors[fieldName]?.message
          : undefined
      }
      label={attrs.label}
      required={attrs.validation.required}
      {...field}
      minHeight="300px"
      value={field.value || attrs.initialValue}
      onChange={(newValue) => {
        field.onChange({
          target: {
            value: newValue,
          },
        });
      }}
    />
  );
}
