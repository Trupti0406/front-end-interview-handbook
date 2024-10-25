import clsx from 'clsx';
import {
  RiContractLeftLine,
  RiContractRightLine,
  RiDiscordLine,
  RiLinkedinFill,
  RiMoreLine,
  RiPhoneLine,
  RiScales3Line,
} from 'react-icons/ri';

import { SocialLinks } from '~/data/SocialLinks';

import SidebarLinkItem_DEPRECATED from '~/components/global/sidebar/SidebarLinkItem_DEPRECATED';
import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Divider from '~/components/ui/Divider';
import DropdownMenu from '~/components/ui/DropdownMenu';
import type { NavbarTopLevelItem } from '~/components/ui/Navbar/NavTypes';

import SidebarAuthDropdownItem from './SidebarAuthDropdownItem';
import SidebarColorSchemeSubMenu from './SidebarColorSchemeSubMenu';
import NavProductDropdownMenu_DEPRECATED from '../navbar/NavProductDropdownMenu_DEPRECATED';

export type SidebarItem = NavbarTopLevelItem;

export type SidebarItems = ReadonlyArray<NavbarTopLevelItem>;

export function SidebarCollapsed({
  moreMenuItems,
  topAddonElements,
  sidebarItems,
  onCollapseClick,
  showPremiumDiscord,
  product,
  notificationItem,
}: Readonly<{
  moreMenuItems: React.ReactElement | false | null | undefined;
  notificationItem?: React.ReactElement | false | null | undefined;
  onCollapseClick: () => void;
  product: React.ComponentProps<
    typeof NavProductDropdownMenu_DEPRECATED
  >['product'];
  showPremiumDiscord: boolean;
  sidebarItems: SidebarItems;
  topAddonElements?: React.ReactNode;
}>) {
  const intl = useIntl();
  const startItems = sidebarItems.filter((item) => item.position === 'start');
  const endItems = sidebarItems.filter((item) => item.position === 'end');

  return (
    <nav
      className={clsx(
        'flex flex-col items-center gap-y-4',
        'relative h-full',
        'px-3 py-4',
      )}>
      <NavProductDropdownMenu_DEPRECATED product={product} variant="compact" />
      {topAddonElements}
      <ul className="flex grow flex-col gap-1">
        {startItems.map((item) => (
          <li key={item.itemKey}>
            <SidebarLinkItem_DEPRECATED isLabelHidden={true} {...item} />
          </li>
        ))}
      </ul>
      {endItems.length > 0 && (
        <>
          <Divider className="w-full" />
          <ul className="flex flex-col gap-1">
            {endItems.map((item) => (
              <li key={item.itemKey}>
                <SidebarLinkItem_DEPRECATED isLabelHidden={true} {...item} />
              </li>
            ))}
          </ul>
        </>
      )}
      <Divider className="w-full" />
      <div className="flex flex-col items-center gap-6">
        {notificationItem}
        <div className="flex flex-col items-center gap-4">
          <DropdownMenu
            align="end"
            icon={RiMoreLine}
            isLabelHidden={true}
            label="More"
            showChevron={false}
            side="right"
            size="sm">
            <SidebarColorSchemeSubMenu />
            {moreMenuItems}
            <Divider />
            <DropdownMenu.Item
              href={SocialLinks.linkedin.href}
              icon={RiLinkedinFill}
              label="LinkedIn"
            />
            {showPremiumDiscord ? (
              <DropdownMenu.Item
                color="active"
                href={SocialLinks.discordPremium.href}
                icon={RiDiscordLine}
                label={intl.formatMessage({
                  defaultMessage: 'Premium Discord',
                  description: 'Link to the premium Discord server',
                  id: 'gvLQbK',
                })}
              />
            ) : (
              <DropdownMenu.Item
                href={SocialLinks.discord.href}
                icon={RiDiscordLine}
                label="Discord"
              />
            )}
            <Divider />
            <SidebarAuthDropdownItem />
          </DropdownMenu>
        </div>
        <Button
          icon={RiContractRightLine}
          isLabelHidden={true}
          label="Expand sidebar"
          size="sm"
          tooltip={intl.formatMessage({
            defaultMessage: 'Expand sidebar',
            description: 'Tooltip for expand sidebar',
            id: 'HGXwui',
          })}
          tooltipSide="right"
          variant="secondary"
          onClick={onCollapseClick}
        />
      </div>
    </nav>
  );
}

