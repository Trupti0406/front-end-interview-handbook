import clsx from 'clsx';
import * as React from 'react';
import { forwardRef } from 'react';
import {
  RiCheckboxCircleFill,
  RiCloseCircleFill,
  RiCloseLine,
  RiErrorWarningFill,
  RiInformationFill,
  RiStarFill,
} from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';

import type { TextColor } from '../Text';
import Text from '../Text';
import { themeTextInvertColor } from '../theme';

import * as ToastPrimitives from '@radix-ui/react-toast';

export type ToastVariant =
  | 'danger'
  | 'dark'
  | 'info'
  | 'invert'
  | 'plain'
  | 'special'
  | 'success'
  | 'warning';

const classes: Record<
  ToastVariant,
  Readonly<{
    backgroundClass: string;
    borderClass?: string;
    icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
    iconClass: string;
    textColor: TextColor;
  }>
> = {
  danger: {
    backgroundClass: 'bg-danger',
    icon: RiCloseCircleFill,
    iconClass: 'text-white focus:ring-white-500',
    textColor: 'light',
  },
  dark: {
    backgroundClass: 'bg-neutral-900',
    borderClass: 'border-neutral-700',
    iconClass: 'text-white focus:ring-white-500',
    textColor: 'light',
  },
  info: {
    backgroundClass: 'bg-info',
    icon: RiInformationFill,
    iconClass: 'text-white focus:ring-white-500',
    textColor: 'light',
  },
  invert: {
    backgroundClass: 'bg-neutral-100 dark:bg-neutral-900',
    borderClass: 'border-neutral-200 dark:border-neutral-700',
    iconClass: 'focus:ring-white-500',
    textColor: 'default',
  },
  plain: {
    backgroundClass: 'bg-neutral-900 dark:bg-neutral-100',
    iconClass: clsx(themeTextInvertColor, 'focus:ring-neutral-500'),
    textColor: 'invert',
  },
  special: {
    backgroundClass: 'bg-brand-dark',
    icon: RiStarFill,
    iconClass: 'text-white focus:ring-white-500',
    textColor: 'light',
  },
  success: {
    backgroundClass: 'bg-success',
    icon: RiCheckboxCircleFill,
    iconClass: 'text-white focus:ring-white-500',
    textColor: 'light',
  },
  warning: {
    backgroundClass: 'bg-warning',
    icon: RiErrorWarningFill,
    iconClass: 'text-white focus:ring-white-500',
    textColor: 'light',
  },
};

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={clsx(
      'fixed top-0 sm:bottom-0 sm:left-0 sm:top-auto',
      'z-toast',
      'flex max-h-screen w-full flex-col-reverse gap-4 sm:flex-col',
      'md:max-w-[420px]',
      'px-4 py-6 sm:p-6',
      className,
    )}
    {...props}
  />
));

ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

export const ToastRootImpl = forwardRef<
  React.ElementRef<'div'>,
  React.ComponentPropsWithoutRef<'div'> &
    Readonly<{
      maxWidth?: 'md' | 'sm';
    }>
>(({ className, maxWidth, ...props }, ref) => (
  <div
    ref={ref}
    className={clsx(
      'group pointer-events-auto relative',
      'flex items-center justify-between gap-x-4',
      'overflow-hidden rounded shadow-lg',
      'w-full',
      'transition-all',
      'data-[swipe=cancel]:translate-x-0',
      'data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)]',
      'data-[swipe=end]:animate-out',
      'data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]',
      'data-[swipe=move]:transition-none',
      'data-[state=open]:animate-in',
      'data-[state=open]:slide-in-from-top-full',
      'data-[state=open]:sm:slide-in-from-bottom-full',
      'data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-80',
      'data-[state=closed]:slide-out-to-right-full',
      maxWidth === 'sm' && 'max-w-sm',
      maxWidth === 'md' && 'max-w-md',
      className,
    )}
    {...props}
  />
));

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={clsx(
      'inline-flex items-center justify-center',
      'rounded-full hover:opacity-75',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      className,
    )}
    toast-close=""
    {...props}>
    <span className="sr-only">
      <FormattedMessage
        defaultMessage="Close"
        description="Close button label"
        id="PyDwDF"
      />
    </span>
    <RiCloseLine aria-hidden="true" className="size-5 shrink-0" />
  </ToastPrimitives.Close>
));

ToastClose.displayName = ToastPrimitives.Close.displayName;

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, children, ...props }, ref) => {
  return (
    <ToastPrimitives.Title ref={ref} asChild={true} {...props}>
      <Text
        className={clsx('grow', className)}
        color="inherit"
        display="block"
        size="body2"
        weight="medium">
        {children}
      </Text>
    </ToastPrimitives.Title>
  );
});

ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description> &
    Readonly<{ textColor: TextColor }>
>(({ className, children, textColor, ...props }, ref) => (
  <ToastPrimitives.Description ref={ref} asChild={true} {...props}>
    <Text className={className} color={textColor} display="block" size="body3">
      {children}
    </Text>
  </ToastPrimitives.Description>
));

ToastDescription.displayName = ToastPrimitives.Description.displayName;

export function ToastImpl({
  className,
  title,
  variant,
  description,
  icon: IconProp,
  onClose,
  ...props
}: Props) {
  const {
    icon: VariantIcon,
    borderClass,
    backgroundClass,
    iconClass,
    textColor,
  } = classes[variant];

  const Icon = IconProp ?? VariantIcon;

  return (
    <ToastRootImpl
      className={clsx(
        className,
        backgroundClass,
        borderClass && ['border', borderClass],
      )}
      {...props}>
      <Text
        className="w-full items-start gap-x-2 px-3 py-2"
        color={textColor}
        display="flex">
        {Icon && <Icon className={clsx('size-5 shrink-0', iconClass)} />}
        <div className="flex w-full grow flex-col gap-y-1">
          <div className="flex justify-between gap-2">
            {title && <ToastTitle>{title}</ToastTitle>}
            <ToastClose className={iconClass} onClick={onClose} />
          </div>
          {description && (
            <ToastDescription textColor={textColor}>
              {description}
            </ToastDescription>
          )}
        </div>
      </Text>
    </ToastRootImpl>
  );
}

type Props = Readonly<{
  className?: string;
  description?: React.ReactNode;
  icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
  maxWidth?: 'md' | 'sm';
  onClose?: () => void;
  title: React.ReactNode;
  variant: ToastVariant;
}>;

export type ToastProps = Omit<
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root>,
  'children' | 'title'
> &
  Props;

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  ToastProps
>(({ maxWidth, description, icon, title, variant, onClose, ...props }, ref) => (
  <ToastPrimitives.Root ref={ref} asChild={true} {...props}>
    <ToastImpl
      description={description}
      icon={icon}
      maxWidth={maxWidth}
      title={title}
      variant={variant}
      onClose={onClose}
    />
  </ToastPrimitives.Root>
));

export default Toast;

export {
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
};