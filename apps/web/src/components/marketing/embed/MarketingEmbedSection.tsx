import clsx from 'clsx';
import { useInView } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useRef, useState } from 'react';
import { RiArrowRightLine, RiJavascriptLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import gtag from '~/lib/gtag';

import { useQuestionFormatLists } from '~/data/QuestionFormats';

import Button from '~/components/ui/Button';
import Container from '~/components/ui/Container';
import TabsUnderline from '~/components/ui/Tabs/TabsUnderline';

import MarketingEmbedJavaScriptQuestion from './MarketingEmbedJavaScriptQuestion';
import type { EmbedUIQuestion } from './MarketingEmbedUIQuestion';
import MarketingEmbedUIQuestion from './MarketingEmbedUIQuestion';
import MarketingHeroBrowserWindowFrame from './MarketingHeroBrowserWindowFrame';
import MarketingQuestionCardMarquee from '../MarketingQuestionCardMarquee';
import type {
  QuestionJavaScript,
  QuestionMetadata,
} from '../../questions/common/QuestionsTypes';
import Heading from '../../ui/Heading';

const MarketingEmbedSystemDesignQuestion = dynamic(
  () => import('./MarketingEmbedSystemDesignQuestion'),
  {
    loading: () => (
      <div className="flex h-[600px] grow items-center justify-center" />
    ),
    ssr: false,
  },
);
const MarketingEmbedQuizQuestion = dynamic(
  () => import('./MarketingEmbedQuizQuestion'),
  {
    loading: () => (
      <div className="flex h-[600px] grow items-center justify-center" />
    ),
    ssr: false,
  },
);

function useTabs() {
  const intl = useIntl();
  const questionFormat = useQuestionFormatLists();

  const tabs = [
    {
      icon: questionFormat.coding.icon,
      label: intl.formatMessage({
        defaultMessage: 'UI / Components',
        description: 'User interface component questions',
        id: 'UCAeM0',
      }),
      value: 'user-interface',
    },
    {
      icon: RiJavascriptLine,
      label: 'JavaScript',
      value: 'javascript',
    },
    {
      icon: questionFormat['system-design'].icon,
      label: questionFormat['system-design'].name,
      value: 'system-design',
    },
    {
      icon: questionFormat.quiz.icon,
      label: questionFormat.quiz.name,
      value: 'quiz',
    },
  ];

  return tabs;
}

export default function MarketingEmbedSection({
  featuredQuestions,
  javaScriptEmbedExample,
  uiEmbedExample,
}: Readonly<{
  featuredQuestions: ReadonlyArray<QuestionMetadata>;
  javaScriptEmbedExample: QuestionJavaScript;
  uiEmbedExample: EmbedUIQuestion;
}>) {
  const intl = useIntl();
  const tabs = useTabs();
  const [selectedTab, setSelectedTab] = useState(tabs[0].value);
  const containerRef = useRef(null);
  const showEmbed = useInView(containerRef, {
    amount: 'some',
    once: true,
  });

  return (
    <div ref={containerRef} className="relative pb-24 pt-16 lg:pb-32">
      <Container
        className={clsx('relative flex flex-col gap-y-8')}
        variant="screen-2xl">
        <div className="flex flex-col gap-y-4 lg:gap-y-6">
          <Heading className="mx-auto" level="heading6">
            <FormattedMessage
              defaultMessage="Try our questions here"
              description="Text appearing next to the tabs of the embed on the Hero section of the Homepage. Only appears on very wide screens. Explains to the user that they can try out our interview practice questions directly right here."
              id="qhHM6u"
            />
          </Heading>
          <div className="flex justify-center">
            <TabsUnderline
              display="inline"
              label={intl.formatMessage({
                defaultMessage: 'Select question format',
                description:
                  'Label for tabs to select sample interview question format',
                id: '50kzzq',
              })}
              tabs={tabs}
              value={selectedTab}
              onSelect={(newTab) => {
                gtag.event({
                  action: `homepage.hero.embed.${newTab}.click`,
                  category: 'engagement',
                  label: newTab,
                });
                setSelectedTab(newTab);
              }}
            />
          </div>
        </div>
        <MarketingHeroBrowserWindowFrame>
          <div className="lg:h-[600px]">
            {showEmbed && (
              <>
                {selectedTab === 'user-interface' && (
                  <MarketingEmbedUIQuestion question={uiEmbedExample} />
                )}
                {selectedTab === 'javascript' && (
                  <MarketingEmbedJavaScriptQuestion
                    javaScriptEmbedExample={javaScriptEmbedExample}
                  />
                )}
                {selectedTab === 'system-design' && (
                  <MarketingEmbedSystemDesignQuestion />
                )}
                {selectedTab === 'quiz' && <MarketingEmbedQuizQuestion />}
              </>
            )}
          </div>
        </MarketingHeroBrowserWindowFrame>
        {featuredQuestions.length > 0 && (
          <MarketingQuestionCardMarquee
            periodSeconds={120}
            questions={featuredQuestions}
            rows={1}
          />
        )}
        <div className="mx-auto">
          <Button
            href="/questions"
            icon={RiArrowRightLine}
            label={intl.formatMessage({
              defaultMessage: 'View full questions list',
              description: 'Link to questions page',
              id: '+Eg6gK',
            })}
            size="md"
            variant="secondary"
          />
        </div>
      </Container>
    </div>
  );
}
