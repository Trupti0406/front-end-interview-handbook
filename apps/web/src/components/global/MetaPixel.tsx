'use client';

import Script from 'next/script';
import { useI18nPathname } from 'next-i18nostic';
import { useEffect } from 'react';

import fbq from '~/lib/fbq';

export default function MetaPixel() {
  const { pathname } = useI18nPathname();

  useEffect(() => {
    if (pathname == null) {
      return;
    }

    fbq.pageview();
  }, [pathname]);

  return (
    <>
      <Script
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', ${fbq.pixelID});
          `,
        }}
        id="fb-pixel"
        strategy="afterInteractive"
      />
      <noscript>
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img
          height="1"
          src={`https://www.facebook.com/tr?id=${fbq.pixelID}&ev=PageView&noscript=1`}
          style={{ display: 'none' }}
          width="1"
        />
      </noscript>
    </>
  );
}
