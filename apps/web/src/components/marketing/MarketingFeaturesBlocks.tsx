import clsx from 'clsx';
import Image from 'next/image';
import type { ReactNode } from 'react';
import { RiCheckLine } from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';

import MarketingFeatureSolutions from '~/components/marketing/MarketingFeatureSolutions';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import {
  themeRadialGlowBackground,
  themeTextBrandColor,
} from '~/components/ui/theme';

import MarketingSectionHeader from './MarketingSectionHeader';
import type { QuestionUserInterfaceBundle } from '../questions/common/QuestionsTypes';

function FeatureBlock({
  description,
  features,
  media,
  reverse = false,
  title,
}: Readonly<{
  description?: ReactNode;
  features?: ReadonlyArray<ReactNode>;
  media: ReactNode;
  reverse?: boolean;
  title: ReactNode;
}>) {
  return (
    <div
      className={clsx(
        'flex flex-col gap-x-20 gap-y-6 md:items-center lg:gap-x-28',
        reverse ? 'md:flex-row-reverse' : 'md:flex-row',
      )}>
      <div className="relative overflow-auto md:basis-1/2">{media}</div>
      <div className="mx-auto flex max-w-sm flex-col gap-y-4 md:max-w-none md:basis-1/2">
        <Heading level="heading4">{title}</Heading>
        {description && (
          <Text color="secondary" display="block">
            {description}
          </Text>
        )}
        {features != null && features.length > 0 && (
          <ul className="flex flex-col gap-y-1" role="list">
            {features.map((feature, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={index} className="flex gap-x-1">
                <RiCheckLine
                  aria-hidden={true}
                  className={clsx(
                    'mt-0.5 h-5 w-5 shrink-0',
                    themeTextBrandColor,
                  )}
                />
                <Text color="secondary" display="block">
                  {feature}
                </Text>
              </div>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default function MarketingFeaturesBlocks({
  solutions,
}: Readonly<{
  solutions: Readonly<{
    todoListReact: QuestionUserInterfaceBundle;
    todoListVanilla: QuestionUserInterfaceBundle;
  }>;
}>) {
  return (
    <div
      className={clsx(
        'isolate lg:mx-8 lg:rounded-t-[48px]',
        themeRadialGlowBackground,
      )}>
      <Container className="flex flex-col gap-y-24 py-24 lg:gap-y-32 lg:py-32">
        <div className="mx-auto md:max-w-screen-sm lg:max-w-4xl">
          <MarketingSectionHeader
            description={
              <FormattedMessage
                defaultMessage="You won't find the same depth or quality elsewhere."
                description="Subtitle of the 'Features' marketing section on Homepage"
                id="ft4ubO"
              />
            }
            heading={
              <FormattedMessage
                defaultMessage="Everything you need, in great quality"
                description="Title of the 'Features' marketing section on Homepage"
                id="d+9jeS"
              />
            }
            title={
              <FormattedMessage
                defaultMessage="Features"
                description="Title of the 'Features' marketing section on Homepage"
                id="yXYc5a"
              />
            }
          />
        </div>
        <Section>
          <FeatureBlock
            description={
              <>
                We structured the monolith of front end interview preparation
                into bite-sized focus areas. Explore structured learning paths
                and find what you need.
              </>
            }
            features={[
              <>Systematically cover what's important</>,
              <>Track your progress</>,
              <>Pick and choose weak areas to focus on</>,
            ]}
            media={
              <Image
                alt="Question topics"
                className="mx-auto max-w-sm md:max-w-full"
                height={312 * 2}
                quality={100}
                src="/img/marketing/topics.webp"
                width={496 * 2}
              />
            }
            title={
              <>
                Not sure what to prepare?
                <br />
                No problem
              </>
            }
          />
          <FeatureBlock
            description={
              <>
                With the largest, curated question bank supplemented with
                official solutions from ex-interviewers, you get all-rounded
                coverage for your preparation.
              </>
            }
            features={[
              <>
                Master every interview format — user interfaces, JavaScript,
                trivia-style quizzes and even front end system design
              </>,
              <>
                Find questions across all important topics — HTML, CSS,
                JavaScript, DOM APIs, accessibility, performance, and more
              </>,
            ]}
            media={
              <img
                alt="Questions for many frameworks"
                className="mx-auto w-full max-w-sm md:max-w-none"
                decoding="async"
                loading="lazy"
                src="/img/marketing/questions-framework.webp"
              />
            }
            reverse={true}
            title={<>Practice 200+ of the most important questions</>}
          />
          <FeatureBlock
            description={
              <>
                Every question is accompanied by at least one official solution
                to learn from, written by big tech ex-interviewers.
              </>
            }
            features={[
              <>
                Learn how to answer with scalability, accessibility and
                performance considerations
              </>,
              <>
                Reinforce your fundamentals, sharpen industry-approved
                techniques and recognize design patterns
              </>,
            ]}
            media={<MarketingFeatureSolutions solutions={solutions} />}
            title={<>Learn from solutions by ex-interviewers</>}
          />
          <FeatureBlock
            description={
              <>
                Our in-browser coding workspace allows you to simulate a real
                interview environment with no set up required!
              </>
            }
            features={[
              <>Instantly preview your code output</>,
              <>
                Enjoy quality of life editor features like syntax highlighting,
                theming, keyboard shortcuts
              </>,
            ]}
            media={
              <img
                alt="Solutions from ex-interviewers"
                className="mx-auto w-full max-w-sm md:max-w-none"
                decoding="async"
                loading="lazy"
                src="/img/marketing/workspace.webp"
              />
            }
            reverse={true}
            title={
              <>Practice in an environment that simulates real interviews</>
            }
          />
          <FeatureBlock
            description={
              <>
                Polish your answers with a comprehensive test suite that covers
                all the important edge cases that interviewers will look out
                for.
              </>
            }
            features={[
              <>
                Always know exactly what to improve on — all of our test cases
                are public
              </>,
              <>Detailed test case scenarios for UI questions</>,
            ]}
            media={
              <img
                alt="Test suite"
                className="mx-auto w-full max-w-sm md:max-w-none"
                decoding="async"
                loading="lazy"
                src="/img/marketing/tests.webp"
              />
            }
            title={<>Test your code automatically with a single click</>}
          />
          <FeatureBlock
            description={
              <>
                Practice interview questions asked by Google, Amazon, Apple,
                Airbnb, Lyft, LinkedIn, and more.
              </>
            }
            media={
              <img
                alt="Company questions"
                className="mx-auto w-full max-w-sm md:max-w-none"
                decoding="async"
                loading="lazy"
                src="/img/marketing/questions-company.webp"
              />
            }
            reverse={true}
            title={<>Gain insights on what your target company might ask</>}
          />
          <FeatureBlock
            description={
              <>
                Leverage proven study plans prepared by senior engineers to
                supercharge your preparation regardless of the time left —
                prepare well in 1 week, 1 month or 3 months.
              </>
            }
            media={
              <img
                alt="Study plans"
                className="mx-auto w-full max-w-sm md:max-w-none"
                decoding="async"
                loading="lazy"
                src="/img/marketing/study-plans.webp"
              />
            }
            title={<>Prepare the best you can within any timeline</>}
          />
        </Section>
      </Container>
    </div>
  );
}
