import clsx from 'clsx';
import { RiInformationLine } from 'react-icons/ri';

import CheckboxInput from '~/components/ui/CheckboxInput';
import { themeTextSubtleColor } from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

import type { QuestionFilter } from './QuestionFilterType';
import type { QuestionMetadata } from '../../common/QuestionsTypes';

export type QuestionFilterItemGap = 'compact' | 'spacious';

const itemGapClasses: Record<QuestionFilterItemGap, string> = {
  compact: 'gap-x-4 gap-y-3',
  spacious: 'gap-6',
};

export default function QuestionListingFilterItemCheckboxes<
  T extends string,
  Q extends QuestionMetadata,
>({
  itemGap,
  section,
  values,
}: Readonly<{
  itemGap: QuestionFilterItemGap;
  section: QuestionFilter<T, Q>;
  values: Set<T>;
}>) {
  return (
    <div className={clsx('flex flex-wrap', itemGapClasses[itemGap])}>
      {section.options.map((option) => (
        <div key={option.value} className="flex items-center gap-2">
          <CheckboxInput
            label={option.label}
            value={values.has(option.value)}
            onChange={() => section.onChange(option.value)}
          />
          {option.tooltip && (
            <Tooltip label={option.tooltip}>
              <RiInformationLine
                className={clsx('size-4 shrink-0', themeTextSubtleColor)}
              />
            </Tooltip>
          )}
        </div>
      ))}
    </div>
  );
}
