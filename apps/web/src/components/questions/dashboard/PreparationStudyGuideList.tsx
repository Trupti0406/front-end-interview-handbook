import clsx from 'clsx';
import { RiArrowRightLine, RiArrowRightSLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Card from '~/components/ui/Card';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import { themeLineBackgroundColor } from '~/components/ui/theme';

type GuideItemProps = Readonly<{
  href: string;
  rank: number;
  title: string;
}>;

function GuideItem({ href, title, rank }: GuideItemProps) {
  return (
    <Card
      border={false}
      className={clsx(
        'group flex justify-between py-3 px-4',
        'border border-neutral-200 dark:border-transparent',
      )}
      disableSpotlight={true}
      padding={false}
      pattern={false}>
      <div className="flex items-center gap-3">
        <div
          aria-hidden="true"
          className={clsx(
            'flex h-5 w-5 items-center justify-center rounded-full font-bold text-neutral-500 dark:text-neutral-400',
            themeLineBackgroundColor,
          )}
          color="inherit">
          {rank}
        </div>
        <Anchor href={href} variant="unstyled">
          <span aria-hidden={true} className="absolute inset-0" />
          <Text color="subtitle" size="body2" weight="medium">
            {title}
          </Text>
        </Anchor>
      </div>
      <RiArrowRightSLine
        className={clsx('h-5 w-5 text-neutral-500 dark:text-neutral-400')}
      />
    </Card>
  );
}

type Props = Readonly<{
  href: string;
  items: ReadonlyArray<{
    description?: string;
    href: string;
    slug: string;
    title: string;
  }>;
}>;

export default function PreparationStudyGuideList({
  href: seeAllHref,
  items,
}: Props) {
  const intl = useIntl();

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex items-center justify-between">
        <Heading level="heading6">
          <FormattedMessage
            defaultMessage="Study guides"
            description="Study guides list section title in preparation dashboard"
            id="qR472c"
          />
        </Heading>
        <Button
          className="-mr-4"
          href={seeAllHref}
          icon={RiArrowRightLine}
          label={intl.formatMessage({
            defaultMessage: 'See all',
            description:
              'See all button label in study guides list section in preparation dashboard',
            id: 'mLRZ25',
          })}
          size="md"
          variant="tertiary"
        />
      </div>
      <div className="flex w-full flex-col gap-2">
        {items.map(({ href, slug, title }, index) => (
          <GuideItem key={slug} href={href} rank={index + 1} title={title} />
        ))}
      </div>
    </div>
  );
}
