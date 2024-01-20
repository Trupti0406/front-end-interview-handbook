import clsx from 'clsx';
import type {
  ChangeEvent,
  FocusEvent,
  ForwardedRef,
  TextareaHTMLAttributes,
} from 'react';
import React, { forwardRef, useEffect, useId, useState } from 'react';

import type { LabelDescriptionStyle } from '../Label';
import Label from '../Label';
import Text from '../Text/Text';

type Attributes = Pick<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  | 'autoComplete'
  | 'autoFocus'
  | 'disabled'
  | 'id'
  | 'maxLength'
  | 'minLength'
  | 'name'
  | 'onBlur'
  | 'onFocus'
  | 'placeholder'
  | 'readOnly'
  | 'required'
  | 'rows'
>;

export type TextAreaSize = 'md' | 'sm' | 'xs';
export type TextAreaResize = 'both' | 'horizontal' | 'none' | 'vertical';

type Props = Readonly<{
  className?: string;
  classNameOuter?: string;
  defaultValue?: string;
  description?: React.ReactNode;
  descriptionStyle?: LabelDescriptionStyle;
  errorMessage?: React.ReactNode;
  isLabelHidden?: boolean;
  label: string;
  onBlur?: (event: FocusEvent<HTMLTextAreaElement>) => void;
  onChange?: (value: string, event: ChangeEvent<HTMLTextAreaElement>) => void;
  resize?: TextAreaResize;
  size?: TextAreaSize;
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

const resizeClasses: Record<TextAreaResize, string> = {
  both: 'resize',
  horizontal: 'resize-x',
  none: 'resize-none',
  vertical: 'resize-y',
};

const fontSizeClasses: Record<TextAreaSize, string> = {
  md: 'text-sm',
  sm: 'text-sm',
  xs: 'text-xs',
};

const verticalPaddingSizeClasses: Record<TextAreaSize, string> = {
  md: 'py-2',
  sm: 'py-1.5',
  xs: 'py-1',
};

const horizontalPaddingSizeClasses: Record<TextAreaSize, string> = {
  md: 'px-3',
  sm: 'px-3',
  xs: 'px-3',
};

function TextArea(
  {
    defaultValue,
    className,
    classNameOuter,
    description,
    descriptionStyle,
    disabled,
    errorMessage,
    id: idParam,
    isLabelHidden,
    label,
    maxLength,
    resize = 'vertical',
    required,
    size = 'md',
    value,
    onChange,
    ...props
  }: Props,
  ref: ForwardedRef<HTMLTextAreaElement>,
) {
  const hasError = !!errorMessage;
  const generatedId = useId();
  const [valueLength, setValueLength] = useState(
    (value ?? defaultValue ?? '').length,
  );
  const id = idParam ?? generatedId;
  const messageId = useId();
  const state: State = hasError ? 'error' : 'normal';

  const hasBottomSection = hasError || maxLength != null;

  useEffect(() => {
    setValueLength((value ?? defaultValue ?? '').length);
  }, [value, defaultValue]);

  return (
    <div className={classNameOuter}>
      <div className={clsx(!isLabelHidden && 'mb-2')}>
        <Label
          description={description}
          descriptionId={messageId}
          descriptionStyle={descriptionStyle}
          htmlFor={id}
          isLabelHidden={isLabelHidden}
          label={label}
          required={required}
        />
      </div>
      <textarea
        ref={ref}
        aria-describedby={
          hasError || description != null ? messageId : undefined
        }
        aria-invalid={hasError ? true : undefined}
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
          fontSizeClasses[size],
          verticalPaddingSizeClasses[size],
          horizontalPaddingSizeClasses[size],
          stateClasses[state],
          resizeClasses[resize],
        )}
        defaultValue={defaultValue}
        disabled={disabled}
        id={id}
        required={required}
        value={value != null ? value : undefined}
        onChange={(event) => {
          // Component has to track the value if it's an uncontrolled component.
          if (value === undefined) {
            setValueLength(event.target.value.trim().length);
          }
          onChange?.(event.target.value, event);
        }}
        {...props}
      />
      {hasBottomSection && (
        <div
          className={clsx(
            'flex w-full mt-2',
            errorMessage ? 'justify-between' : 'justify-end',
          )}>
          {errorMessage && (
            <Text color="error" display="block" id={messageId} size="body3">
              {errorMessage}
            </Text>
          )}
          {maxLength && (
            <Text color="subtle" size="body3">
              {valueLength}/{maxLength}
            </Text>
          )}
        </div>
      )}
    </div>
  );
}

export default forwardRef(TextArea);
