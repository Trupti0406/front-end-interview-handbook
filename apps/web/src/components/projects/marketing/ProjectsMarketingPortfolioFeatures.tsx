import clsx from 'clsx';
import Image from 'next/image';
import { useId, useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { useColorSchemePreferences } from '~/components/global/color-scheme/ColorSchemePreferencesProvider';
import MarketingSectionHeader from '~/components/marketing/MarketingSectionHeader';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import {
  themeBackgroundCardColor,
  themeGlassyBorder,
  themeRadialGlowBackground,
} from '~/components/ui/theme';

type PortfolioFeature = {
  description: string;
  imgSrc: string;
  key: string;
  title: string;
};

function usePortfolioFeatures(): Array<PortfolioFeature> {
  const intl = useIntl();
  const { colorScheme } = useColorSchemePreferences();

  return useMemo(
    () => [
      {
        description: intl.formatMessage({
          defaultMessage:
            'Every project challenge was designed by senior UI/UX designers with perfect spacing units and design rules, so that your portfolio projects will always look professional.',
          description:
            "Description of 'Beautiful designs made by high-end designers' feature in Projects marketing page",
          id: 'aTEHV0',
        }),
        imgSrc:
          colorScheme === 'light'
            ? 'img/marketing/projects/beautiful-designs-light.svg'
            : 'img/marketing/projects/beautiful-designs-dark.svg',
        key: 'beautiful-designs',
        title: intl.formatMessage({
          defaultMessage: 'Beautiful designs made by high-end designers',
          description:
            "Title of 'Beautiful designs made by high-end designers' feature in Projects marketing page",
          id: 'oAUXEp',
        }),
      },
      {
        description: intl.formatMessage({
          defaultMessage:
            'Unlike other challenge platforms, all our projects are modular with one other as they are constructed with the same design system. Easily mix and match any component or project you build to craft a unique app.',
          description:
            "Description of 'Personalized projects' feature in Projects marketing page",
          id: 'yw92sr',
        }),
        imgSrc:
          colorScheme === 'light'
            ? 'img/marketing/projects/personalized-projects-light.svg'
            : 'img/marketing/projects/personalized-projects-dark.svg',
        key: 'personalized-projects',
        title: intl.formatMessage({
          defaultMessage:
            'Build personalized projects, instead of the same thing as everyone else',
          description:
            "Title of 'Personalized projects' feature in Projects marketing page",
          id: 'apqdxI',
        }),
      },
      {
        description: intl.formatMessage({
          defaultMessage:
            'Impress recruiters with entire component libraries or design systems built from scratch. Our component tracks cover component from various use cases and industries.',
          description:
            "Description of 'Build entire design systems or component libraries with our Component Tracks' feature in Projects marketing page",
          id: 'EMiuDR',
        }),
        imgSrc:
          colorScheme === 'light'
            ? 'img/marketing/projects/build-entire-component-tracks-light.svg'
            : 'img/marketing/projects/build-entire-component-tracks-dark.svg',
        key: 'build-entire-component-tracks',
        title: intl.formatMessage({
          defaultMessage:
            'Build entire design systems or component libraries with our Component Tracks',
          description:
            "Title of 'Build entire design systems or component libraries with our Component Tracks' feature in Projects marketing page",
          id: 'eDIEUs',
        }),
      },
    ],
    [colorScheme, intl],
  );
}

export default function ProjectsMarketingPortfolioFeatures() {
  const features = usePortfolioFeatures();
  const intl = useIntl();
  const id = useId();

  return (
    <div
      className={clsx(
        'isolate rounded-t-3xl lg:mx-8 lg:rounded-t-[48px]',
        themeRadialGlowBackground,
      )}>
      <Container className="flex flex-col gap-y-16 py-24 lg:gap-y-32 lg:py-32">
        <div className="mx-auto md:max-w-screen-sm lg:max-w-4xl">
          <MarketingSectionHeader
            heading={
              <FormattedMessage
                defaultMessage="Our projects are designed to make for an <emph>impressive</emph> portfolio, even for seniors"
                description="Heading of the 'Portfolio features' marketing section on Projects home page"
                id="7u1etJ"
                values={{
                  emph: (chunks) => <i>{chunks}</i>,
                }}
              />
            }
            title={
              <FormattedMessage
                defaultMessage="For learning"
                description="Title of the 'Portfolio features' marketing section on Projects home page"
                id="GOvIqB"
              />
            }
          />
        </div>
        <Section>
          <ul
            aria-label={intl.formatMessage({
              defaultMessage: 'Learning features',
              description:
                'Learning features of the product in Projects marketing page',
              id: '6H0D7u',
            })}
            className="flex flex-col gap-y-16 lg:gap-y-32">
            {features.map((feature) => (
              <li
                key={feature.key}
                aria-labelledby={`${id}-${feature.key}`}
                className="flex flex-col items-center gap-x-28 gap-y-12 lg:flex-row lg:even:flex-row-reverse">
                <div
                  className={clsx(
                    'aspect-[453/328] h-fit w-full max-w-[453px] shrink-0 rounded-lg lg:w-auto',
                    themeBackgroundCardColor,
                    themeGlassyBorder,
                  )}>
                  <Image
                    alt=""
                    className="size-full"
                    height={328}
                    src={feature.imgSrc}
                    width={453}
                  />
                </div>
                <div className="flex flex-col">
                  <Heading
                    className="mb-4"
                    id={`${id}-${feature.key}`}
                    level="heading4">
                    {feature.title}
                  </Heading>
                  <Section>
                    <Text color="secondary">{feature.description}</Text>
                  </Section>
                </div>
              </li>
            ))}
          </ul>
        </Section>
      </Container>
    </div>
  );
}
