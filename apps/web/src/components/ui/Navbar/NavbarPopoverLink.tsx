import clsx from 'clsx';
import { RiArrowRightLine } from 'react-icons/ri';

import Anchor from '~/components/ui/Anchor';
import {
  themeBackgroundElementEmphasizedStateColor_Hover,
  themeBorderEmphasizeColor_Hover,
  themeOutlineElement_FocusVisible,
  themeOutlineElementBrandColor_FocusVisible,
  themeTextSubtleColor,
} from '~/components/ui/theme';

import NavbarFeatureIcon from './NavbarFeatureIcon';
import type { NavPopoverLinkItem } from './NavTypes';
import Text from '../Text';

export default function NavbarPopoverLink({
  label,
  href,
  onClick,
  sublabel,
  labelAddon,
  bottomEl,
  ...props
}: NavPopoverLinkItem) {
  const el = (
    <div
      className={clsx(
        'w-full',
        'group',
        'p-3',
        'flex items-center gap-4',
        'rounded-md',
        'transition-colors',
        themeBackgroundElementEmphasizedStateColor_Hover,
        ['border border-transparent', themeBorderEmphasizeColor_Hover],
      )}>
      <NavbarFeatureIcon {...props} />
      <div className={clsx('flex grow flex-col justify-center')}>
        <Text className="flex items-center gap-2" size="body2" weight="bold">
          <span className="shrink-0">{label}</span> {labelAddon}
        </Text>
        {sublabel && (
          <Text className="mt-1 block" color="secondary" size="body3">
            {sublabel}
          </Text>
        )}
        {bottomEl && <div className="mt-2">{bottomEl}</div>}
      </div>
      <RiArrowRightLine
        aria-hidden={true}
        className={clsx('size-5 shrink-0', themeTextSubtleColor)}
      />
    </div>
  );

  const className = clsx(
    'group flex grow',
    themeOutlineElement_FocusVisible,
    themeOutlineElementBrandColor_FocusVisible,
  );

  if (href == null) {
    return <div className={className}>{el}</div>;
  }

  return (
    <Anchor
      className={className}
      href={href}
      prefetch={null}
      suppressHydrationWarning={true}
      variant="unstyled"
      onClick={onClick}>
      {el}
    </Anchor>
  );
}