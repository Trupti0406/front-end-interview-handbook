import { $getRoot } from 'lexical';
import type { IntlShape } from 'react-intl';
import { useIntl } from 'react-intl';
import { z } from 'zod';

import { RichTextEditorConfig } from '~/components/ui/RichTextEditor/RichTextEditorConfig';

import { createHeadlessEditor } from '@lexical/headless';

const MIN_LENGTH = 50;
const MAX_LENGTH = 1000;

const editor = createHeadlessEditor(RichTextEditorConfig);

function projectsChallengeSubmissionImplementationSchema(options?: {
  maxMessage: string;
  minMessage: string;
}) {
  const { minMessage, maxMessage } = options ?? {};

  return z
    .string()
    .trim()
    .refine(
      (value) => {
        try {
          const editorState = editor.parseEditorState(value);
          const text = editorState.read(() => $getRoot().getTextContent());

          return text.length >= MIN_LENGTH;
        } catch {
          return false;
        }
      },
      {
        message: minMessage,
      },
    )
    .refine(
      (value) => {
        try {
          const editorState = editor.parseEditorState(value);
          const text = editorState.read(() => $getRoot().getTextContent());

          return text.length <= MAX_LENGTH;
        } catch {
          return false;
        }
      },
      {
        message: maxMessage,
      },
    );
}

// TODO: Figure out how to reuse intl strings for the server.
export const projectsChallengeSubmissionImplementationSchemaServer =
  projectsChallengeSubmissionImplementationSchema({
    maxMessage: `Implementation must contain at most ${MAX_LENGTH} character(s).`,
    minMessage: `Implementation must contain at least ${MIN_LENGTH} character(s).`,
  });

export function getProjectsChallengeSubmissionImplementationAttributes(
  intl: IntlShape,
) {
  const label = intl.formatMessage({
    defaultMessage: 'Implementation details',
    description: 'Challenge submission form label',
    id: 'AaYDa2',
  });
  const description = intl.formatMessage({
    defaultMessage:
      'Describe your project approach and take the opportunity to document challenges and how they were overcome. To help others in the community, also describe your general tech stack and how they were used together, as well as any guides or resources you used.',
    description: 'Project submission tooltip',
    id: 'EO+aoa',
  });
  const maxMessage = intl.formatMessage(
    {
      defaultMessage:
        'Implementation must contain at most {maxLength} character(s).',
      description: 'Error message',
      id: 'yv1wII',
    },
    {
      maxLength: MAX_LENGTH,
    },
  );
  const minMessage = intl.formatMessage(
    {
      defaultMessage:
        'Implementation must contain at least {minLength} character(s).',
      description: 'Error message',
      id: '7ZjmR2',
    },
    {
      minLength: MIN_LENGTH,
    },
  );

  return {
    description,
    label,
    validation: {
      maxLength: MAX_LENGTH,
      maxMessage,
      minLength: MIN_LENGTH,
      minMessage,
      required: true,
    },
  };
}

export function useProjectsChallengeSubmissionImplementationSchema() {
  const intl = useIntl();
  const intlStrings =
    getProjectsChallengeSubmissionImplementationAttributes(intl);

  return projectsChallengeSubmissionImplementationSchema({
    maxMessage: intlStrings.validation.maxMessage,
    minMessage: intlStrings.validation.minMessage,
  });
}
