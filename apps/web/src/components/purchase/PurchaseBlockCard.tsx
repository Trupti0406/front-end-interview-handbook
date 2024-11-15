import clsx from 'clsx';
import React, { useId } from 'react';
import { FaCheck } from 'react-icons/fa6';

import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text, { textVariants } from '~/components/ui/Text';
import {
  themeBackgroundColor,
  themeBorderEmphasizeColor,
  themeTextSuccessColor,
  themeWhiteGlowCardBackground,
} from '~/components/ui/theme';

type Props = Readonly<{
  className?: string;
  features: ReadonlyArray<React.ReactNode>;
  footer?: React.ReactNode;
  leftSectionContents: React.ReactNode;
  subtitle: React.ReactNode;
  title: React.ReactNode;
}>;

export default function PurchaseBlockCard({
  footer,
  title,
  subtitle,
  features,
  leftSectionContents,
  className,
}: Props) {
  const id = useId();

  return (
    <div
      className={clsx(
        'relative isolate overflow-hidden',
        'rounded-xl',
        'mx-auto w-full max-w-xl md:max-w-none',
        themeBackgroundColor,
        ['border', themeBorderEmphasizeColor],
        [
          themeWhiteGlowCardBackground,
          'before:-top-[150px] before:left-1/2 before:h-[180px] before:w-[680px] before:-translate-x-1/2',
        ],
      )}>
      <div
        className={clsx(
          'relative z-10',
          'flex flex-col gap-x-8 gap-y-10 md:flex-row lg:items-stretch',
          'w-full',
          'rounded-[inherit]',
          'p-6',
          className,
        )}>
        <div
          className={clsx(
            'flex flex-col gap-y-6 lg:flex-1',
            'min-w-[240px] lg:min-w-[300px] xl:max-w-[350px]',
          )}>
          <div className="flex flex-col gap-y-2">
            <Heading
              className={textVariants({
                color: 'default',
                size: 'body2',
              })}
              color="custom"
              id={id}
              level="custom"
              weight="medium">
              {title}
            </Heading>
          </div>
          <Section>
            <div
              className={clsx(
                'lg:flex lg:shrink-0 lg:flex-col lg:justify-center',
              )}>
              {leftSectionContents}
            </div>
          </Section>
        </div>
        <Divider className="md:hidden" direction="horizontal" />
        <Divider className="hidden md:block" direction="vertical" />
        <Section>
          <div className="flex flex-1 grow flex-col justify-center gap-4">
            <Text
              className="block text-sm xl:text-base"
              size="inherit"
              weight="bold">
              {subtitle}
            </Text>
            <ul className="flex flex-col gap-y-2 lg:gap-y-4" role="list">
              {features.map((feature, idx) => (
                <li
                  // eslint-disable-next-line react/no-array-index-key
                  key={idx}
                  className="flex items-start lg:col-span-1">
                  <FaCheck
                    aria-hidden="true"
                    className={clsx('size-4 shrink-0', themeTextSuccessColor)}
                  />
                  <Text
                    className="ml-2 block text-xs md:text-sm"
                    color="secondary"
                    size="inherit">
                    {feature}
                  </Text>
                </li>
              ))}
            </ul>
            {footer && <div>{footer}</div>}
          </div>
        </Section>
      </div>
    </div>
  );
}
