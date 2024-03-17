import type { ForwardedRef } from 'react';
import React, { forwardRef } from 'react';

import type { TextColor, TextSize, TextWeight } from './TextStyles';
import { textVariants } from './TextStyles';

type Props = Readonly<{
  children?: React.ReactNode;
  className?: string;
  color?: TextColor;
  id?: string;
  size?: TextSize;
  weight?: TextWeight;
}>;

function Text(
  { children, color, className, size, weight, ...props }: Props,
  ref: ForwardedRef<HTMLSpanElement>,
) {
  return (
    <span
      ref={ref}
      className={textVariants({
        className,
        color,
        size,
        weight,
      })}
      {...props}>
      {children}
    </span>
  );
}

export default forwardRef(Text);
