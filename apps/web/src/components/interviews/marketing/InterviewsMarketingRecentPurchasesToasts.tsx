'use client';

import { useEffect } from 'react';
import { RiStarSmileLine } from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';
import { useLocalStorage } from 'usehooks-ts';

import { trpc } from '~/hooks/trpc';

import { useToast } from '~/components/global/toasts/useToast';
import Anchor from '~/components/ui/Anchor';

import { useUserProfile } from '../../global/UserProfileProvider';

const ONE_DAY_IN_SECONDS = 24 * 60 * 60 * 1_000;
const ONE_WEEK_IN_SECONDS = 7 * ONE_DAY_IN_SECONDS;
const MARKETING_TOAST_INDEX = 'gfe:marketing.purchases.toast.index';

function MarketingRecentPurchasesImpl({
  setLastShown,
}: Readonly<{
  setLastShown: (lastShown: number) => void;
}>) {
  const { showToast } = useToast();
  const { data } = trpc.purchases.recent.useQuery();

  const [index, setIndex] = useLocalStorage(MARKETING_TOAST_INDEX, 0);

  useEffect(() => {
    if (data == null) {
      return;
    }

    if (index >= data.length) {
      setLastShown(Date.now());

      return;
    }

    const currentPurchase = data[index];

    if (currentPurchase == null) {
      return;
    }

    showToast({
      duration: 8000,
      icon: RiStarSmileLine,
      onClose: () => {
        setIndex(data.length);
        setLastShown(Date.now());
      },
      title: (
        <FormattedMessage
          defaultMessage="Someone from {country} subscribed to <link>Premium</link> recently"
          description="Marketing toast to show that someone has subscribed"
          id="5gqGca"
          values={{
            country: currentPurchase.country,
            link: (chunks) => <Anchor href="/pricing">{chunks}</Anchor>,
          }}
        />
      ),
      variant: 'dark',
    });

    const timer = setTimeout(() => {
      setIndex((curr) => curr + 1);
    }, 30000);

    return () => {
      clearTimeout(timer);
    };
  }, [index, data, showToast, setLastShown, setIndex]);

  return null;
}

export default function InterviewsMarketingRecentPurchasesToasts() {
  const { isUserProfileLoading, userProfile } = useUserProfile();

  const [lastShown, setLastShown] = useLocalStorage<number | null>(
    'gfe:marketing.purchases.toast.last_shown',
    null,
  );

  if (isUserProfileLoading || userProfile?.isPremium) {
    return null;
  }

  if (lastShown != null) {
    const currentDate = new Date().getTime();
    const lastShownDate = new Date(lastShown).getTime();

    // If shown recently, don't show again.
    if (Math.abs(currentDate - lastShownDate) < ONE_WEEK_IN_SECONDS) {
      return null;
    }

    localStorage.removeItem(MARKETING_TOAST_INDEX);
  }

  return <MarketingRecentPurchasesImpl setLastShown={setLastShown} />;
}
