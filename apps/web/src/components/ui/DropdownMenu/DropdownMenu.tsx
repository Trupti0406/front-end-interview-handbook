import clsx from 'clsx';
import React from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';

import { themeBorderElementColor } from '~/components/ui/theme';

import DropdownMenuItem from './DropdownMenuItem';
import Button from '../Button';
import { themeBackgroundColor } from '../theme';

import { Content, Portal, Root, Trigger } from '@radix-ui/react-dropdown-menu';

export type DropdownMenuAlignment = 'center' | 'end' | 'start';
export type DropdownMenuSize = 'md' | 'sm' | 'xs';
export type DropdownMenuSide = 'bottom' | 'left' | 'right' | 'top';
export type DropdownMenuVariant = 'secondary' | 'tertiary';
export type DropdownLabelColor = 'default' | 'inherit';

type Props = Readonly<{
  align?: DropdownMenuAlignment;
  // TODO: Change to strict children.
  children: React.ReactNode;
  forceDark?: boolean;
  icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
  isDisabled?: boolean;
  isLabelHidden?: boolean;
  label: string;
  labelColor?: DropdownLabelColor;
  showChevron?: boolean;
  side?: DropdownMenuSide;
  size?: DropdownMenuSize;
  variant?: DropdownMenuVariant;
}>;

DropdownMenu.Item = DropdownMenuItem;

export default function DropdownMenu({
  align = 'start',
  children,
  forceDark = false,
  icon: Icon,
  isDisabled = false,
  isLabelHidden = false,
  label,
  side = 'bottom',
  showChevron = true,
  size = 'md',
  variant = 'secondary',
}: Props) {
  return (
    <Root>
      <Trigger asChild={true}>
        <Button
          icon={Icon}
          iconSecondary_USE_SPARINGLY={
            showChevron ? RiArrowDownSLine : undefined
          }
          isDisabled={isDisabled}
          isLabelHidden={isLabelHidden}
          label={label}
          size={size}
          variant={variant}
        />
      </Trigger>
      <Portal>
        <Content
          align={align}
          className={clsx('p-2 rounded-lg', themeBackgroundColor, [
            'border',
            themeBorderElementColor,
          ])}
          data-mode={forceDark ? 'dark' : undefined}
          side={side}
          sideOffset={8}>
          {children}
        </Content>
      </Portal>
    </Root>
  );
}
