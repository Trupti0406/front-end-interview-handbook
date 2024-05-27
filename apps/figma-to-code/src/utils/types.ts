import type { GFENode } from '../nodes/types';

import type { EventHandler } from '@create-figma-plugin/utilities';

export type ResizeWindowHandler = EventHandler & {
  handler: (windowSize: { height: number, width: number; }) => void;
  name: 'RESIZE_WINDOW';
}

export type CloseUIHandler = EventHandler & {
  handler: () => void;
  name: 'CLOSE_UI';
}

export type UIReadyHandler = EventHandler & {
  handler: () => void;
  name: 'UI_READY';
}

export type SelectionChangedHandler = EventHandler & {
  handler: (node: GFENode | null) => void;
  name: 'SELECTION_CHANGED';
}

export type CopyHandler = EventHandler & {
  handler: (success: boolean) => void;
  name: 'COPY_TO_CLIPBOARD';
}
