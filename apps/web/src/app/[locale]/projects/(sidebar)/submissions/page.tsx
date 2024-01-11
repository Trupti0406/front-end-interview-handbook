import type { Metadata } from 'next';

import ProjectsAllProjectsPage from '~/components/projects/lists/ProjectsAllProjectsPage';

import { readProjectsChallengeList } from '~/db/projects/ProjectsReader';
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
    pathname: '/projects/submissions',
    title: intl.formatMessage({
      defaultMessage: 'Submissions | Projects',
      description: 'Title of Projects submissions page',
      id: 'dSRF8u',
    }),
  });
}

export default async function Page({ params }: Props) {
  return <div>Hello</div>;
}
