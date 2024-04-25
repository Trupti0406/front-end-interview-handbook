'use client';

import clsx from 'clsx';
import type { ReactNode } from 'react';

import type { TextSize } from '../Text';
import { textVariants } from '../Text';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';

export type TooltipContentAlignment = 'center' | 'end' | 'start';
export type TooltipContentSide = 'bottom' | 'left' | 'right' | 'top';
export type TooltipSize = 'md' | 'sm';

const sizeClasses: Record<TooltipSize, string> = {
  md: 'p-3',
  sm: 'p-2',
};

const fontSizeClasses: Record<TooltipSize, TextSize> = {
  md: 'body2',
  sm: 'body3',
};

type Props = Readonly<{
  align?: TooltipContentAlignment;
  asChild?: boolean;
  children: ReactNode;
  className?: string;
  invert?: boolean;
  label?: ReactNode;
  side?: TooltipContentSide;
  size?: TooltipSize;
  triggerClassName?: string;
  triggerType?: 'button' | 'submit';
}>;

export default function Tooltip({
  align = 'center',
  asChild = false,
  children,
  className,
  triggerClassName,
  invert = false,
  label,
  side = 'top',
  size = 'sm',
  triggerType = 'button', // To prevent clicking on tooltip from submitting if it is within a form.
}: Props) {
  const tooltipBackgroundColor = invert
    ? 'bg-neutral-200 dark:bg-neutral-900'
    : 'bg-neutral-950 dark:bg-neutral-200';
  const tooltipArrowColor = invert
    ? 'fill-neutral-200 dark:fill-neutral-900'
    : 'fill-neutral-950 dark:fill-neutral-200';

  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger
          asChild={asChild}
          className={triggerClassName}
          type={triggerType}>
          {children}
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            align={align}
            className={clsx(
              'select-none',
              'rounded',
              'z-tooltip',
              'max-w-64',
              tooltipBackgroundColor,
              sizeClasses[size],
              textVariants({
                className,
                color: invert ? undefined : 'invert',
                size: fontSizeClasses[size],
                weight: 'medium',
              }),
            )}
            side={side}
            sideOffset={4}>
            {label}
            <TooltipPrimitive.Arrow className={tooltipArrowColor} />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
