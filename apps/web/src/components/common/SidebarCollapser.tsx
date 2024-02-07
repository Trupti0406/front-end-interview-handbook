import clsx from 'clsx';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import { useUserPreferences } from '~/components/global/UserPreferencesProvider';
import {
  themeBackgroundColor,
  themeBackgroundEmphasized_Hover,
  themeBorderColor,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

export default function SidebarCollapser() {
  const intl = useIntl();
  const { showSidebar, setShowSidebar } = useUserPreferences();
  const title = showSidebar
    ? intl.formatMessage({
        defaultMessage: 'Collapse side menu',
        description:
          'Screenreader text for the button that collapses the side menu',
        id: 'TB8vuT',
      })
    : intl.formatMessage({
        defaultMessage: 'Show side menu',
        description:
          'Screenreader text for the button that expands the side menu',
        id: 'KlEAfS',
      });

  return (
    <button
      aria-label={title}
      className={clsx(
        'hidden items-center justify-center p-1 lg:flex',
        'absolute top-[80px] z-10 -ml-px h-10 translate-x-full',
        showSidebar ? 'right-px' : 'right-0',
        'rounded-r-lg border-y border-r',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        'focus:ring-brand-dark dark:focus:ring-brand',
        themeTextSecondaryColor,
        themeBorderColor,
        themeBackgroundColor,
        themeBackgroundEmphasized_Hover,
      )}
      title={title}
      type="button"
      onClick={() => setShowSidebar(!showSidebar)}>
      {showSidebar ? (
        <RiArrowLeftSLine className="size-4" />
      ) : (
        <RiArrowRightSLine className="size-4" />
      )}
    </button>
  );
}
