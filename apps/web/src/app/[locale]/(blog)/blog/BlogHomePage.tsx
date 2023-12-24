'use client';

import clsx from 'clsx';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import BlogWhatsNewSection from '~/components/blog/BlogWhatsNewSection';
import BlogMainLayout from '~/components/blog/layout/BlogMainLayout';
import BlogListingSection from '~/components/blog/listing/BlogListingSection';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

export default function BlogHomePage() {
  return (
    <BlogMainLayout>
      <Container
        className={clsx(
          'flex flex-col',
          'py-6 lg:py-8',
          'gap-y-8 md:gap-y-10',
          // Workaround to make inner contents always 1080px on >= lg screens
          'lg:!max-w-[calc(1080px_+_4rem)] xl:!max-w-[calc(1080px_+_7.5rem)]',
        )}
        variant="normal">
        <div className="flex flex-col gap-y-3">
          <Heading level="heading5">
            <FormattedMessage
              defaultMessage="GreatFrontend Blog"
              description="Blog home page title"
              id="CXadMv"
            />
          </Heading>
          <Text
            className={clsx('max-w-3xl')}
            color="secondary"
            display="block"
            size="body2">
            <FormattedMessage
              defaultMessage="Learn new skills, improve your techniques and stay updated on latest front end trends and developments."
              description="Blog home page description"
              id="sUQjXK"
            />
          </Text>
        </div>
        <Section>
          <BlogWhatsNewSection />
        </Section>
        <Section>
          <BlogListingSection />
        </Section>
      </Container>
    </BlogMainLayout>
  );
}
