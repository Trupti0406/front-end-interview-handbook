import type { Metadata } from 'next/types';

import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

import ContactPage from './ContactPage';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);

  return defaultMetadata({
    description: intl.formatMessage({
      defaultMessage:
        'Have questions, feedback, or anything to say? Let us know and we will get back as soon as possible.',
      description: 'Description of Contact Us page',
      id: 'kn+R8V',
    }),
    pathname: '/contact',
    title: intl.formatMessage({
      defaultMessage: 'Contact Us',
      description: 'Title of Contact Us page',
      id: 'R5FPug',
    }),
  });
}

export default ContactPage;
