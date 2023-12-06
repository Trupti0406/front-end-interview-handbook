import clsx from 'clsx';
import type { ChangeEvent, ForwardedRef, InputHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import React, { useId } from 'react';
import { RiInformationLine } from 'react-icons/ri';

import Text from '../Text/Text';
import { themeTextSecondaryColor } from '../theme';
import Tooltip from '../Tooltip';

export type TextInputSize = 'md' | 'sm' | 'xs';

type Attributes = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  | 'autoComplete'
  | 'autoFocus'
  | 'id'
  | 'name'
  | 'onBlur'
  | 'onFocus'
  | 'placeholder'
  | 'required'
>;

type Props = Readonly<{
  className?: string;
  classNameOuter?: string;
  defaultValue?: string;
  description?: React.ReactNode;
  endIcon?: React.ComponentType<React.ComponentProps<'svg'>>;
  errorMessage?: React.ReactNode;
  id?: string;
  isDescriptionCollapsed?: boolean;
  isDisabled?: boolean;
  isLabelHidden?: boolean;
  label: string;
  onChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
  size?: TextInputSize;
  startIcon?: React.ComponentType<React.ComponentProps<'svg'>>;
  type?: 'email' | 'password' | 'search' | 'text';
  value?: string;
}> &
  Readonly<Attributes>;

type State = 'error' | 'normal';

const stateClasses: Record<State, string> = {
  error: clsx(
    'text-neutral-700 dark:text-neutral-300',
    'ring-danger',
    'placeholder:text-neutral-400 dark:placeholder:text-neutral-600',
    'focus:ring-danger',
  ),
  normal: clsx(
    'text-neutral-700 dark:text-neutral-300',
    'ring-neutral-300 dark:ring-neutral-700',
    'placeholder:text-neutral-400 dark:placeholder:text-neutral-600',
    'focus:ring-brand-dark dark:focus:ring-brand',
  ),
};

const fontSizeClasses: Record<TextInputSize, string> = {
  md: 'text-sm',
  sm: 'text-xs',
  xs: 'text-xs',
};

const iconSizeClasses: Record<TextInputSize, string> = {
  md: 'h-4 w-4',
  sm: 'h-4 w-4',
  xs: 'h-4 w-4',
};

const verticalPaddingSizeClasses: Record<TextInputSize, string> = {
  md: 'py-2',
  sm: 'py-1.5',
  xs: 'py-1',
};

const horizontalPaddingSizeClasses: Record<TextInputSize, string> = {
  md: 'px-3',
  sm: 'px-3',
  xs: 'px-3',
};

const heightClasses: Record<TextInputSize, string> = {
  md: 'h-9',
  sm: 'h-8',
  xs: 'h-7',
};

function TextInput(
  {
    autoComplete,
    autoFocus,
    className,
    classNameOuter,
    defaultValue,
    description,
    endIcon: EndIcon,
    errorMessage,
    id: idParam,
    isDisabled,
    isLabelHidden = false,
    isDescriptionCollapsed = false,
    label,
    name,
    placeholder,
    required,
    size = 'md',
    startIcon: StartIcon,
    type = 'text',
    value,
    onChange,
  }: Props,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const hasError = !!errorMessage;
  const generatedId = useId();
  const id = idParam ?? generatedId;
  const messageId = useId();
  const state = hasError ? 'error' : 'normal';
  const fontSizeClass = fontSizeClasses[size];
  const iconSizeClass = iconSizeClasses[size];
  const iconColorClass = 'text-neutral-400 dark:text-neutral-600';

  return (
    <div className={classNameOuter}>
      <label
        className={clsx(
          isLabelHidden ? 'sr-only' : 'mb-2 flex items-center gap-1',
        )}
        htmlFor={id}>
        <Text size="body2" weight="medium">
          {label}
        </Text>
        {required && (
          <span aria-hidden="true" className="text-danger">
            *
          </span>
        )}
        {isDescriptionCollapsed && description && (
          <Tooltip label={description}>
            <RiInformationLine
              className={clsx(iconSizeClasses, themeTextSecondaryColor)}
            />
          </Tooltip>
        )}
      </label>
      {!hasError && description && !isDescriptionCollapsed && (
        <Text
          className="my-2"
          color="secondary"
          display="block"
          id={messageId}
          size="body3">
          {description}
        </Text>
      )}
      <div className="relative">
        {StartIcon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <StartIcon
              aria-hidden="true"
              className={clsx(iconSizeClass, iconColorClass)}
            />
          </div>
        )}
        <input
          ref={ref}
          aria-describedby={
            hasError || description != null ? messageId : undefined
          }
          aria-invalid={hasError ? true : undefined}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          className={clsx(
            'block w-full',
            'bg-transparent',
            [
              'disabled:bg-neutral-200 disabled:text-neutral-300',
              'dark:disabled:bg-neutral-800 dark:disabled:text-neutral-700',
              'disabled:cursor-not-allowed',
            ],
            'rounded',
            'border-0',
            'focus:outline-none focus:outline-transparent',
            'ring-1 ring-inset',
            'focus:ring-2 focus:ring-inset',
            fontSizeClass,
            verticalPaddingSizeClasses[size],
            horizontalPaddingSizeClasses[size],
            StartIcon && 'pl-9',
            EndIcon && 'pr-9',
            heightClasses[size],
            stateClasses[state],
            className,
          )}
          defaultValue={defaultValue}
          disabled={isDisabled}
          id={id}
          name={name}
          placeholder={placeholder}
          type={type}
          value={value != null ? value : undefined}
          onChange={(event) => {
            if (!onChange) {
              return;
            }

            onChange(event.target.value, event);
          }}
        />
        {EndIcon && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <EndIcon
              aria-hidden="true"
              className={clsx(iconSizeClass, iconColorClass)}
            />
          </div>
        )}
      </div>
      {errorMessage && (
        <Text
          className="mt-2"
          color="error"
          display="block"
          id={messageId}
          size="body3">
          {errorMessage}
        </Text>
      )}
    </div>
  );
}

export default forwardRef(TextInput);
