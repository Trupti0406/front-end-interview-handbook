import type { IntlShape } from 'react-intl';
import { useIntl } from 'react-intl';
import { z } from 'zod';

const MIN_LENGTH = 2;
const MAX_LENGTH = 50;

function projectsChallengeSubmissionDeploymentUrlItemSchema(options?: {
  maxMessage: string;
  minMessage: string;
  urlMessage: string;
}) {
  const { urlMessage, maxMessage, minMessage } = options ?? {};

  return z.object({
    href: z.string().url({ message: urlMessage }),
    label: z
      .string()
      .min(MIN_LENGTH, { message: minMessage })
      .max(MAX_LENGTH, { message: maxMessage })
      .trim(),
  });
}

function projectsChallengeSubmissionDeploymentUrlsSchema(options?: {
  maxMessage: string;
  minItemMessage: string;
  minMessage: string;
  urlMessage: string;
}) {
  const { urlMessage, maxMessage, minMessage, minItemMessage } = options ?? {};

  return z
    .array(
      projectsChallengeSubmissionDeploymentUrlItemSchema(options).extend({
        href: z.string().url({ message: urlMessage }),
        label: z
          .string()
          .min(MIN_LENGTH, { message: minMessage })
          .max(MAX_LENGTH, { message: maxMessage })
          .trim(),
        screenshots: z.record(z.string().min(1), z.string().min(1)).optional(),
      }),
    )
    .min(1, {
      message: minItemMessage,
    });
}

// TODO: Figure out how to reuse intl strings for the server.
export const projectsChallengeSubmissionDeploymentUrlsSchemaServer =
  projectsChallengeSubmissionDeploymentUrlsSchema({
    maxMessage: `Page name must contain at most ${MAX_LENGTH} character(s).`,
    minItemMessage: `Provide at least 1 URL where you hosted your solution`,
    minMessage: `Page name must contain at least ${MIN_LENGTH} character(s).`,
    urlMessage: 'Invalid URL',
  });

export function getProjectsChallengeSubmissionDeploymentUrlsAttributes(
  intl: IntlShape,
) {
  const label = intl.formatMessage({
    defaultMessage: 'Live site URL',
    description: 'Form label',
    id: 'fAZVc9',
  });
  const description = intl.formatMessage({
    defaultMessage:
      "The URL where your solution is hosted. Find our recommended free hosting providers if you haven't already.",
    description: 'Form description',
    id: 'djQlZs',
  });
  const namePlaceholder = intl.formatMessage({
    defaultMessage: 'Homepage',
    description: 'Placeholder for name field of the deployment url',
    id: 'UX45fV',
  });
  const urlPlaceholder = 'https://www.solution.com';
  const urlMessage = intl.formatMessage({
    defaultMessage: 'URL must start with "https://"',
    description: 'Error message',
    id: 'ms/RqZ',
  });
  const maxMessage = intl.formatMessage(
    {
      defaultMessage:
        'Page name must contain at most {maxLength} character(s).',
      description: 'Error message',
      id: 'ouzs0n',
    },
    {
      maxLength: MAX_LENGTH,
    },
  );
  const minMessage = intl.formatMessage(
    {
      defaultMessage:
        'Page name must contain at least {minLength} character(s).',
      description: 'Error message',
      id: '3edoDu',
    },
    {
      minLength: MIN_LENGTH,
    },
  );
  const minItemMessage = intl.formatMessage({
    defaultMessage: 'Provide at least 1 URL where you hosted your solution',
    description: 'Error message',
    id: 'bZbZoz',
  });

  return {
    description,
    label,
    namePlaceholder,
    type: 'url',
    urlPlaceholder,
    validation: {
      maxLength: MAX_LENGTH,
      maxMessage,
      minItemMessage,
      minLength: MIN_LENGTH,
      minMessage,
      required: true,
      urlMessage,
    },
  } as const;
}

export function useProjectsChallengeSubmissionDeploymentUrlItemSchema() {
  const intl = useIntl();
  const intlStrings =
    getProjectsChallengeSubmissionDeploymentUrlsAttributes(intl);

  return projectsChallengeSubmissionDeploymentUrlItemSchema({
    maxMessage: intlStrings.validation.maxMessage,
    minMessage: intlStrings.validation.minMessage,
    urlMessage: intlStrings.validation.urlMessage,
  });
}

export function useProjectsChallengeSubmissionDeploymentUrlsSchema() {
  const intl = useIntl();
  const intlStrings =
    getProjectsChallengeSubmissionDeploymentUrlsAttributes(intl);

  return projectsChallengeSubmissionDeploymentUrlsSchema({
    maxMessage: intlStrings.validation.maxMessage,
    minItemMessage: intlStrings.validation.minItemMessage,
    minMessage: intlStrings.validation.minMessage,
    urlMessage: intlStrings.validation.urlMessage,
  });
}
