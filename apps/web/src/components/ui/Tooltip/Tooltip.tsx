'use client';

import clsx from 'clsx';
import type { ReactNode, RefObject } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { createPortal } from 'react-dom';

import type { TextSize } from '../Text';
import Text from '../Text';

export type TooltipAlignment = 'bottom' | 'center' | 'end' | 'start' | 'top';
export type TooltipPosition = 'above' | 'below' | 'end' | 'start';
export type TooltipSize = 'md' | 'sm';

type TooltipLabelProps = Readonly<{
  alignment: TooltipAlignment;
  children: ReactNode;
  position: TooltipPosition;
  size: TooltipSize;
  triggerRef: RefObject<HTMLSpanElement>;
}>;

const sizeClasses: Record<TooltipSize, string> = {
  md: 'px-3 py-2',
  sm: 'px-2 py-1',
};

const fontSizeClasses: Record<TooltipSize, TextSize> = {
  md: 'body2',
  sm: 'body3',
};

function TooltipLabel({
  alignment,
  children,
  position,
  size,
  triggerRef,
}: TooltipLabelProps) {
  const shouldUseXAlignment = position === 'above' || position === 'below';
  const shouldUseYAlignment = position === 'start' || position === 'end';

  const [triggerRect, setTriggerRect] = useState(
    triggerRef.current?.getBoundingClientRect(),
  );

  useEffect(() => {
    const moveOnScroll = () => {
      setTriggerRect(triggerRef.current?.getBoundingClientRect());
    };

    window.addEventListener('scroll', moveOnScroll);

    return () => window.removeEventListener('scroll', moveOnScroll);
  });

  useEffect(() => {
    const moveOnWindowResize = () => {
      setTriggerRect(triggerRef.current?.getBoundingClientRect());
    };

    window.addEventListener('resize', moveOnWindowResize);

    return () => window.removeEventListener('resize', moveOnWindowResize);
  });

  if (!triggerRect) {
    return null;
  }

  const {
    left: triggerLeft,
    right: triggerRight,
    top: triggerTop,
    bottom: triggerBottom,
  } = triggerRect;

  const xAlignmentStyle = {
    left:
      alignment === 'center'
        ? (triggerLeft + triggerRight) / 2
        : alignment === 'start'
        ? triggerLeft
        : undefined,
    right:
      alignment === 'end'
        ? document.body.clientWidth - triggerRight
        : undefined,
  };
  const yAlignmentStyle = {
    bottom:
      alignment === 'bottom' ? window.innerHeight - triggerBottom : undefined,
    top:
      alignment === 'center'
        ? (triggerTop + triggerBottom) / 2
        : alignment === 'top'
        ? triggerTop
        : undefined,
  };
  const startPositionStyle = {
    right: document.body.clientWidth - triggerLeft,
    ...yAlignmentStyle,
  };
  const endPositionStyle = {
    left: triggerRight,
    ...yAlignmentStyle,
  };
  const abovePositionStyle = {
    bottom: window.innerHeight - triggerTop,
    ...xAlignmentStyle,
  };
  const belowPositionStyle = {
    ...xAlignmentStyle,
    top: triggerBottom,
  };
  const styleMap = {
    above: abovePositionStyle,
    below: belowPositionStyle,
    end: endPositionStyle,
    start: startPositionStyle,
  };

  return (
    <span
      className={clsx(
        'fixed z-40 rounded',
        sizeClasses[size],
        'bg-neutral-950 dark:bg-white',
        position === 'above' && 'mb-1.5',
        position === 'below' && 'mt-1.5',
        position === 'start' && 'mr-1.5',
        position === 'end' && 'ml-1.5',
        shouldUseXAlignment && alignment === 'center' && '-translate-x-1/2',
        shouldUseYAlignment && alignment === 'center' && '-translate-y-1/2',
        'max-w-md',
      )}
      role="tooltip"
      style={styleMap[position]}>
      <div
        aria-hidden="true"
        className={clsx(
          'bg-neutral-950 absolute z-30 h-2 w-2 rounded-sm dark:bg-white',
          position === 'above' && '-bottom-[3px]',
          position === 'below' && '-top-[3px]',
          position === 'start' && '-right-[3px]',
          position === 'end' && '-left-[3px]',
          shouldUseXAlignment &&
            alignment === 'center' &&
            'left-0 right-0 mx-auto',
          shouldUseXAlignment && alignment === 'start' && 'left-2',
          shouldUseXAlignment && alignment === 'end' && 'right-2',
          shouldUseYAlignment && 'top-0 bottom-0 my-auto',
        )}
        style={{
          // Have to use inline styles to rotate then scale
          transform: shouldUseXAlignment
            ? 'scaleX(1.3) rotate(45deg)'
            : 'scaleY(1.3) rotate(45deg)',
        }}
      />
      <Text
        color="invert"
        display="block"
        size={fontSizeClasses[size]}
        weight="medium">
        {children}
      </Text>
    </span>
  );
}

type Props = Readonly<{
  alignment?: TooltipAlignment;
  children: ReactNode;
  className?: string;
  label?: ReactNode;
  position?: TooltipPosition;
  size?: TooltipSize;
}>;

type TooltipTriggerSource = 'focus' | 'mouseenter';

export default function Tooltip({
  alignment = 'center',
  children,
  className,
  label,
  size = 'sm',
  position = 'above',
}: Props) {
  const [triggerSource, setTriggerSource] =
    useState<TooltipTriggerSource | null>(null);
  const [isShown, setIsShown] = useState(false);
  const triggerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    function dismissOnEscape(event: KeyboardEvent) {
      if (event.code !== 'Escape') {
        return;
      }

      setIsShown(false);
    }

    window.addEventListener('keydown', dismissOnEscape);

    return () => {
      window.removeEventListener('keydown', dismissOnEscape);
    };
  }, []);

  useEffect(() => {
    function dismissOnBlur() {
      // Only dismiss when it's due to mouse.
      if (triggerSource === 'focus') {
        return;
      }

      setIsShown(false);
    }

    window.addEventListener('blur', dismissOnBlur);

    return () => {
      window.removeEventListener('blur', dismissOnBlur);
    };
  }, [triggerSource]);

  return (
    <span
      ref={triggerRef}
      className={clsx('pointer-events-auto relative inline-block', className)}
      onBlur={() => {
        if (triggerSource !== 'focus') {
          return;
        }

        setIsShown(false);
        setTriggerSource(null);
      }}
      onFocus={() => {
        if (triggerSource != null) {
          return;
        }

        setIsShown(true);
        setTriggerSource('focus');
      }}
      onMouseEnter={() => {
        if (triggerSource != null) {
          return;
        }

        setIsShown(true);
        setTriggerSource('mouseenter');
      }}
      onMouseLeave={() => {
        if (triggerSource !== 'mouseenter') {
          return;
        }

        setIsShown(false);
        setTriggerSource(null);
      }}>
      {children}
      {isShown &&
        createPortal(
          <TooltipLabel
            alignment={alignment}
            position={position}
            size={size}
            triggerRef={triggerRef}>
            {label}
          </TooltipLabel>,
          document.body,
        )}
    </span>
  );
}
