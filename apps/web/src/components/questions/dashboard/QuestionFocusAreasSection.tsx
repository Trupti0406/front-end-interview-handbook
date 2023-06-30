import clsx from 'clsx';
import { useState } from 'react';
import {
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiQuestionFill,
} from 'react-icons/ri';
import { useIntl } from 'react-intl';

import type { FocusArea } from '~/data/focus-areas/FocusAreas';
import { getFocusAreaTheme } from '~/data/focus-areas/FocusAreas';

import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Card from '~/components/ui/Card';
import CardContainer from '~/components/ui/Card/CardContainer';
import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import {
  themeLineBackgroundColor,
  themeTextFainterColor,
  themeTextSecondaryColor,
} from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

import { countNumberOfQuestionsInList } from '~/db/QuestionsUtils';

import QuestionCountLabel from '../metadata/QuestionCountLabel';

type Props = Readonly<{
  description: string;
  focusAreas: ReadonlyArray<FocusArea>;
  title: string;
}>;

const MAX_SHOWN = 4;

export default function QuestionFocusAreasSection({
  description: sectionDescription,
  title: sectionTitle,
  focusAreas: allFocusAreas,
}: Props) {
  const intl = useIntl();
  const [showAll, setShowAll] = useState(false);
  const focusAreas = showAll
    ? allFocusAreas
    : allFocusAreas.slice(0, MAX_SHOWN);

  return (
    <div className="@container flex flex-col gap-4">
      <div className="flex justify-between gap-4">
        <div className="flex items-center gap-4">
          <Heading level="heading6">{sectionTitle}</Heading>
          <Tooltip label={sectionDescription}>
            <RiQuestionFill className="h-6 w-6 text-neutral-300" />
          </Tooltip>
        </div>
        {allFocusAreas.length > MAX_SHOWN && (
          <Button
            className="-mr-5 -mt-2 translate-y-2"
            icon={showAll ? RiArrowUpSLine : RiArrowDownSLine}
            label={
              showAll
                ? intl.formatMessage({
                    defaultMessage: 'Show less',
                    description:
                      'Show less button label of focus areas section in preparation dashboard',
                    id: 'ipPZZl',
                  })
                : intl.formatMessage({
                    defaultMessage: 'Show all',
                    description:
                      'Show all button label of focus areas section in preparation dashboard',
                    id: 'ahcJju',
                  })
            }
            size="md"
            variant="tertiary"
            onClick={() => {
              setShowAll(!showAll);
            }}
          />
        )}
      </div>
      <CardContainer className="@4xl:grid-cols-4 grid grid-cols-2 grid-rows-1 gap-6">
        {focusAreas.map(
          ({ href, name, type, shortDescription, questions }, index) => {
            const Icon = getFocusAreaTheme(type).iconSolid;

            return (
              <Anchor key={type} href={href} variant="unstyled">
                <Card
                  className={clsx(
                    'group/card relative isolate flex flex-col items-start gap-3 p-4',
                    !showAll && index >= MAX_SHOWN && '@md:hidden',
                  )}
                  padding={false}>
                  <div className="flex justify-between self-stretch">
                    <span
                      className={clsx(
                        'inline-flex h-10 w-10 items-center justify-center rounded-md',
                        themeLineBackgroundColor,
                        themeTextSecondaryColor,
                        'border border-transparent transition',
                        'group-hover/card:border-brand-dark group-hover/card:text-brand-dark',
                        'dark:group-hover/card:border-brand dark:group-hover/card:text-brand',
                      )}>
                      <Icon aria-hidden={true} className="h-6 w-6" />
                    </span>
                    <Tooltip
                      alignment={
                        index % MAX_SHOWN === MAX_SHOWN - 1 ? 'end' : undefined
                      }
                      label={
                        <div className="flex flex-col gap-y-1.5">
                          {shortDescription}
                          <hr className="border-neutral-700 dark:border-neutral-300" />
                          <QuestionCountLabel
                            color="inherit"
                            count={countNumberOfQuestionsInList(questions)}
                            showIcon={true}
                          />
                        </div>
                      }>
                      <RiQuestionFill
                        className={clsx('z-10 h-6 w-6', themeTextFainterColor)}
                      />
                    </Tooltip>
                  </div>
                  <Text
                    className="w-full truncate"
                    color="label"
                    display="block"
                    weight="medium">
                    {name}
                  </Text>
                </Card>
              </Anchor>
            );
          },
        )}
      </CardContainer>
    </div>
  );
}
