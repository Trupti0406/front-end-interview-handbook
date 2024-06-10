import { useId } from 'react';
import { RiLinkedinBoxFill } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import authors from '~/data/authors';

import Anchor from '~/components/ui/Anchor';
import Avatar from '~/components/ui/Avatar';
import type { TextSize } from '~/components/ui/Text';
import Text, { textVariants } from '~/components/ui/Text';
import Tooltip from '~/components/ui/Tooltip';

type Props = Readonly<{
  author: string;
  size?: TextSize;
}>;

export default function QuestionAuthor({ author, size = 'body3' }: Props) {
  const intl = useIntl();
  const id = useId();
  const authorData = authors[author];

  if (authorData == null) {
    return null;
  }

  const label = intl.formatMessage({
    defaultMessage: 'Author',
    description: 'Author of the question',
    id: 'n0mDHU',
  });

  return (
    <div className="group block shrink-0">
      <span className="sr-only" id={id}>
        {label}
      </span>
      <div aria-labelledby={id} className="flex items-center gap-x-3">
        <div className="inline-flex h-8">
          <Tooltip asChild={true} className="inline-flex" label={label}>
            <Anchor
              aria-label={authorData.name}
              href={authorData.links.linkedin || '#'}
              variant="unstyled">
              <Avatar alt={authorData.name} src={authorData.imageUrl} />
            </Anchor>
          </Tooltip>
        </div>
        <div className="flex flex-col gap-y-0.5">
          <div className="flex items-center gap-x-1">
            <Anchor
              className={textVariants({
                className: 'block whitespace-nowrap',
                color: 'subtitle',
                size,
                weight: 'bold',
              })}
              href={authorData.links.linkedin || '#'}
              variant="flat">
              {authorData.name}
            </Anchor>
            {authorData.links.linkedin && (
              <Anchor href={authorData.links.linkedin} variant="unstyled">
                <RiLinkedinBoxFill
                  aria-hidden={true}
                  className={textVariants({
                    className: 'size-4 shrink-0',
                    color: 'subtitle',
                    size,
                    weight: 'bold',
                  })}
                />
              </Anchor>
            )}
          </div>
          <Text
            className="block whitespace-nowrap"
            color="secondary"
            size="body3">
            {authorData.subtitle}
          </Text>
        </div>
      </div>
    </div>
  );
}
