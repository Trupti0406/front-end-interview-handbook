'use client';

import clsx from 'clsx';
import type { ReactNode } from 'react';

import Anchor from '~/components/ui/Anchor';
import { themeBorderElementColor } from '~/components/ui/theme';

import type { TextSize } from '../Text';
import Text from '../Text';

export type TabItem<T> = Readonly<{
  href?: string;
  icon?: React.ComponentType<React.ComponentProps<'svg'>>;
  label: string;
  value: T;
}>;

type TabSize = 'md' | 'sm' | 'xs';

type Props<T> = Readonly<{
  endAddOn?: ReactNode;
  hasBorder?: boolean;
  label: string;
  onSelect?: (value: T) => void;
  scrollToTop?: boolean;
  size?: TabSize;
  tabs: ReadonlyArray<TabItem<T>>;
  value: T;
}>;

const sizeClasses: Record<
  TabSize,
  Readonly<{
    borderRadius: string;
    iconSize: string;
    tabGapSize: string;
    tabInternalGapSize: string;
    tabItemSize: string;
    textSize: TextSize;
  }>
> = {
  md: {
    borderRadius: 'rounded-t-md',
    iconSize: 'size-5',
    tabGapSize: 'gap-x-3',
    tabInternalGapSize: 'gap-x-2',
    tabItemSize: 'py-2.5 px-5',
    textSize: 'body1',
  },
  sm: {
    borderRadius: 'rounded-t',
    iconSize: 'size-4',
    tabGapSize: 'gap-x-2',
    tabInternalGapSize: 'gap-x-1.5',
    tabItemSize: 'py-1.5 px-3',
    textSize: 'body2',
  },
  xs: {
    borderRadius: 'rounded-t',
    iconSize: 'size-4',
    tabGapSize: 'gap-x-1',
    tabInternalGapSize: 'gap-x-1',
    tabItemSize: 'py-1.5 px-2',
    textSize: 'body3',
  },
};

export default function Tabs<T>({
  endAddOn,
  hasBorder = true,
  label,
  tabs,
  scrollToTop = true,
  size = 'md',
  value,
  onSelect,
}: Props<T>) {
  const {
    borderRadius,
    iconSize,
    tabItemSize,
    tabInternalGapSize,
    tabGapSize,
    textSize,
  } = sizeClasses[size];

  return (
    <div className="isolate w-full overflow-x-auto overflow-y-hidden">
      <div
        className={clsx('flex items-center', [
          'border-b',
          themeBorderElementColor,
        ])}>
        <nav aria-label={label} className={clsx('flex grow', tabGapSize)}>
          {tabs.map((tabItem) => {
            const {
              icon: Icon,
              label: tabItemLabel,
              value: tabItemValue,
              href,
            } = tabItem;
            const isSelected = tabItemValue === value;
            const commonProps = {
              children: (
                <Text
                  className={clsx(
                    'flex items-center transition-all',
                    tabInternalGapSize,
                  )}
                  color={isSelected ? 'active' : 'secondary'}
                  size={textSize}
                  weight={isSelected ? 'medium' : 'normal'}>
                  {Icon && (
                    <Icon
                      className={clsx(
                        'shrink-0',
                        !isSelected &&
                          'dark:hover-text-inherit text-neutral-400 hover:text-inherit dark:text-neutral-500',
                        iconSize,
                      )}
                    />
                  )}
                  {tabItemLabel}
                </Text>
              ),
              className: clsx(
                'flex items-center whitespace-nowrap -mb-px z-10 transition',
                borderRadius,
                hasBorder
                  ? isSelected
                    ? [
                        'border',
                        'border-t-neutral-300 border-x-neutral-300 border-b-white',
                        'dark:border-t-neutral-700 dark:border-x-neutral-700 dark:border-b-neutral-900',
                      ]
                    : [
                        'bg-neutral-100 hover:bg-neutral-50 dark:bg-neutral-800 dark:hover:bg-neutral-800/40',
                        'border',
                        'border-t-transparent border-x-transparent border-b-neutral-300',
                        'dark:border-b-neutral-700',
                      ]
                  : isSelected && [
                      'border',
                      'border-x-0',
                      'border-t-0',
                      'border-b-brand',
                    ],
                tabItemSize,
              ),
              onClick: () => onSelect?.(tabItemValue),
            };

            if (href != null) {
              return (
                <Anchor
                  key={String(tabItemValue)}
                  href={href}
                  scrollToTop={scrollToTop}
                  variant="unstyled"
                  {...commonProps}
                />
              );
            }

            return (
              <button
                key={String(tabItemValue)}
                type="button"
                {...commonProps}
              />
            );
          })}
        </nav>
        {endAddOn}
      </div>
    </div>
  );
}
