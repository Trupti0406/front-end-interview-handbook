import clsx from 'clsx';
import { FormattedMessage, useIntl } from 'react-intl';

import gtag from '~/lib/gtag';

import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';
import QuestionsList from '~/components/interviews/questions/listings/items/QuestionsList';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

import logEvent from '~/logging/logEvent';

export default function InterviewsMarketingJavaScriptQuestionsExamples({
  questions,
}: Readonly<{
  questions: ReadonlyArray<QuestionMetadata>;
}>) {
  const intl = useIntl();

  return (
    <div className={clsx('lg:grid lg:grid-cols-6 lg:gap-x-8')}>
      <div className="lg:col-span-2">
        <Text
          className="block text-base sm:text-lg"
          color="active"
          weight="bold">
          <FormattedMessage
            defaultMessage="Everything you need"
            description="Label for an example list of JavaScript Questions on marketing pages"
            id="7gb9hK"
          />
        </Text>
        <Heading className="mt-2" level="heading3">
          <FormattedMessage
            defaultMessage="JavaScript Questions"
            description="Title for an example list of JavaScript Questions on marketing pages"
            id="dJf+5S"
          />
        </Heading>
        <Section>
          <Text className="block py-10 text-lg md:text-xl" color="secondary">
            <FormattedMessage
              defaultMessage="Front end coding interview questions come in many forms — practice writing JavaScript functions, data structures, and algorithms."
              description="Subtitle for an example list of JavaScript Questions on marketing pages"
              id="b0OofK"
            />
          </Text>
          <div>
            <Button
              href="/prepare/coding"
              label={intl.formatMessage({
                defaultMessage: 'View All Questions',
                description:
                  'Link label to the list of all JavaScript coding questions',
                id: 'lJupPX',
              })}
              size="lg"
              variant="primary"
              onClick={() => {
                gtag.event({
                  action: 'marketing.questions.javascript.cta.click',
                  category: 'engagement',
                  label: 'View All Questions',
                });
                logEvent('click', {
                  element: 'Homepage JavaScript questions list',
                  label: 'View All Questions',
                });
              }}
            />
          </div>
        </Section>
      </div>
      <Section>
        <div className="mt-12 lg:col-span-4 lg:mt-0">
          <QuestionsList
            checkIfCompletedQuestion={() => false}
            questions={questions}
            showProgress={false}
          />
        </div>
      </Section>
    </div>
  );
}
