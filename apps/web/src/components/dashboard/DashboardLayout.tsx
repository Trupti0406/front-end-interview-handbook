'use client';

import clsx from 'clsx';
import { useSelectedLayoutSegment } from 'next/navigation';
import type { ReactNode } from 'react';
import { useEffect, useRef } from 'react';

import { trpc } from '~/hooks/trpc';
import useScrollIntoView from '~/hooks/useScrollIntoView';

import type { PreparationArea } from '~/data/PreparationAreas';

import DashboardFeaturedFocusAreas from '~/components/dashboard/DashboardFeaturedFocusAreas';
import DashboardOnboarding from '~/components/dashboard/DashboardOnboarding';
import DashboardOverallCompletionProgress from '~/components/dashboard/DashboardOverallCompletionProgress';
import DashboardPageHeader from '~/components/dashboard/DashboardPageHeader';
import { useUserProfile } from '~/components/global/UserProfileProvider';
import QuestionsPreparationTabs from '~/components/questions/listings/filters/QuestionsPreparationTabs';
import Container from '~/components/ui/Container';
import Section from '~/components/ui/Heading/HeadingContext';

import type { QuestionTotalAvailableCount } from '~/db/QuestionsListReader';
import { useI18nPathname } from '~/next-i18nostic/src';

import DashboardContinueLearningWithFetching from './DashboardContinueLearningWithFetching';

type Props = Readonly<{
  children: ReactNode;
  questionTotalAvailableCount: QuestionTotalAvailableCount;
}>;

export default function DashboardLayout({
  children,
  questionTotalAvailableCount,
}: Props) {
  const { pathname } = useI18nPathname();
  const tabsRef = useRef<HTMLDivElement>(null);
  const routeSegment = useSelectedLayoutSegment();
  const resultSegment = routeSegment ?? 'coding';
  const { userProfile } = useUserProfile();
  const { data: questionListSessions } =
    trpc.questionLists.getActiveSessions.useQuery();

  const showContinueLearning =
    questionListSessions != null && questionListSessions.length > 0;

  useEffect(() => {
    if (routeSegment == null || pathname === '/prepare') {
      return;
    }

    if (
      tabsRef?.current?.offsetTop &&
      // Only scroll if tab contents are not clearly in view.
      Math.abs(window.scrollY - tabsRef?.current?.offsetTop) < 100
    ) {
      return;
    }

    setTimeout(() => {
      window.scrollTo({
        behavior: 'smooth',
        left: 0,
        top: tabsRef?.current?.offsetTop,
      });
    }, 300);
  }, [pathname, routeSegment]);

  return (
    <Container
      className={clsx(
        'flex flex-col',
        'py-6 lg:py-8',
        'gap-y-8 md:gap-y-10 2xl:gap-y-12',
        // Workaround to make inner contents always 1080px on >= lg screens
        'lg:!max-w-[calc(1080px_+_4rem)] xl:!max-w-[calc(1080px_+_7.5rem)]',
      )}>
      <Section>
        <div className="flex flex-col gap-y-6">
          <DashboardPageHeader />
          {userProfile ? (
            <DashboardOverallCompletionProgress
              questionTotalAvailableCount={questionTotalAvailableCount}
            />
          ) : (
            <DashboardOnboarding />
          )}
        </div>
        <div
          className={clsx(
            'grid gap-6',
            showContinueLearning && 'lg:grid-cols-2',
          )}>
          {showContinueLearning && questionListSessions != null && (
            <DashboardContinueLearningWithFetching
              items={questionListSessions.map((session) => ({
                completedCount: session._count.progress,
                listKey: session.key,
              }))}
            />
          )}
          <DashboardFeaturedFocusAreas limit={showContinueLearning ? 4 : 8} />
        </div>
        <div ref={tabsRef}>
          <QuestionsPreparationTabs area={resultSegment as PreparationArea} />
        </div>
        {children}
      </Section>
    </Container>
  );
}
