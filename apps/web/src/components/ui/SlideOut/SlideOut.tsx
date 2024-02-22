import clsx from 'clsx';
import * as React from 'react';
import { RiCloseLine } from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';

import DialogBaseOverlay from '../Dialog/DialogBaseOverlay';
import Heading from '../Heading';
import Section from '../Heading/HeadingContext';
import Text from '../Text';
import { themeBackgroundLayerColor, themeBorderColor } from '../theme';

import * as SlideOutPrimitive from '@radix-ui/react-dialog';

type SlideOutSize = 'lg' | 'md' | 'sm' | 'xl' | 'xs';
type SlideOutEnterFrom = 'end' | 'start';

const sizeClasses: Record<SlideOutSize, string> = {
  lg: 'max-w-lg',
  md: 'max-w-md',
  sm: 'max-w-sm',
  xl: 'max-w-xl',
  xs: 'max-w-xs',
};

const enterFromClasses: Record<SlideOutEnterFrom, string> = {
  end: 'inset-y-0 right-0 h-full border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right',
  start:
    'inset-y-0 left-0 h-full border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left',
};

export const SlideOutRoot = SlideOutPrimitive.Root;

SlideOutRoot.displayName = 'SlideOutRoot';

export const SlideOutTrigger = SlideOutPrimitive.Trigger;

export const SlideOutClose = SlideOutPrimitive.Close;

export const SlideOutPortal = SlideOutPrimitive.Portal;

export const SlideOutOverlay = React.forwardRef<
  React.ElementRef<typeof SlideOutPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SlideOutPrimitive.Overlay>
>(({ ...props }, ref) => (
  <DialogBaseOverlay {...props} ref={ref} purpose="slideout" />
));

SlideOutOverlay.displayName = 'SlideOutOverlay';

type SlideOutContentProps = React.ComponentPropsWithoutRef<
  typeof SlideOutPrimitive.Content
> &
  Readonly<{
    children: React.ReactNode;
    className?: string;
    enterFrom?: SlideOutEnterFrom;
    isShown?: boolean;
    padding?: boolean;
    size: SlideOutSize;
  }>;

export const SlideOutContent = React.forwardRef<
  React.ElementRef<typeof SlideOutPrimitive.Content>,
  SlideOutContentProps
>(({ enterFrom = 'end', size, className, children, ...props }, ref) => (
  <SlideOutPortal>
    <SlideOutOverlay />
    <SlideOutPrimitive.Content
      ref={ref}
      className={clsx(
        ['h-full w-full', sizeClasses[size]],
        ['fixed', 'top-0'],
        'flex flex-col',
        'z-slideout',
        [themeBackgroundLayerColor, 'shadow-xl'],
        themeBorderColor,
        [
          'transition ease-in-out',
          'data-[state=open]:animate-in data-[state=open]:duration-500',
          'data-[state=closed]:animate-out data-[state=closed]:duration-300',
          enterFromClasses[enterFrom],
        ],
        className,
      )}
      {...props}>
      {children}
    </SlideOutPrimitive.Content>
  </SlideOutPortal>
));

SlideOutContent.displayName = SlideOutPrimitive.Content.displayName;

export function SlideOutHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        'flex flex-col justify-between gap-x-4 gap-y-2 px-6 py-6',
        className,
      )}
      {...props}>
      {children}
      <SlideOutPrimitive.Close
        className={clsx(
          'flex items-center justify-center',
          'absolute right-4 top-4 -mr-2',
          'size-10 rounded-full p-2',
          'text-neutral-400 hover:text-neutral-500',
          'disabled:pointer-events-none',
          'focus:ring-brand focus:outline-none focus:ring-2 focus:ring-inset',
        )}>
        <span className="sr-only">
          <FormattedMessage
            defaultMessage="Close menu"
            description="Close menu"
            id="lu1/V5"
          />
        </span>
        <RiCloseLine aria-hidden="true" className="size-6" />
      </SlideOutPrimitive.Close>
    </div>
  );
}
SlideOutHeader.displayName = 'SlideOutHeader';

export const SlideOutTitle = React.forwardRef<
  React.ElementRef<typeof SlideOutPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SlideOutPrimitive.Title>
>(({ className, children, ...props }, ref) => (
  <SlideOutPrimitive.Title
    ref={ref}
    className={clsx('flex items-center justify-between gap-x-4', className)}
    {...props}>
    <Heading level="heading5">{children}</Heading>
  </SlideOutPrimitive.Title>
));

SlideOutTitle.displayName = 'SlideOutTitle';

export function SlideOutBody({
  children,
  className,
  padding,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
  padding?: boolean;
}>) {
  return (
    <div className={clsx('grow overflow-y-auto', padding && 'px-6', className)}>
      <Section>
        <Text className="h-full" display="block" size="body2">
          {children}
        </Text>
      </Section>
    </div>
  );
}

export function SlideOutFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        'flex flex-row-reverse justify-start gap-2 px-6 py-4',
        className,
      )}
      {...props}
    />
  );
}
SlideOutFooter.displayName = 'SlideOutFooter';

type Props = Readonly<{
  asChild?: boolean;
  children: React.ReactNode;
  className?: string;
  enterFrom?: SlideOutEnterFrom;
  isShown?: boolean;
  isTitleHidden?: boolean;
  onClose?: () => void;
  padding?: boolean;
  primaryButton?: React.ReactNode;
  secondaryButton?: React.ReactNode;
  size: SlideOutSize;
  title?: React.ReactNode;
  trigger: React.ReactNode;
}>;

export default function SlideOut({
  asChild = true,
  className,
  children,
  enterFrom = 'end',
  isShown,
  size,
  primaryButton,
  title,
  trigger,
  secondaryButton,
  onClose,
  padding = true,
}: Props) {
  return (
    <SlideOutRoot
      open={isShown}
      onOpenChange={(open) => {
        if (!open) {
          onClose?.();
        }
      }}>
      <SlideOutTrigger asChild={asChild}>{trigger}</SlideOutTrigger>
      <SlideOutContent className={className} enterFrom={enterFrom} size={size}>
        <SlideOutHeader>
          {title && <SlideOutTitle>{title}</SlideOutTitle>}
        </SlideOutHeader>
        <SlideOutBody padding={padding}>{children}</SlideOutBody>
        {primaryButton && (
          <SlideOutFooter>
            {primaryButton}
            {secondaryButton}
          </SlideOutFooter>
        )}
      </SlideOutContent>
    </SlideOutRoot>
  );
}
