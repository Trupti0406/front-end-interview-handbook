import clsx from 'clsx';
import type { ForwardedRef } from 'react';
import { forwardRef, useId } from 'react';

import {
  themeBackgroundElementColor,
  themeBackgroundElementEmphasizedStateColor_Hover,
  themeBackgroundElementPressedStateColor_Active,
  themeBorderElementColor,
  themeOutlineElement_FocusVisible,
  themeOutlineElementBrandColor_FocusVisible,
  themeTextSubtitleColor,
} from '~/components/ui/theme';

import type { TextSize } from '../Text';
import Text from '../Text';

export type SelectItem<T> = Readonly<{
  label: string;
  value: T;
}>;

export type SelectDisplay = 'block' | 'inline';
type SelectSize = 'md' | 'sm' | 'xs';

type Props<T> = Readonly<{
  display?: SelectDisplay;
  isLabelHidden?: boolean;
  label: string;
  name?: string;
  onChange: (value: T) => void;
  options: ReadonlyArray<SelectItem<T>>;
  size?: SelectSize;
  value: T;
}>;

const textSizeClasses: Record<
  SelectSize,
  Readonly<{ label: TextSize; option: string }>
> = {
  md: {
    label: 'body2',
    option: 'text-sm',
  },
  sm: {
    label: 'body3',
    option: 'text-xs',
  },
  xs: {
    label: 'body3',
    option: 'text-xs',
  },
};

const heightClasses: Record<SelectSize, string> = {
  md: 'h-9',
  sm: 'h-8',
  xs: 'h-7',
};

function Select<T>(
  {
    display,
    label,
    isLabelHidden,
    name,
    options,
    size = 'md',
    value,
    onChange,
  }: Props<T>,
  ref?: ForwardedRef<HTMLSelectElement>,
) {
  const id = useId();

  return (
    <div>
      <label
        className={clsx('mb-2 block', isLabelHidden && 'sr-only')}
        htmlFor={id}>
        <Text
          display="block"
          size={textSizeClasses[size].label}
          weight="medium">
          {label}
        </Text>
      </label>
      <select
        ref={ref}
        aria-label={isLabelHidden ? label : undefined}
        className={clsx(
          display === 'block' && 'block w-full',
          'flex items-center py-0',
          'rounded-full',
          'transition-colors',
          [
            'border',
            themeBorderElementColor,
            'focus-visible:border-neutral-300 dark:focus-visible:border-neutral-700',
          ],
          themeTextSubtitleColor,
          themeBackgroundElementColor,
          themeBackgroundElementEmphasizedStateColor_Hover,
          themeBackgroundElementPressedStateColor_Active,
          [
            themeOutlineElement_FocusVisible,
            themeOutlineElementBrandColor_FocusVisible,
          ],
          heightClasses[size],
          textSizeClasses[size].option,
        )}
        id={id}
        name={name ?? undefined}
        value={String(value)}
        onChange={(event) => {
          const selectedOption = options.find(
            ({ value: optionValue }) =>
              optionValue === String(event.target.value),
          );

          if (selectedOption != null) {
            onChange(selectedOption.value);
          }
        }}>
        {options.map(({ label: optionLabel, value: optionValue }) => (
          <option key={String(optionValue)} value={String(optionValue)}>
            {optionLabel}
          </option>
        ))}
      </select>
    </div>
  );
}

export default forwardRef(Select) as <T>(
  props: Props<T> & {
    ref?: ForwardedRef<HTMLSelectElement>;
  },
) => ReturnType<typeof Select>;
