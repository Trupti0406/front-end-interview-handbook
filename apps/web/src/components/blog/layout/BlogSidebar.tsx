import clsx from 'clsx';
import { type ReactNode } from 'react';
import {
  RiArrowDownSLine,
  RiHome3Line,
  RiTerminalWindowLine,
} from 'react-icons/ri';
import { useIntl } from 'react-intl';

import Anchor from '~/components/ui/Anchor';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import {
  themeBorderColor,
  themeTextBrandColor,
  themeTextBrandHoverColor,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

import { buildNavigationTree } from '~/contentlayer/utils';
import { useI18nPathname } from '~/next-i18nostic/src';

export type BlogSeriesNavigationLink<T = Record<string, unknown>> = Readonly<
  T & {
    description?: string;
    href: string;
    slug: string;
    title: string;
  }
>;

type BlogSeriesNavigationLinks<
  T extends BlogSeriesNavigationLink = BlogSeriesNavigationLink,
> = ReadonlyArray<T>;

type BlogSeriesNavigationItems<
  T extends BlogSeriesNavigationLink = BlogSeriesNavigationLink,
> = ReadonlyArray<
  Readonly<{
    links: BlogSeriesNavigationLinks<T>;
    title: string;
  }>
>;
type BlogSidebarSeries = BlogSidebarItem &
  Readonly<{
    href: string;
    items: BlogSeriesNavigationItems;
    type: 'series';
  }>;

type BlogSidebarItem = Readonly<{
  currentMatchRegex?: RegExp;
  icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
  key: string;
  labelAddon?: ReactNode;
  name: string;
}>;

type BlogSidebarLink = BlogSidebarItem &
  Readonly<{
    href: string;
    type: 'link';
  }>;

function useBlogSidebarNavigation() {
  const intl = useIntl();
  const navigationTree = buildNavigationTree();

  const navigation: ReadonlyArray<BlogSidebarLink | BlogSidebarSeries> = [
    {
      currentMatchRegex: /\/blog$/,
      href: '/blog',
      icon: RiHome3Line,
      key: 'blog',
      name: intl.formatMessage({
        defaultMessage: 'Home',
        description: 'Sidebar label for Blog home page',
        id: 'NALiPB',
      }),
      type: 'link',
    },
    {
      currentMatchRegex: /^\/blog\/latest\//,
      href: '/blog/latest',
      icon: RiTerminalWindowLine,
      key: 'new',
      name: intl.formatMessage({
        defaultMessage: "What's new",
        description: "Sidebar label for What's New",
        id: 'iFFbCA',
      }),
      type: 'link',
    },
    {
      currentMatchRegex: /^\/blog\/explore\//,
      href: '/blog/explore',
      items: navigationTree,
      key: 'series',
      name: intl.formatMessage({
        defaultMessage: 'Explore series',
        description: 'Sidebar label for explore series',
        id: 'SsWL2T',
      }),
      type: 'series',
    },
  ];

  return navigation;
}

function SidebarIcon({
  icon: Icon,
}: Readonly<{
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
}>) {
  return <Icon aria-hidden="true" className={clsx('h-5 w-5 shrink-0')} />;
}

function LinksListItem({
  link,
  nestedLevel,
}: Readonly<{
  link: BlogSeriesNavigationLink;
  nestedLevel: number;
}>) {
  const { pathname } = useI18nPathname();

  return (
    <li key={link.href} className="relative text-sm leading-6">
      <div className="flex">
        <Anchor
          className={clsx(
            '-ml-px flex w-full items-center gap-x-2 border-l pl-4',
            !link.items && 'py-1',
            pathname === link.href
              ? clsx(themeTextBrandColor, 'border-current font-semibold')
              : clsx(
                  themeTextSecondaryColor,
                  'border-transparent hover:border-current hover:text-neutral-800 dark:hover:text-white',
                ),
          )}
          href={link.href}
          variant="unstyled">
          <span style={{ paddingLeft: 12 * nestedLevel }}>{link.title}</span>
        </Anchor>
      </div>
    </li>
  );
}

function LinksList({
  items,
  nestedLevel = 0,
}: Readonly<{
  items: BlogSeriesNavigationLinks;
  nestedLevel?: number;
}>) {
  return (
    <ul
      className={clsx(
        'flex flex-col',
        nestedLevel === 0 && ['border-l', themeBorderColor],
      )}
      role="list">
      {items.map((link) => (
        <LinksListItem key={link.href} link={link} nestedLevel={nestedLevel} />
      ))}
    </ul>
  );
}

function SeriesList({
  items,
}: Readonly<{
  items: BlogSeriesNavigationItems;
}>) {
  return (
    <ul
      className="flex grow flex-col gap-y-2 overflow-y-auto px-2 pb-3"
      role="list">
      {items.map((series) => (
        <li key={series.title}>
          <Heading
            className="mb-3 text-sm font-semibold leading-6"
            level="custom">
            {series.title}
          </Heading>
          <Section>
            <LinksList items={series.links} />
          </Section>
        </li>
      ))}
    </ul>
  );
}

export default function BlogSidebar() {
  const { pathname } = useI18nPathname();
  const navigation = useBlogSidebarNavigation();

  return (
    <div className="flex h-full w-full flex-1 grow flex-col justify-between lg:p-4">
      <div className={clsx('grid gap-2')}>
        {navigation.map((item) => {
          const itemClassname = clsx(
            'group flex w-full items-center gap-x-2 rounded text-xs font-medium',
            'p-2',
          );
          const isSeries = item.type === 'series';

          const label = (
            <Text
              className="gap-x-2"
              color="inherit"
              display="flex"
              size="body2"
              weight="medium">
              {item.icon != null && <SidebarIcon icon={item.icon} />}
              {isSeries && <SidebarIcon icon={RiArrowDownSLine} />}
              {item.name}
            </Text>
          );

          const activeClassName = clsx(
            'text-brand-dark dark:text-brand',
            'bg-neutral-100 dark:bg-neutral-800/70',
          );
          const defaultClassName = clsx(
            themeTextSecondaryColor,
            themeTextBrandHoverColor,
          );

          const current =
            pathname === item.href ||
            (pathname != null && item.currentMatchRegex?.test(pathname));

          return (
            <div key={item.name} className="flex flex-col gap-y-2">
              <Anchor
                aria-current={current ? 'page' : undefined}
                aria-label={item.name}
                className={clsx(
                  itemClassname,
                  current ? activeClassName : defaultClassName,
                )}
                href={item.href}
                variant="unstyled">
                {label}
              </Anchor>
              {isSeries && item.items != null && (
                <SeriesList items={item.items} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
