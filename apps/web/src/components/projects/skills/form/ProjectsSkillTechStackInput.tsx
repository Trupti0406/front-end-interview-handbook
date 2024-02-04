import { useIntl } from 'react-intl';

import Typeahead from '~/components/ui/Typeahead';

import {
  ProjectsSkillArrayToTypeaheadValues,
  projectsSkillTypeaheadOptions,
  ProjectsSkillTypeaheadValuesToArray,
} from '../data/ProjectsSkillListData';
import type { ProjectsSkillKey } from '../types';

type Props = Readonly<{
  description?: React.ReactNode;
  errorMessage?: React.ReactNode;
  excludeRoadmapSkills?: boolean;
  label?: string;
  onChange: (value: ReadonlyArray<ProjectsSkillKey> | null) => void;
  placeholder?: string;
  required?: boolean;
  value: ReadonlyArray<ProjectsSkillKey>;
}>;

export default function ProjectsSkillTechStackInput({
  description,
  errorMessage,
  excludeRoadmapSkills,
  label,
  placeholder,
  required,
  value,
  onChange,
}: Props) {
  const options = projectsSkillTypeaheadOptions(excludeRoadmapSkills);
  const intl = useIntl();

  return (
    <Typeahead
      description={
        description ??
        intl.formatMessage({
          defaultMessage:
            "Other skills you are using which are not within the skills roadmap. Also helps community members understand more about the tech stack. If you don't see the tag you need, email us.",
          description: 'Description for "Other tech stack used" text input',
          id: 'CfSKv4',
        })
      }
      descriptionStyle="tooltip"
      errorMessage={errorMessage}
      label={
        label ??
        intl.formatMessage({
          defaultMessage:
            'Other tech stack used (not covered in skills roadmap)',
          description: 'Label for "Other tech stack used" text input',
          id: 'DPUrhz',
        })
      }
      options={options}
      placeholder={
        placeholder ??
        intl.formatMessage({
          defaultMessage: 'Tech stack',
          description: 'Placeholder for "Other tech stack used" text input',
          id: 'jvi6yy',
        })
      }
      required={required}
      value={ProjectsSkillArrayToTypeaheadValues(value)}
      onChange={(newValue) =>
        onChange(ProjectsSkillTypeaheadValuesToArray(newValue))
      }
    />
  );
}
