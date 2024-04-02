'use client';

import { useIntl } from 'react-intl';

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
import {
  purchaseDiscounts,
  purchaseIssues,
  purchaseLifetimeAccess,
  purchaseLifetimeExpensive,
  purchaseOptions,
  purchaseRefund,
  purchaseSubscriptionCancel,
  purchaseSubscriptionCancelled,
  purchaseSubscriptionRenew,
} from '~/data/faqs/PurchaseFAQs';
import { supportHow, supportTechnical } from '~/data/faqs/SupportFAQs';

import MarketingFAQSection from '~/components/marketing/faqs/MarketingFAQSection';
import Container from '~/components/ui/Container';
import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

const generalFaqs: FAQItems = [
  generalTarget,
  generalBuying,
  generalUnique,
  generalWhatsIncluded,
  generalFreeUpdates,
  generalWorthIt,
  generalSeniority,
];

const purchaseFaqs: FAQItems = [
  purchaseOptions,
  purchaseLifetimeAccess,
  purchaseLifetimeExpensive,
  purchaseDiscounts,
  purchaseRefund,
  purchaseSubscriptionRenew,
  purchaseSubscriptionCancel,
  purchaseSubscriptionCancelled,
  purchaseIssues,
];

const supportFaqs: FAQItems = [supportTechnical, supportHow];

export default function FAQPage() {
  const intl = useIntl();

  return (
    <Container className="my-20 flex flex-col gap-y-8" variant="4xl">
      <Heading level="heading2">FAQs</Heading>
      <Divider />
      <Section>
        <MarketingFAQSection
          faqs={generalFaqs}
          title={intl.formatMessage({
            defaultMessage: 'General',
            description: 'Title for FAQ section',
            id: 'FRg+qa',
          })}
        />
        <Divider />
        <MarketingFAQSection
          faqs={purchaseFaqs}
          title={intl.formatMessage({
            defaultMessage: 'Purchase',
            description: 'Title for FAQ section',
            id: 'UWucPu',
          })}
        />
        <Divider />
        <MarketingFAQSection
          faqs={supportFaqs}
          title={intl.formatMessage({
            defaultMessage: 'Support',
            description: 'Title for FAQ section',
            id: '2SDdF5',
          })}
        />
      </Section>
    </Container>
  );
}