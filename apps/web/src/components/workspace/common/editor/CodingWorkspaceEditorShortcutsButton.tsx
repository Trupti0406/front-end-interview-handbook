'use client';

import { RiKeyboardBoxLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Divider from '~/components/ui/Divider';
import SlideOut from '~/components/ui/SlideOut';
import Text from '~/components/ui/Text';
type PlatformSpecificKeys = 'alt' | 'ctrl' | 'shift';

const NON_MAC_KEYS: Record<PlatformSpecificKeys, string> = {
  alt: 'Alt',
  ctrl: 'Ctrl',
  shift: 'Shift',
};
const MAC_KEYS: Record<PlatformSpecificKeys, string> = {
  alt: '⌥',
  ctrl: '⌘',
  shift: '⇧',
};
const ALT_KEY: PlatformSpecificKeys = 'alt';
const CTRL_KEY: PlatformSpecificKeys = 'ctrl';
const SHIFT_KEY: PlatformSpecificKeys = 'shift';
const UP_KEY = '↑';
const DOWN_KEY = '↓';

function renderPlatformSpecificKey(key: string): string {
  try {
    if (key in MAC_KEYS) {
      const platformSpecificKey = key as PlatformSpecificKeys;

      return navigator.platform.toLowerCase().indexOf('mac') > -1
        ? MAC_KEYS[platformSpecificKey]
        : NON_MAC_KEYS[platformSpecificKey];
    }

    return key;
  } catch {
    return key;
  }
}

function useShortcuts(): ReadonlyArray<{
  key: string;
  keys: ReadonlyArray<string>;
  label: string;
}> {
  const intl = useIntl();

  return [
    {
      key: 'cut-line',
      keys: [CTRL_KEY, 'X'],
      label: intl.formatMessage({
        defaultMessage: 'Cut line (empty selection)',
        description:
          'Text describing command to cut line(s) in the coding workspace shortcuts menu',
        id: 'FLKG3X',
      }),
    },
    {
      key: 'copy-line',
      keys: [CTRL_KEY, 'C'],
      label: intl.formatMessage({
        defaultMessage: 'Copy line (empty selection)',
        description:
          'Text describing command to copy line(s) in the coding workspace shortcuts menu',
        id: 'pp1TOt',
      }),
    },
    {
      key: 'delete-line',
      keys: [SHIFT_KEY, CTRL_KEY, 'K'],
      label: intl.formatMessage({
        defaultMessage: 'Delete line',
        description:
          'Text describing command to delete line(s) in the coding workspace shortcuts menu',
        id: 'F5oV3L',
      }),
    },
    {
      key: 'undo',
      keys: [CTRL_KEY, 'Z'],
      label: intl.formatMessage({
        defaultMessage: 'Undo',
        description:
          'Text describing undo command in the coding workspace shortcuts menu',
        id: '/ftlBv',
      }),
    },
    {
      key: 'redo',
      keys: [SHIFT_KEY, CTRL_KEY, 'Z'],
      label: intl.formatMessage({
        defaultMessage: 'Redo',
        description:
          'Text describing redo command in the coding workspace shortcuts menu',
        id: 'bE90WW',
      }),
    },
    {
      key: 'jump-matching-bracket',
      keys: [SHIFT_KEY, CTRL_KEY, '\\'],
      label: intl.formatMessage({
        defaultMessage: 'Jump to matching bracket',
        description:
          'Text describing jump command in the coding workspace shortcuts menu',
        id: 'NAkpAg',
      }),
    },
    {
      key: 'indent-line',
      keys: [CTRL_KEY, ']'],
      label: intl.formatMessage({
        defaultMessage: 'Indent line',
        description:
          'Text describing indent line in the coding workspace shortcuts menu',
        id: 'tuaXhc',
      }),
    },
    {
      key: 'outdent-line',
      keys: [CTRL_KEY, '['],
      label: intl.formatMessage({
        defaultMessage: 'Outdent line',
        description:
          'Text describing outdent line command in the coding workspace shortcuts menu',
        id: 'akHBWv',
      }),
    },
    {
      key: 'move-line-down',
      keys: [ALT_KEY, DOWN_KEY],
      label: intl.formatMessage({
        defaultMessage: 'Move line down',
        description:
          'Text describing command to move lines down in the coding workspace shortcuts menu',
        id: 'tnHfa2',
      }),
    },
    {
      key: 'move-line-up',
      keys: [ALT_KEY, UP_KEY],
      label: intl.formatMessage({
        defaultMessage: 'Move line up',
        description:
          'Text describing command to move lines up in the coding workspace shortcuts menu',
        id: '032cio',
      }),
    },
    {
      key: 'copy-line-down',
      keys: [SHIFT_KEY, ALT_KEY, DOWN_KEY],
      label: intl.formatMessage({
        defaultMessage: 'Copy line down',
        description:
          'Text describing command to copy lines down in the coding workspace shortcuts menu',
        id: 'd3GL1v',
      }),
    },
    {
      key: 'copy-line-up',
      keys: [SHIFT_KEY, ALT_KEY, UP_KEY],
      label: intl.formatMessage({
        defaultMessage: 'Copy line up',
        description:
          'Text describing command to copy lines up in the coding workspace shortcuts menu',
        id: 'eQwU0l',
      }),
    },
    {
      key: 'add-selection-to-next-find-match',
      keys: [CTRL_KEY, 'D'],
      label: intl.formatMessage({
        defaultMessage: 'Add selection to next find match',
        description:
          'Text describing command to add selection to next find match in the coding workspace shortcuts menu',
        id: 'SdXQye',
      }),
    },
    {
      key: 'select-current-line',
      keys: [CTRL_KEY, 'L'],
      label: intl.formatMessage({
        defaultMessage: 'Select current line',
        description:
          'Text describing command to select current line in the coding workspace shortcuts menu',
        id: '8vjTks',
      }),
    },
    {
      key: 'toggle-line-comment',
      keys: [CTRL_KEY, '/'],
      label: intl.formatMessage({
        defaultMessage: 'Toggle line comment',
        description:
          'Text describing command to toggle line comment in the coding workspace shortcuts menu',
        id: 'uM5kA8',
      }),
    },
  ];
}

export default function CodingWorkspaceEditorShortcutsButton() {
  const shortcuts = useShortcuts();
  const intl = useIntl();

  return (
    <div>
      <SlideOut
        enterFrom="end"
        size="md"
        title={intl.formatMessage({
          defaultMessage: 'Editor Shortcuts',
          description: 'Label for slideout for code editor shortcuts',
          id: 'yM3vbW',
        })}
        trigger={
          <Button
            icon={RiKeyboardBoxLine}
            isLabelHidden={true}
            label={intl.formatMessage({
              defaultMessage: 'Editor shortcuts',
              description: 'Label for button to open code editor shortcuts',
              id: 'yrC3kR',
            })}
            size="xs"
            tooltip={intl.formatMessage({
              defaultMessage: 'Editor shortcuts',
              description: 'Tooltip for button to open code editor shortcuts',
              id: 'w3T2Ld',
            })}
            variant="tertiary"
          />
        }>
        <div className="flex flex-col gap-4">
          <Text className="block" size="body2">
            <FormattedMessage
              defaultMessage="GreatFrontEnd uses Monaco Editor, the same code editor used in Visual Studio Code (VS Code). Most editor shortcuts in VS Code should work here as well. Here's a list of common shortcuts for your reference:"
              description="Description within code editor shortcuts"
              id="44kz/c"
            />
          </Text>
          <Divider />
          <div className="space-y-2">
            {shortcuts.map(({ label, keys, key }) => (
              <div key={key} className="flex items-center justify-between">
                <Text color="secondary" size="body3">
                  {label}
                </Text>
                <Text size="body3">
                  <div className="flex gap-1">
                    {keys.map((keyParam) => (
                      <span
                        key={keyParam}
                        className="bg-brand-lightest text-brand-darker dark:text-brand-light rounded-md px-1 py-0.5 dark:bg-neutral-700">
                        {renderPlatformSpecificKey(keyParam)}
                      </span>
                    ))}
                  </div>
                </Text>
              </div>
            ))}
          </div>
          <Divider />
          <Text className="block" color="secondary" size="body3">
            <FormattedMessage
              defaultMessage="Full list of shortcuts can be found on the <link>Visual Studio Code website</link>."
              description="Text in coding workspace shortcuts that provides user with the link to the full list of shortcuts"
              id="rWhQtZ"
              values={{
                link: (chunks) => (
                  <Anchor href="https://code.visualstudio.com/docs/getstarted/keybindings#_basic-editing">
                    {chunks}
                  </Anchor>
                ),
              }}
            />
          </Text>
        </div>
      </SlideOut>
    </div>
  );
}