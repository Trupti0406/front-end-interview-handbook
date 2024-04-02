import clsx from 'clsx';
import { FormattedMessage, useIntl } from 'react-intl';

import type { FAQItems } from '~/data/faqs/FAQs';
import {
  generalBuying,
  generalFreeUpdates,
  generalSeniority,
  generalTarget,
  generalUnique,
  generalWhatsIncluded,
  generalWorthIt,
} from '~/data/faqs/GeneralFAQs';

import Anchor from '~/components/ui/Anchor';
import Container from '~/components/ui/Container';
import Section from '~/components/ui/Heading/HeadingContext';

import MarketingFAQSection from '../../marketing/faqs/MarketingFAQSection';
import MarketingSectionHeader from '../../marketing/MarketingSectionHeader';

const generalFaqs: FAQItems = [
  generalTarget,
  generalBuying,
  generalUnique,
  generalWhatsIncluded,
  generalFreeUpdates,
  generalWorthIt,
  generalSeniority,
];

export default function MarketingGeneralFAQSection() {
  const intl = useIntl();

  return (
    <Container
      className={clsx(
        'relative isolate flex flex-col gap-y-12',
        'py-24 lg:py-32',
        'max-lg:theme-bg-radial-glow max-lg:rounded-t-3xl',
      )}
      variant="narrow">
      <MarketingSectionHeader
        description={
          <FormattedMessage
            defaultMessage="Can't find the answer you are looking for? View all <link>frequently-asked questions</link>."
            description="Subtitle of Homepage's FAQ section, encouraging users to contact us if none of the FAQs resolve their problems"
            id="yWnRZS"
            values={{
              link: (chunks) => (
                <Anchor
                  className="whitespace-nowrap"
                  href="/faq"
                  weight="medium">
                  {chunks}
                </Anchor>
              ),
            }}
          />
        }
        heading={
          <FormattedMessage
            defaultMessage="FAQs"
            description="Frequently Asked Questions"
            id="DIs2lU"
          />
        }
      />
      <Section>
        <div className="flex flex-col gap-y-6">
          <MarketingFAQSection
            faqs={generalFaqs}
            hideTitle={true}
            title={intl.formatMessage({
              defaultMessage: 'General',
              description: 'Title for FAQ section',
              id: 'FRg+qa',
            })}
          />
        </div>
      </Section>
    </Container>
  );
}