import 'server-only';

import type { Metadata } from 'next/types';
import { i18nMetadata } from 'next-i18nostic';

import { getSiteUrl } from './siteUrl';

type PageMetadata = Readonly<{
  description?: string;
  pathname: string;
  title: string;
}>;

export default function defaultMetadata({
  description,
  pathname,
  title,
}: PageMetadata): Metadata {
  return i18nMetadata({
    alternates: {
      canonical: pathname,
    },
    description,
    metadataBase: new URL(getSiteUrl()),
    openGraph: {
      description,
      images: '/img/seo/og.jpg',
      // TODO: i18n
      locale: 'en-US',
      siteName: 'GreatFrontEnd',
      title,
      type: 'website',
      url: pathname,
    },
    title: {
      default: title,
      template: '%s | GreatFrontEnd',
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@greatfrontend',
      description,
      images: '/img/seo/og.jpg',
      site: '@greatfrontend',
      title,
    },
  });
}
