import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { RiArrowDownSLine } from 'react-icons/ri';

import { useGuidesData } from '~/data/Guides';

import Anchor from '~/components/ui/Anchor';
import {
  dropdownContentClassName,
  dropdownContentItemClassName,
} from '~/components/ui/DropdownMenu/dropdownStyles';
import Text from '~/components/ui/Text';
import {
  themeTextBrandColor,
  themeTextSubtleColor,
} from '~/components/ui/theme';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

export default function GuidesDropdownMenu() {
  const guidesData = useGuidesData();
  const guides = [
    guidesData['front-end-interview-guidebook'],
    guidesData['front-end-system-design-guidebook'],
    guidesData['behavioral-interview-guidebook'],
  ];

  const pathname = usePathname();

  const selectedGuide =
    Object.values(guides).find(({ href }) => pathname?.startsWith(href)) ??
    guides[0];

  const Icon = selectedGuide.icon;
  const label = selectedGuide.shortName;

  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger
        className={clsx(
          'group inline-flex flex-1 items-center justify-between gap-2',
          'px-2 py-1.5',
          'transition-colors',
        )}>
        <div className="flex items-center gap-2">
          <Icon className="size-4 text-white" />
          <Text
            className="line-clamp-1 text-ellipsis text-left"
            color="secondary"
            size="body2"
            weight="medium">
            {label}
          </Text>
        </div>
        <RiArrowDownSLine
          aria-hidden="true"
          className={clsx('size-4 shrink-0', themeTextSubtleColor)}
        />
      </DropdownMenuPrimitive.Trigger>
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          align="start"
          className={dropdownContentClassName}
          sideOffset={8}>
          {Object.values(guides).map(
            ({ key, href, shortName, icon: ItemIcon }) => {
              const isSelected = pathname ? pathname.startsWith(href) : false;

              return (
                <DropdownMenuPrimitive.Item key={key} asChild={true}>
                  <Anchor
                    className={clsx(dropdownContentItemClassName, 'gap-2')}
                    href={href}
                    variant="unstyled">
                    <ItemIcon
                      className={clsx(
                        'size-4',
                        isSelected ? themeTextBrandColor : themeTextSubtleColor,
                      )}
                    />
                    <Text
                      className="block"
                      color={isSelected ? 'active' : 'default'}
                      size="body2">
                      {shortName}
                    </Text>
                  </Anchor>
                </DropdownMenuPrimitive.Item>
              );
            },
          )}
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
}
