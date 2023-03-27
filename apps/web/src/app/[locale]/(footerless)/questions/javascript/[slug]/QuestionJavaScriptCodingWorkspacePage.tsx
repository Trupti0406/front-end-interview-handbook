'use client';

import { useRef, useState } from 'react';

import { useResizablePaneDivider } from '~/hooks/useResizablePaneDivider';

import StatisticsPanel from '~/components/debug/StatisticsPanel';
import QuestionPaneDivider from '~/components/questions/common/QuestionPaneDivider';
import QuestionPaywall from '~/components/questions/common/QuestionPaywall';
import QuestionsListingBreadcrumbs from '~/components/questions/common/QuestionsListingBreadcrumbs';
import type {
  QuestionJavaScript,
  QuestionMetadata,
} from '~/components/questions/common/QuestionsTypes';
import QuestionContentsJavaScript from '~/components/questions/content/QuestionContentsJavaScript';
import JavaScriptWorkspace from '~/components/questions/editor/JavaScriptWorkspace';
import useCodingWorkspaceLayout from '~/components/questions/editor/useCodingWorkspaceLayout';
import QuestionCodingListSlideOut from '~/components/questions/listings/QuestionCodingListSlideOut';
import Button from '~/components/ui/Button';
import Section from '~/components/ui/Heading/HeadingContext';

import { useQueryQuestionProgress } from '~/db/QuestionsProgressClient';
import type { QuestionProgress } from '~/db/QuestionsProgressTypes';

import { ListBulletIcon } from '@heroicons/react/24/outline';

function LeftPane({
  canViewPremiumContent,
  questionProgress,
  isQuestionLocked,
  question,
  serverDuration,
  similarQuestions,
  nextQuestions,
}: Readonly<{
  canViewPremiumContent: boolean;
  isQuestionLocked: boolean;
  nextQuestions: ReadonlyArray<QuestionMetadata>;
  question: QuestionJavaScript;
  questionProgress: QuestionProgress | null;
  serverDuration: number;
  similarQuestions: ReadonlyArray<QuestionMetadata>;
}>) {
  const [showQuestionsSlideOut, setShowQuestionsSlideOut] = useState(false);

  return (
    <div className="flex h-full shrink-0 flex-col">
      <QuestionsListingBreadcrumbs
        links={[
          {
            href: '/questions/js/coding',
            label: 'Coding Questions',
          },
        ]}
      />
      <div className="grow overflow-auto px-4 pb-10 sm:px-6">
        <QuestionContentsJavaScript
          key={question.metadata.slug}
          canViewPremiumContent={canViewPremiumContent}
          hasCompletedQuestion={questionProgress?.status === 'complete'}
          isQuestionLocked={isQuestionLocked}
          nextQuestions={nextQuestions}
          question={question}
          similarQuestions={similarQuestions}
        />
        <StatisticsPanel className="mt-4" serverDuration={serverDuration} />
      </div>
      <div className="flex items-center justify-between border-t border-slate-200 bg-white py-3 px-4 sm:px-6 lg:py-2">
        <Button
          addonPosition="start"
          icon={ListBulletIcon}
          label="All Questions"
          size="sm"
          variant="tertiary"
          onClick={() => setShowQuestionsSlideOut(true)}
        />
      </div>
      <QuestionCodingListSlideOut
        isShown={showQuestionsSlideOut}
        onClose={() => setShowQuestionsSlideOut(false)}
      />
    </div>
  );
}

type Props = Readonly<{
  canViewPremiumContent: boolean;
  isQuestionLocked: boolean;
  nextQuestions: ReadonlyArray<QuestionMetadata>;
  question: QuestionJavaScript;
  questionProgress: QuestionProgress | null;
  serverDuration: number;
  similarQuestions: ReadonlyArray<QuestionMetadata>;
}>;

export default function QuestionJavaScriptCodingWorkspacePage({
  canViewPremiumContent,
  questionProgress: questionProgressInitial,
  isQuestionLocked,
  question,
  serverDuration,
  nextQuestions,
  similarQuestions,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { data: questionProgress } = useQueryQuestionProgress(
    question.metadata,
    questionProgressInitial,
  );
  const [layout, setLayout] = useCodingWorkspaceLayout('vertical');
  const {
    startDrag,
    size: leftPaneWidth,
    setSize: setLeftPaneWidth,
  } = useResizablePaneDivider(
    1440 / 2,
    false,
    'horizontal',
    layout === 'vertical' ? 0.5 : 0.333,
    () => window.innerWidth,
  );

  return (
    <>
      <style>{`@media (min-width:1024px) {
        #container { height: calc(100dvh - var(--navbar-height)); }
        #js-coding-left-section { width: ${leftPaneWidth}px; }
      }`}</style>
      <div
        key={question.metadata.slug}
        ref={containerRef}
        className="static flex w-full flex-col overflow-hidden lg:fixed lg:flex-row"
        id="container">
        <section
          className="border-b border-slate-200 lg:border-none"
          id="js-coding-left-section">
          <LeftPane
            canViewPremiumContent={canViewPremiumContent}
            isQuestionLocked={isQuestionLocked}
            nextQuestions={nextQuestions}
            question={question}
            questionProgress={questionProgress}
            serverDuration={serverDuration}
            similarQuestions={similarQuestions}
          />
        </section>
        <Section>
          <QuestionPaneDivider onMouseDown={(event) => startDrag(event)} />
          {isQuestionLocked ? (
            <section className="flex grow items-center justify-center">
              <QuestionPaywall />
            </section>
          ) : (
            <JavaScriptWorkspace
              layout={layout}
              nextQuestions={nextQuestions}
              question={question}
              questionProgress={questionProgress}
              onChangeLayout={(newLayout) => {
                // Automatically resize left column depending on workspace layout.
                // Vertical workspace layout: 1/2 of window.
                // Horizontal workspace layout: 1/3 of window.
                setLeftPaneWidth(
                  (containerRef?.current?.clientWidth ?? 1440) /
                    (newLayout === 'horizontal' ? 3 : 2),
                );
                setLayout(newLayout);
              }}
            />
          )}
        </Section>
      </div>
    </>
  );
}