export function SidebarExpanded({
  renderTopAddonElements,
  renderBottomAddonElements,
  isLoading,
  isViewerPremium,
  moreMenuItems,
  sidebarItems,
  onCollapseClick,
  bottomBarItems,
  notificationItem,
  product,
}: Readonly<{
  bottomBarItems?: React.ReactElement | false | null | undefined;
  isLoading: boolean;
  isViewerPremium: boolean;
  moreMenuItems: React.ReactElement | false | null | undefined;
  notificationItem?: React.ReactElement | false | null | undefined;
  onCollapseClick?: () => void;
  product: React.ComponentProps<
    typeof NavProductDropdownMenu_DEPRECATED
  >['product'];
  renderBottomAddonElements?: (fadeInClassname: string) => React.ReactNode;
  renderTopAddonElements?: (fadeInClassname: string) => React.ReactNode;
  sidebarItems: SidebarItems;
}>) {
  const intl = useIntl();
  const fadeInClass = clsx(
    'transition-opacity duration-500',
    isLoading && 'select-none opacity-0',
  );
  const startItems = sidebarItems.filter((item) => item.position === 'start');
  const endItems = sidebarItems.filter((item) => item.position === 'end');

  return (
    <nav className={clsx('flex flex-col gap-y-4', 'relative h-full p-4')}>
      <NavProductDropdownMenu_DEPRECATED product={product} variant="full" />
      {renderTopAddonElements?.(fadeInClass)}
      <ul className={clsx('flex grow flex-col gap-2', fadeInClass)}>
        {startItems.map((item) => (
          <li key={item.itemKey}>
            <SidebarLinkItem_DEPRECATED {...item} />
          </li>
        ))}
      </ul>
      <div className={clsx('flex flex-col gap-y-4', fadeInClass)}>
        {endItems.length > 0 && (
          <>
            <Divider />
            <ul className="flex flex-col gap-2">
              {endItems.map((item) => (
                <li key={item.itemKey}>
                  <SidebarLinkItem_DEPRECATED {...item} />
                </li>
              ))}
            </ul>
          </>
        )}
        {renderBottomAddonElements?.(fadeInClass)}
        <Divider />
      </div>
      <div className="flex justify-between gap-4">
        <div className="flex gap-4">
          {notificationItem}
          {isViewerPremium ? (
            <Button
              href={SocialLinks.discordPremium.href}
              icon={RiDiscordLine}
              isLabelHidden={true}
              label={intl.formatMessage({
                defaultMessage: 'Premium Discord',
                description: 'Link to the premium Discord server',
                id: 'gvLQbK',
              })}
              size="sm"
              tooltip={intl.formatMessage({
                defaultMessage: 'Join Discord (premium)',
                description: 'Tooltip for join premium discord',
                id: 'XG1Wfg',
              })}
              variant="special"
            />
          ) : (
            <Button
              href={SocialLinks.discord.href}
              icon={RiDiscordLine}
              isLabelHidden={true}
              label="Discord"
              size="sm"
              tooltip={intl.formatMessage({
                defaultMessage: 'Join Discord channel (public)',
                description: 'Link to the Discord server',
                id: 'OchGBW',
              })}
              variant="secondary"
            />
          )}
          {bottomBarItems}
          <DropdownMenu
            icon={RiMoreLine}
            isLabelHidden={true}
            label="More"
            showChevron={false}
            size="sm">
            <SidebarColorSchemeSubMenu />
            {moreMenuItems}
            <DropdownMenu.Item
              href="/contact"
              icon={RiPhoneLine}
              label={intl.formatMessage({
                defaultMessage: 'Contact us',
                description: 'Link to contact page',
                id: 'dRUyU9',
              })}
            />
            <DropdownMenu.Sub
              icon={RiScales3Line}
              label={intl.formatMessage({
                defaultMessage: 'Legal',
                description: 'Link to legal page',
                id: 'J7b0BM',
              })}>
              <DropdownMenu.Item
                href="/legal/privacy-policy"
                label={intl.formatMessage({
                  defaultMessage: 'Privacy policy',
                  description: 'Link to privacy policy page',
                  id: 'RxU5TE',
                })}
              />
              <DropdownMenu.Item
                href="/legal/terms"
                label={intl.formatMessage({
                  defaultMessage: 'Terms of service',
                  description: 'Link to terms of service page',
                  id: 'WYR3gj',
                })}
              />
            </DropdownMenu.Sub>
            <Divider />
            <SidebarAuthDropdownItem />
          </DropdownMenu>
        </div>
        {onCollapseClick && (
          <Button
            icon={RiContractLeftLine}
            isLabelHidden={true}
            label="Collapse"
            size="sm"
            tooltip={intl.formatMessage({
              defaultMessage: 'Collapse sidebar',
              description: 'Tooltip for collapse sidebar',
              id: '/vo5j8',
            })}
            variant="secondary"
            onClick={onCollapseClick}
          />
        )}
      </div>
    </nav>
  );
}