'use client';

import clsx from 'clsx';
import * as React from 'react';

import { hovercardContentClassName } from './hovercardStyles';

import * as HoverCardPrimitive from '@radix-ui/react-hover-card';

const Hovercard = HoverCardPrimitive.Root;

const HovercardTrigger = HoverCardPrimitive.Trigger;

const HovercardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, side = 'top', sideOffset = 8, ...props }, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    className={clsx(hovercardContentClassName, className)}
    side={side}
    sideOffset={sideOffset}
    {...props}
  />
));

HovercardContent.displayName = HoverCardPrimitive.Content.displayName;

export { Hovercard, HovercardContent, HovercardTrigger };
