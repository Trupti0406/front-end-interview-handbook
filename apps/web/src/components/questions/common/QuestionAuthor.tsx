import { useId } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import authors from '~/data/authors';

import type { TextVariant } from '~/components/ui/Text';
import Text from '~/components/ui/Text';
import Tooltip from '~/components/ui/Tooltip';

type Props = Readonly<{
  author: string;
  variant?: TextVariant;
}>;

export default function QuestionAuthor({ author, variant = 'body3' }: Props) {
  const intl = useIntl();
  const id = useId();
  const authorData = authors[author];

  if (authorData == null) {
    return null;
  }

  return (
    <div className="group block flex-shrink-0">
      <span className="sr-only" id={id}>
        <FormattedMessage
          defaultMessage="Author"
          description="Author of the question"
          id="n0mDHU"
        />
      </span>
      <div aria-labelledby={id} className="flex items-center">
        <div>
          <Tooltip
            label={intl.formatMessage({
              defaultMessage: 'Author',
              description: 'Author of the question',
              id: 'n0mDHU',
            })}
            position="above">
            <img
              alt={authorData.name}
              className="inline-block h-8 w-8 rounded-full"
              src={authorData.imageUrl}
            />
          </Tooltip>
        </div>
        <div className="ml-3 flex flex-col gap-y-0.5">
          <Text
            color="secondary"
            display="block"
            variant={variant}
            weight="bold">
            {authorData.name}
          </Text>
          <Text color="secondary" display="block" variant="body3">
            {authorData.subtitle}
          </Text>
        </div>
      </div>
    </div>
  );
}
