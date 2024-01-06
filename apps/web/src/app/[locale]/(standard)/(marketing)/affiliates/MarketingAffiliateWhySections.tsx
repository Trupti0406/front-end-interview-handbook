import clsx from 'clsx';
import { useState } from 'react';
import {
  RiArrowRightLine,
  RiCheckLine,
  RiHandCoinLine,
  RiMoneyDollarBoxLine,
  RiThumbUpLine,
} from 'react-icons/ri';

import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import {
  themeChipBackgroundColor,
  themeGlassyBorder,
  themeTextSubtitleColor,
} from '~/components/ui/theme';

import * as Slider from '@radix-ui/react-slider';

const features = [
  'Coding Questions',
  'JavaScript Questions',
  'User Interface Questions',
  'System Design Questions',
  'Quiz Questions',
  'Quality Solutions',
  'React',
  'Vanilla JavaScript',
  'Large Question Pool',
  'Company Tags',
  'Algorithms',
  'Coding Workspace',
  'Difficulty Levels',
];

function ProductSection() {
  return (
    <div className="flex flex-wrap gap-4">
      {features.map((feature) => (
        <div
          key={feature}
          className={clsx(
            'inline-flex items-center gap-1 rounded-lg px-4 py-2',
            'bg-neutral-100 dark:bg-neutral-800/40',
          )}>
          <RiCheckLine
            aria-hidden={true}
            className="text-success -ml-1 h-4 w-4"
          />
          <Text color="secondary" size="body2" weight="medium">
            {feature}
          </Text>
        </div>
      ))}
    </div>
  );
}

function SliderSection() {
  const [sales, setSales] = useState(30);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-2 text-center">
        <Text
          className="flex justify-center gap-2 text-4xl font-bold"
          color="active"
          display="block"
          size="custom"
          weight="bold">
          ${Math.round(0.15 * sales * 99 * 100) / 100}{' '}
          <span className="self-end text-lg font-medium">USD</span>
        </Text>
        <Text className="italic" color="secondary" display="block" size="body2">
          * Based on average order value
        </Text>
      </div>
      <Slider.Root
        className="relative flex h-4 w-full items-center"
        id="weeks"
        max={100}
        min={1}
        step={1}
        value={[sales]}
        onValueChange={([val]) => setSales(val)}>
        <Slider.Track
          className={clsx(
            'flex-grow-1 relative !h-3 w-full rounded-full',
            themeChipBackgroundColor,
          )}>
          <Slider.Range className="bg-brand-dark absolute h-full rounded" />
        </Slider.Track>
        <Slider.Thumb className="bg-brand-dark hover:bg-brand-darker focus:ring-brand-darker block h-8 w-8 rounded-full shadow-sm focus:outline-none focus:ring-4 focus:ring-offset-2" />
      </Slider.Root>
      <Text
        className="mt-8 text-center text-2xl"
        color="secondary"
        display="block"
        size="custom"
        weight="medium">
        {sales} sales
      </Text>
    </div>
  );
}

const reasons = [
  {
    action: {
      href: '/',
      label: 'View all features',
    },
    icon: RiThumbUpLine,
    media: <ProductSection />,
    secondaryAction: {
      href: '/get-started',
      label: 'Try the product',
    },
    subtitle:
      'Our platform has many unique advantages, making it easily recommendable to users looking for front end interview preparation.',
    title: 'A great product worth recommending',
  },
  {
    icon: RiHandCoinLine,
    media: <SliderSection />,
    subtitle:
      'Earn a generous 15% commission on every purchase within 7 days of using your affiliate link. Earn as much as you refer - no limits to payouts, no frills.',
    title: 'Simple 15% commission, no limit',
  },
  {
    icon: RiMoneyDollarBoxLine,
    media: (
      <img
        alt="PayPal logo"
        className="mx-auto max-w-[400px]"
        src="/img/affiliate/paypal-logo.png"
      />
    ),
    subtitle: 'Easily get paid with PayPal at the end of every month.',
    title: 'Regular payouts through PayPal',
  },
];

export default function MarketingAffiliateWhySections() {
  return (
    <div className="relative space-y-16 overflow-hidden">
      {reasons.map((reason) => (
        <div
          key={reason.title}
          className="lg:mx-auto lg:grid lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24">
          <div className="mx-auto lg:col-start-2 lg:mx-0 lg:py-24">
            <div>
              <span
                aria-hidden="true"
                className={clsx(
                  'inline-flex',
                  'rounded-full p-3 dark:bg-neutral-800/70',
                  themeGlassyBorder,
                )}>
                <reason.icon
                  className={clsx(
                    'text-primary h-6 w-6',
                    themeTextSubtitleColor,
                  )}
                />
              </span>
            </div>
            <div className="mt-6">
              <Heading level="heading4">{reason.title}</Heading>
              <Section>
                <Text
                  className="mt-4 text-lg lg:text-xl"
                  color="secondary"
                  display="block"
                  size="custom">
                  {reason.subtitle}
                </Text>
                <div className="mt-12 space-x-4">
                  {reason.action && (
                    <Button
                      href={reason.action.href}
                      icon={RiArrowRightLine}
                      label={reason.action.label}
                      size="md"
                      variant="secondary"
                    />
                  )}
                  {reason.secondaryAction && (
                    <Button
                      href={reason.secondaryAction.href}
                      label={reason.secondaryAction.label}
                      size="md"
                      variant="tertiary"
                    />
                  )}
                </div>
              </Section>
            </div>
          </div>
          <div className="mt-12 self-center sm:mt-16 lg:col-start-1 lg:mt-0">
            {reason.media}
          </div>
        </div>
      ))}
    </div>
  );
}
