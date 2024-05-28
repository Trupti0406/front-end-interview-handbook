import {
  RiCodeSSlashLine,
  RiHome3Line,
  RiPriceTag3Line,
  RiRocketLine,
  RiShiningLine,
} from 'react-icons/ri';
import { useIntl } from 'react-intl';
import url from 'url';

import gtag from '~/lib/gtag';
import { SCROLL_HASH_PROJECTS_FEATURES } from '~/hooks/useScrollToHash';

import type { NavbarPrimaryItem } from '~/components/ui/Navbar/NavTypes';

export default function useProjectsNavItems(placement: 'nav' | 'sidebar') {
  const intl = useIntl();

  const dashboard: NavbarPrimaryItem = {
    href: '/projects/dashboard',
    icon: RiHome3Line,
    itemKey: 'dashboard',
    label: intl.formatMessage({
      defaultMessage: 'Dashboard',
      description: 'Sidebar navigation label',
      id: 'R9G9bY',
    }),
    onClick: () => {
      gtag.event({
        action: `${placement}.dashboard.click`,
        category: 'engagement',
        label: 'Dashboard',
      });
    },
    position: 'start',
    type: 'link',
  };
  const challenges: NavbarPrimaryItem = {
    href: '/projects/challenges',
    icon: RiRocketLine,
    itemKey: 'challenges',
    label: intl.formatMessage({
      defaultMessage: 'Project challenges',
      description: 'Sidebar navigation label',
      id: 'OelRg0',
    }),
    onClick: () => {
      gtag.event({
        action: `${placement}.challenges.click`,
        category: 'engagement',
        label: 'Projects challenges',
      });
    },
    position: 'start',
    type: 'link',
  };
  const submissions: NavbarPrimaryItem = {
    href: '/projects/submissions',
    icon: RiCodeSSlashLine,
    itemKey: 'all-submissions',
    label: intl.formatMessage({
      defaultMessage: 'User submissions',
      description: 'Sidebar navigation label',
      id: 'e2P6am',
    }),
    onClick: () => {
      gtag.event({
        action: `${placement}.submissions.click`,
        category: 'engagement',
        label: 'User submissions',
      });
    },
    position: 'start',
    type: 'link',
  };
  const features: NavbarPrimaryItem = {
    href: url.format({
      hash: SCROLL_HASH_PROJECTS_FEATURES,
      pathname: '/projects',
    }),
    icon: RiShiningLine,
    itemKey: 'features',
    label: intl.formatMessage({
      defaultMessage: 'Features',
      description: 'Sidebar navigation label',
      id: 'IveIL+',
    }),
    onClick: () => {
      gtag.event({
        action: `${placement}.features.click`,
        category: 'engagement',
        label: 'Features',
      });
    },
    position: 'end',
    scroll: false,
    type: 'link',
  };
  const pricing: NavbarPrimaryItem = {
    href: '/projects/pricing',
    icon: RiPriceTag3Line,
    itemKey: 'pricing',
    label: intl.formatMessage({
      defaultMessage: 'Pricing',
      description: 'Sidebar navigation label',
      id: '9qO5Il',
    }),
    onClick: () => {
      gtag.event({
        action: `${placement}.pricing.click`,
        category: 'ecommerce',
        label: 'Pricing',
      });
    },
    position: 'end',
    type: 'link',
  };

  return { challenges, dashboard, features, pricing, submissions };
}
