import type { Metadata } from 'next/types';

import Container from '~/components/ui/Container';
import Prose from '~/components/ui/Prose';

import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

import About from './about.mdx';

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
        'Find out more about the team who built GreatFrontEnd and why we did it',
      description: 'Description of About Us page',
      id: 'mt2ON4',
    }),
    pathname: '/about',
    title: intl.formatMessage({
      defaultMessage: 'About Us',
      description: 'Title of About Us page',
      id: 'jtuJQk',
    }),
  });
}

export default function Page() {
  return (
    <Container variant="narrow">
      <Prose>
        <div className="my-20 lg:max-w-prose">
          <About />
        </div>
      </Prose>
    </Container>
  );
}
