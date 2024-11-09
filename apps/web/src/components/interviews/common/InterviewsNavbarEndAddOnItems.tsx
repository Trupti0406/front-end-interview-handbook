import gtag from '~/lib/gtag';
import useUserProfile from '~/hooks/user/useUserProfile';

import NavColorSchemeDropdown from '~/components/global/navbar/NavColorSchemeDropdown';
import NavI18nDropdown from '~/components/global/navbar/NavI18nDropdown';
import NavProfileIcon from '~/components/global/navbar/NavProfileIcon';
import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';

import useInterviewsLoggedInLinks from './useInterviewsLoggedInLinks';

import { useUser } from '@supabase/auth-helpers-react';

export default function InterviewsNavbarEndAddOnItems() {
  const user = useUser();
  const isLoggedIn = user != null;
  const { userProfile } = useUserProfile();
  const intl = useIntl();
  const isPremium = userProfile?.premium ?? false;
  const loggedInLinks = useInterviewsLoggedInLinks();

  return (
    <>
      {/* This custom breakpoint is set to avoid overlapping of elements on near tab breakpoint */}
      <div className="hidden gap-x-4 min-[1150px]:flex">
        <NavI18nDropdown />
        <NavColorSchemeDropdown />
      </div>
      {!isPremium && (
        <Button
          href="/interviews/pricing"
          label={intl.formatMessage({
            defaultMessage: 'Get full access',
            description:
              'Get full access button on the top right corner of the navigation bar to allow users to start evaluating plans and make a purchase',
            id: '0dpOm/',
          })}
          size="xs"
          variant="primary"
          onClick={() => {
            gtag.event({
              action: `nav.get_full_access.click`,
              category: 'ecommerce',
              label: 'Get full access',
            });
          }}
        />
      )}
      {isLoggedIn && (
        <NavProfileIcon
          avatarUrl={userProfile?.avatarUrl ?? user?.user_metadata?.avatar_url}
          navItems={loggedInLinks}
          userIdentifierString={userProfile?.name ?? user?.email}
        />
      )}
    </>
  );
}