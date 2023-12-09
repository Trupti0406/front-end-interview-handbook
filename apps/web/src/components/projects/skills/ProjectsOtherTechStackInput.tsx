import { useState } from 'react';
import { RiAddLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import Anchor from '~/components/ui/Anchor';
import TextInput from '~/components/ui/TextInput';

import ProjectsSkillChip from './ProjectsSkillChip';

type Props = Readonly<{
  onChange: (value: Array<string>) => void;
  value: Array<string>;
}>;

export default function ProjectsOtherTechStackInput({
  value,
  onChange,
}: Props) {
  const intl = useIntl();

  const [inputValue, setInputValue] = useState('');

  return (
    <div className="flex flex-col">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onChange([...value, inputValue]);
          setInputValue('');
        }}>
        <TextInput
          autoComplete="off"
          classNameOuter="mt-6"
          description={
            <FormattedMessage
              defaultMessage="Other skills you are using which are not within the skills tree. Also helps community members understand more about the tech stack.{br}{br}If you don't see the tag you need, email us at <email>{supportEmail}</email>"
              description='Description for "Other tech stack used" text input'
              id="xU7H/Y"
              values={{
                br: <br />,
                email: (chunks) => (
                  <Anchor href={`mailto:${chunks as unknown as string}`}>
                    {chunks}
                  </Anchor>
                ),
                supportEmail: 'support@greatfrontend.com',
              }}
            />
          }
          descriptionStyle="tooltip"
          endIcon={RiAddLine}
          label={intl.formatMessage({
            defaultMessage:
              'Other tech stack used (not covered in skills tree)',
            description: 'Label for "Other tech stack used" text input',
            id: 'qCCbPu',
          })}
          placeholder={intl.formatMessage({
            defaultMessage: 'Tech stack',
            description: 'Placeholder for "Other tech stack used" text input',
            id: 'jvi6yy',
          })}
          value={inputValue}
          onChange={setInputValue}
        />
      </form>
      <div className="mt-4 flex gap-3">
        {value.map((techStack) => (
          <ProjectsSkillChip
            key={techStack}
            isEditable={true}
            skill={{
              key: techStack,
              label: techStack,
            }}
            onDelete={() => {
              onChange(value.filter((skill) => skill !== techStack));
            }}
          />
        ))}
      </div>
    </div>
  );
}
