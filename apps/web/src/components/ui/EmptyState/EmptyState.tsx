import clsx from 'clsx';
import {
  RiCheckboxCircleLine,
  RiCodeBoxLine,
  RiEmotionSadLine,
  RiFlaskLine,
  RiGhost2Line,
  RiLockLine,
  RiLoginBoxLine,
  RiLogoutBoxLine,
  RiToolsLine,
} from 'react-icons/ri';

import Heading from '../Heading';
import Section from '../Heading/HeadingContext';
import type { TextSize } from '../Text';
import Text, { textVariants } from '../Text';
import {
  themeTextDangerColor,
  themeTextSecondaryColor,
  themeTextSuccessColor,
} from '../theme';

type EmptyStateVariant =
  | 'editor_loading'
  | 'empty'
  | 'error'
  | 'exit'
  | 'login'
  | 'not_subscribed'
  | 'success'
  | 'tests_loading'
  | 'under_construction';

type EmptyStateSize = 'md' | 'sm';

type Props = Readonly<{
  action?: React.ReactNode;
  icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
  iconClassName?: string;
  size?: EmptyStateSize;
  subtitle?: React.ReactNode;
  title: React.ReactNode;
  variant?: EmptyStateVariant;
}>;

const sizes: Record<
  EmptyStateSize,
  Readonly<{
    subtitle: TextSize;
    title: TextSize;
  }>
> = {
  md: {
    subtitle: 'body2',
    title: 'body1',
  },
  sm: {
    subtitle: 'body3',
    title: 'body2',
  },
};

const icons: Record<
  EmptyStateVariant,
  (props: React.ComponentProps<'svg'>) => JSX.Element
> = {
  editor_loading: RiCodeBoxLine,
  empty: RiGhost2Line,
  error: RiEmotionSadLine,
  exit: RiLogoutBoxLine,
  login: RiLoginBoxLine,
  not_subscribed: RiLockLine,
  success: RiCheckboxCircleLine,
  tests_loading: RiFlaskLine,
  under_construction: RiToolsLine,
};
const colors: Record<EmptyStateVariant, string> = {
  editor_loading: themeTextSecondaryColor,
  empty: themeTextSecondaryColor,
  error: themeTextDangerColor,
  exit: themeTextSecondaryColor,
  login: themeTextSecondaryColor,
  not_subscribed: themeTextSecondaryColor,
  success: themeTextSuccessColor,
  tests_loading: themeTextSecondaryColor,
  under_construction: themeTextSecondaryColor,
};

export default function EmptyState({
  action,
  icon,
  iconClassName,
  subtitle,
  size = 'md',
  title,
  variant = 'empty',
}: Props) {
  const Icon = icon ?? icons[variant];
  const { title: titleSize, subtitle: subtitleSize } = sizes[size];

  return (
    <div className="mx-auto max-w-md py-6 text-center sm:py-12">
      <Icon
        aria-hidden="true"
        className={clsx(
          'size-10 mx-auto shrink-0',
          iconClassName,
          colors[variant],
        )}
      />
      <Heading
        className={textVariants({
          className: 'mt-4 block',
          size: titleSize,
          weight: 'medium',
        })}
        level="custom">
        {title}
      </Heading>
      <Section>
        {subtitle && (
          <Text className="mt-1 block" color="secondary" size={subtitleSize}>
            {subtitle}
          </Text>
        )}
        {action && <div className="mt-6">{action}</div>}
      </Section>
    </div>
  );
}
