'use client';

import clsx from 'clsx';
import { Ri4KLine } from 'react-icons/ri';

import Text from '~/components/ui/Text';

import { TilesPanelRoot } from '~/react-tiling/components/TilesPanelRoot';
import { TilesProvider } from '~/react-tiling/state/TilesProvider';
import type { TilesPanelConfig } from '~/react-tiling/types';

export default function Page() {
  const layout: TilesPanelConfig<string> = {
    direction: 'horizontal',
    id: 'root',
    items: [
      {
        activeTabId: 'A',
        collapsible: true,
        id: 'left',
        tabs: [
          {
            closeable: true,
            id: 'A',
          },
          {
            closeable: true,
            id: 'B',
          },
        ],
        type: 'item',
      },
      {
        direction: 'vertical',
        id: 'right-column',
        items: [
          {
            activeTabId: 'E',
            collapsible: true,
            id: 'right-top',
            tabs: [
              {
                closeable: true,
                id: 'D',
              },
              {
                closeable: true,
                id: 'E',
              },
            ],
            type: 'item',
          },
          {
            activeTabId: 'F',
            collapsible: true,
            id: 'right-bottom',
            tabs: [
              {
                closeable: true,
                id: 'F',
              },
              {
                closeable: true,
                id: 'G',
              },
            ],
            type: 'item',
          },
        ],
        type: 'group',
      },
    ],
    type: 'group',
  } as const;

  return (
    <div
      className={clsx(
        'h-screen w-full p-3',
        'bg-neutral-50 dark:bg-neutral-950',
      )}>
      <TilesProvider defaultValue={layout}>
        <TilesPanelRoot
          disablePointerEventsDuringResize={true}
          getResizeHandlerProps={(direction) => ({
            children: (
              <div
                className={clsx(
                  'transition-color group-hover:bg-brand absolute rounded-full ease-in-out',
                  direction === 'horizontal' && 'inset-x-0 inset-y-1',
                  direction === 'vertical' && 'inset-x-1 inset-y-0',
                )}
              />
            ),
            className: clsx(
              'relative bg-transparent group',
              direction === 'horizontal' && 'h-3',
              direction === 'vertical' && 'w-3',
            ),
          })}
          getTabLabel={(tabId) => ({
            icon: Ri4KLine,
            label: `Tab ${tabId}`,
          })}
          renderTab={(tabId) => (
            <div className="size-full flex items-center justify-center">
              <Text className="text-6xl" weight="bold">
                {tabId}
              </Text>
            </div>
          )}
        />
      </TilesProvider>
    </div>
  );
}
