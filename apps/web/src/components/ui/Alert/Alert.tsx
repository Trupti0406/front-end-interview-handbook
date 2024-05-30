import clsx from 'clsx';
import type { ReactNode } from 'react';
import {
  RiCheckboxCircleFill,
  RiCloseCircleFill,
  RiErrorWarningFill,
  RiInformationFill,
  RiStarFill,
} from 'react-icons/ri';

import {
  themeBorderBrandColor,
  themeBorderElementColor,
  themeTextBrandColor,
  themeTextColor,
  themeTextSuccessColor,
  themeTextWarningColor,
} from '~/components/ui/theme';

import Heading from '../Heading';
import Section from '../Heading/HeadingContext';
import Text, { textVariants } from '../Text';

type AlertVariant =
  | 'danger'
  | 'info'
  | 'neutral'
  | 'primary'
  | 'special'
  | 'success'
  | 'warning';

type Props = Readonly<{
  bodySize?: React.ComponentProps<typeof Text>['size'];
  borderClass?: string;
  children: ReactNode;
  icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
  title?: string;
  variant: AlertVariant;
}>;

const classes: Record<
  AlertVariant,
  Readonly<{
    backgroundClass: string;
    borderClass?: string;
    icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
    iconClass: string;
    titleClass: string;
  }>
> = {
  danger: {
    backgroundClass: 'bg-danger-lighter dark:bg-neutral-800/70',
    icon: RiCloseCircleFill,
    iconClass: 'text-danger',
    titleClass: 'text-danger',
  },
  info: {
    backgroundClass: 'bg-info-lighter dark:bg-neutral-800/70',
    icon: RiInformationFill,
    iconClass: 'text-info',
    titleClass: 'text-info',
  },
  neutral: {
    backgroundClass: 'bg-neutral-100 dark:bg-neutral-800/70',
    iconClass: themeTextColor,
    titleClass: themeTextColor,
  },
  primary: {
    backgroundClass: 'bg-brand-lighter dark:bg-neutral-800/70',
    icon: RiStarFill,
    iconClass: themeTextBrandColor,
    titleClass: themeTextBrandColor,
  },
  special: {
    backgroundClass: 'bg-white dark:bg-neutral-800/70',
    borderClass: clsx(
      ['border', themeBorderBrandColor],
      'shadow-glow shadow-brand/40',
    ),
    icon: RiStarFill,
    iconClass: themeTextColor,
    titleClass: themeTextColor,
  },
  success: {
    backgroundClass: 'bg-success-lightest dark:bg-neutral-800/70',
    icon: RiCheckboxCircleFill,
    iconClass: themeTextSuccessColor,
    titleClass: themeTextSuccessColor,
  },
  warning: {
    backgroundClass: 'bg-warning-lighter dark:bg-neutral-800/70',
    icon: RiErrorWarningFill,
    iconClass: themeTextWarningColor,
    titleClass: themeTextWarningColor,
  },
};

export default function Alert({
  borderClass: borderClassProp,
  children,
  bodySize = 'body2',
  icon: IconProp,
  title,
  variant,
}: Props) {
  const {
    backgroundClass,
    borderClass: variantBorderClass,
    iconClass,
    titleClass,
    icon: VariantIcon,
  } = classes[variant];

  const borderClass = borderClassProp || variantBorderClass;
  const Icon = IconProp ?? VariantIcon;

  return (
    <div
      className={clsx(
        'relative',
        'flex gap-x-2',
        'rounded-lg p-4',
        backgroundClass,
        borderClass,
      )}
      role="alert">
      {Icon && (
        <Icon
          aria-hidden="true"
          className={clsx('size-5 mt-0.5 shrink-0', iconClass)}
        />
      )}
      <div className="grid gap-y-1">
        {title && (
          <Heading
            className={textVariants({
              className: titleClass,
              color: 'inherit',
              size: bodySize,
              weight: 'bold',
            })}
            color="custom"
            level="custom">
            {title}
          </Heading>
        )}
        <Section>
          <Text className="block" color="secondary" size={bodySize}>
            {children}
          </Text>
        </Section>
      </div>
    </div>
  );
}
