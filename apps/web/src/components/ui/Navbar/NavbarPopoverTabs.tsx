import clsx from 'clsx';
import { useState } from 'react';

import Anchor from '~/components/ui/Anchor';
import {
  themeBackgroundCardAltColor,
  themeBackgroundColor,
  themeBackgroundElementEmphasizedStateColor,
  themeBackgroundElementEmphasizedStateColor_Hover,
  themeBorderEmphasizeColor,
  themeOutlineElement_FocusVisible,
  themeOutlineElementBrandColor_FocusVisible,
} from '~/components/ui/theme';

import NavbarFeatureIcon from './NavbarFeatureIcon';
import type { NavPopoverGroupItem, NavPopoverLinkItem } from './NavTypes';
import Button from '../Button';
import Text from '../Text';

import * as TabsPrimitive from '@radix-ui/react-tabs';

function NavbarPopoverLink({
  label,
  icon: Icon,
  href,
  onClick,
  sublabel,
  labelAddon,
}: NavPopoverLinkItem) {
  const el =
    sublabel != null ? (
      <div className="group flex items-start gap-4 xl:flex-col">
        <NavbarFeatureIcon icon={Icon} />
        <div className="flex flex-col gap-y-0.5 xl:gap-y-1">
          <Text
            className="flex items-center gap-2"
            size="body1"
            weight="medium">
            <span className="shrink-0">{label}</span> {labelAddon}
          </Text>
          {sublabel && (
            <Text className="block" color="secondary" size="body2">
              {sublabel}
            </Text>
          )}
        </div>
      </div>
    ) : (
      <div className="group flex items-center gap-x-4">
        <NavbarFeatureIcon icon={Icon} />
        <Text
          className="flex flex-wrap items-center gap-2"
          size="body2"
          weight="medium">
          <span>{label}</span> {labelAddon}
        </Text>
      </div>
    );

  const className = clsx(
    'group flex grow',
    themeOutlineElement_FocusVisible,
    themeOutlineElementBrandColor_FocusVisible,
  );

  if (href == null) {
    return <div className={className}>{el}</div>;
  }

  return (
    <Anchor
      className={className}
      href={href}
      suppressHydrationWarning={true}
      variant="unstyled"
      onClick={onClick}>
      {el}
    </Anchor>
  );
}

export default function NavbarPopoverTabs({
  items,
  onClose,
}: Readonly<{
  items: ReadonlyArray<NavPopoverGroupItem>;
  onClose: React.MouseEventHandler<HTMLElement>;
}>) {
  const [value, setValue] = useState(items[0].itemKey);

  return (
    <div
      className={clsx(
        'flex',
        'overflow-hidden',
        'rounded-lg',
        'shadow-lg dark:shadow-none',
        ['border', themeBorderEmphasizeColor],
        themeBackgroundColor,
      )}>
      <TabsPrimitive.Root
        className="flex w-full"
        orientation="vertical"
        value={value}
        onValueChange={setValue}>
        <TabsPrimitive.List
          className={clsx(
            'min-w-60 flex w-1/4 shrink-0 flex-col gap-y-2 p-4',
            themeBackgroundCardAltColor,
          )}>
          {items.map(({ itemKey, label }) => (
            <TabsPrimitive.Trigger
              key={itemKey}
              className={clsx(
                'block w-full rounded-md p-3',
                'text-left text-sm font-medium',
                'outline-none',
                themeBackgroundElementEmphasizedStateColor_Hover,
                themeOutlineElement_FocusVisible,
                themeOutlineElementBrandColor_FocusVisible,
                value === itemKey && themeBackgroundElementEmphasizedStateColor,
              )}
              value={itemKey}>
              <Text
                color={value === itemKey ? 'active' : 'default'}
                size="body2"
                weight="medium">
                {label}
              </Text>
            </TabsPrimitive.Trigger>
          ))}
        </TabsPrimitive.List>
        <div className="flex w-full grow items-center">
          {items.map((item) => (
            <TabsPrimitive.Content
              key={item.itemKey}
              className={clsx(
                'outline-none',
                value === item.itemKey &&
                  'size-full flex flex-col justify-between',
              )}
              value={item.itemKey}>
              <div
                className={clsx(
                  'relative',
                  'grid grow gap-x-6 gap-y-6',
                  'p-6 xl:px-8 xl:py-10',
                  (item.items.length === 2 || item.items.length === 4) &&
                    'xl:grid-cols-2',
                  (item.items.length === 3 || item.items.length > 4) &&
                    'xl:grid-cols-3',
                )}>
                {item.items.map((childItem) => (
                  <div
                    key={childItem.itemKey}
                    className={clsx(
                      'flex h-full grow',
                      item.alignment === 'center' && 'items-center',
                    )}>
                    <NavbarPopoverLink
                      {...childItem}
                      onClick={(event) => {
                        // To close the popover.
                        onClose(event);
                        item.onClick?.(event);
                      }}
                    />
                  </div>
                ))}
              </div>
              {item.supplementaryItem != null && (
                <div
                  className={clsx('flex justify-end', 'w-full', 'px-8 pb-6')}>
                  <Button
                    className={clsx('-mb-3 -me-6')}
                    href={item.supplementaryItem.href}
                    icon={item.supplementaryItem.icon}
                    label={item.supplementaryItem.label}
                    size="md"
                    variant="tertiary"
                    onClick={(event) => {
                      item.supplementaryItem?.onClick?.(event);
                      // To close the popover.
                      onClose(event);
                    }}
                  />
                </div>
              )}
            </TabsPrimitive.Content>
          ))}
        </div>
      </TabsPrimitive.Root>
    </div>
  );
}
