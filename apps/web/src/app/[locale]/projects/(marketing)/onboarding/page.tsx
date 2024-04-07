import type { Metadata } from 'next/types';

import { redirectToLoginPageIfNotLoggedIn } from '~/components/auth/redirectToLoginPageIfNotLoggedIn';
import ProjectsOnboardingReasonPage from '~/components/projects/onboarding/ProjectsOnboardingReasonPage';

import { getIntlServerOnly } from '~/i18n';
import defaultProjectsMetadata from '~/seo/defaultProjectsMetadata';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);

  return defaultProjectsMetadata(intl, {
    description: intl.formatMessage({
      defaultMessage:
        'Tell us your motivations so that we can tailor your experience',
      description: 'Description of projects onboarding motivations page',
      id: 'lD4azu',
    }),
    locale,
    pathname: '/projects/onboarding',
    title: intl.formatMessage({
      defaultMessage: 'Your motivations',
      description: 'Title of projects onboarding motivations page',
      id: '2BOlBd',
    }),
  });
}

type Props = Readonly<{
  params: Readonly<{ locale: string }>;
}>;

export default async function Page() {
  await redirectToLoginPageIfNotLoggedIn('/projects/onboarding');

  return <ProjectsOnboardingReasonPage />;
}
