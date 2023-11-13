'use client';

import { useInView } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useRef } from 'react';

import ProjectsMarketingHero from '~/components/projects/marketing/ProjectsMarketingHero';
import Section from '~/components/ui/Heading/HeadingContext';

const MarketingHomePageBottom = dynamic(
  () => import('../MarketingHomePageBottom'),
  { ssr: false },
);

export default function MarketingHomePage() {
  const loadBottomHalfMarkerRef = useRef(null);
  const showBottomHalf = useInView(loadBottomHalfMarkerRef, {
    amount: 'some',
    once: true,
  });

  return (
    <main className="bg-[#070708] pb-24" data-mode="dark">
      <ProjectsMarketingHero />
      <Section>
        <div ref={loadBottomHalfMarkerRef} />
        {showBottomHalf && <MarketingHomePageBottom />}
      </Section>
    </main>
  );
}
