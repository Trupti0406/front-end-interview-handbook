import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import url from 'node:url';

import RewardsCompletePage from '~/components/rewards/complete/RewardsCompletePage';

import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';
import { readUserFromToken } from '~/supabase/SupabaseServerGFE';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);

  return defaultMetadata({
    locale,
    pathname: '/rewards/social/complete',
    title: intl.formatMessage({
      defaultMessage: 'Complete | Rewards',
      description: 'Title of Rewards Complete page',
      id: 'XIMn32',
    }),
  });
}

export default async function Page() {
  const user = await readUserFromToken();

  if (user == null) {
    return redirect(
      url.format({
        pathname: '/login',
        query: {
          next: '/rewards/social',
        },
      }),
    );
  }

  return <RewardsCompletePage />;
}
