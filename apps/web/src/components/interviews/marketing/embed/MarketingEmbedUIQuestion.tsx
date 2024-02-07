'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useMediaQuery } from 'usehooks-ts';

import gtag from '~/lib/gtag';

import type {
  QuestionMetadata,
  QuestionUserInterface,
} from '~/components/interviews/questions/common/QuestionsTypes';
import Anchor from '~/components/ui/Anchor';
import Banner from '~/components/ui/Banner';
import UserInterfaceCodingWorkspaceWriteup from '~/components/workspace/user-interface/UserInterfaceCodingWorkspaceWriteup';

import logEvent from '~/logging/logEvent';

import type { QuestionFramework } from '../../questions/common/QuestionsTypes';

export type EmbedUIQuestion = Readonly<{
  frameworks: {
    angular: QuestionUserInterface;
    react: QuestionUserInterface;
    svelte: QuestionUserInterface;
    vanilla: QuestionUserInterface;
    vue: QuestionUserInterface;
  };
  metadata: QuestionMetadata;
}>;

type Props = Readonly<{
  question: EmbedUIQuestion;
}>;

const UserInterfaceCodingWorkspaceSection = dynamic(
  () =>
    import(
      '~/components/workspace/user-interface/UserInterfaceCodingWorkspaceSection'
    ),
  {
    loading: () => (
      <div className="flex grow items-center justify-center">Loading...</div>
    ),
    ssr: false,
  },
);

export default function MarketingEmbedUIQuestion({ question }: Props) {
  const intl = useIntl();
  const [framework, setFramework] = useState<QuestionFramework>('react');
  const laptopAndAbove = useMediaQuery('(min-width: 1024px)');

  return (
    <div className="relative flex size-full flex-col gap-3">
      {laptopAndAbove ? (
        <UserInterfaceCodingWorkspaceSection
          key={framework}
          activeTabScrollIntoView={false}
          canViewPremiumContent={false}
          embed={true}
          mode="practice"
          nextQuestions={[]}
          question={question.frameworks[framework]}
          similarQuestions={[]}
          timeoutLoggerInstance="marketing.embed.ui"
          onFrameworkChange={setFramework}
        />
      ) : (
        <UserInterfaceCodingWorkspaceWriteup
          canViewPremiumContent={false}
          contentType="description"
          environment="embed"
          framework={framework}
          metadata={question.metadata}
          mode="practice"
          nextQuestions={[]}
          similarQuestions={[]}
          writeup={question.frameworks[framework].description}
          onFrameworkChange={setFramework}
        />
      )}
      <Anchor
        href={question.metadata.href}
        target="_blank"
        variant="unstyled"
        onClick={() => {
          gtag.event({
            action: `homepage.hero.embed.user_interface.try_out.click`,
            category: 'engagement',
            label:
              'Click here to try out the actual workspace instead of this embed',
          });
          logEvent('click', {
            element: 'Homepage UI question embed',
            label:
              'Click here to try out the actual workspace instead of this embed',
          });
        }}>
        <Banner size="xs">
          {intl.formatMessage({
            defaultMessage:
              'Click here to try out the actual workspace instead of this embed.',
            description: 'Button label within embed',
            id: 'Cjz59k',
          })}
        </Banner>
      </Anchor>
    </div>
  );
}
