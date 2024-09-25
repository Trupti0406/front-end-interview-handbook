'use client';

import clsx from 'clsx';
import type {
  InterviewsCompanyGuide,
  InterviewsListingBottomContent,
} from 'contentlayer/generated';
import { useMemo } from 'react';
import {
  RiArrowLeftLine,
  RiGoogleFill,
  RiQuestionnaireLine,
  RiThumbUpLine,
  RiVerifiedBadgeLine,
} from 'react-icons/ri';
import { useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import { INTERVIEWS_REVAMP_2024 } from '~/data/FeatureFlags';

import { useUserProfile } from '~/components/global/UserProfileProvider';
import QuestionPaywall from '~/components/interviews/questions/common/QuestionPaywall';
import type {
  QuestionFormat,
  QuestionMetadata,
  QuestionSlug,
  QuestionTopic,
} from '~/components/interviews/questions/common/QuestionsTypes';
import QuestionsList from '~/components/interviews/questions/listings/items/QuestionsList';
import QuestionsLearningList from '~/components/interviews/questions/listings/learning/QuestionsLearningList';
import QuestionsLearningListPageTitleSection from '~/components/interviews/questions/listings/learning/QuestionsLearningListPageTitleSection';
import QuestionsLearningListTitleSection from '~/components/interviews/questions/listings/learning/QuestionsLearningListTitleSection';
import MDXContent from '~/components/mdx/MDXContent';
import Button from '~/components/ui/Button';
import Container from '~/components/ui/Container';
import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import { themeGradientGreenYellow } from '~/components/ui/theme';

import {
  categorizeQuestionsProgress,
  countNumberOfQuestionsInList,
  filterQuestionsProgressByList,
} from '~/db/QuestionsUtils';

import InterviewsCompanyInsiderTipsSlider from './InterviewsCompanyInsiderTipsSlider';
import InterviewsPageHeaderActions from '../common/InterviewsPageHeaderActions';
import useQuestionTopicLabels from '../questions/listings/filters/useQuestionTopicLabels';

import { useUser } from '@supabase/auth-helpers-react';

type Props = Readonly<{
  bottomContent?: InterviewsListingBottomContent;
  codingQuestions: ReadonlyArray<QuestionMetadata>;
  companyGuide: InterviewsCompanyGuide;
  companyQuestions: Record<QuestionFormat, ReadonlyArray<QuestionSlug>>;
  metadata: {
    description: string;
    href: string;
    title: string;
  };
  quizQuestions: ReadonlyArray<QuestionMetadata>;
  systemDesignQuestions: ReadonlyArray<QuestionMetadata>;
}>;

export default function InterviewsCompanyGuidePage({
  companyGuide,
  quizQuestions,
  companyQuestions,
  codingQuestions,
  systemDesignQuestions,
  bottomContent,
  metadata,
}: Props) {
  const intl = useIntl();
  const { userProfile } = useUserProfile();
  const user = useUser();
  const topicLabels = useQuestionTopicLabels();
  const canViewStudyPlans = userProfile?.isInterviewsPremium;

  const { data: questionProgressParam } = trpc.questionProgress.getAll.useQuery(
    undefined,
    {
      enabled: !!user,
    },
  );

  const questionsProgressAll = categorizeQuestionsProgress(
    questionProgressParam,
  );
  const questionsOverallProgress = filterQuestionsProgressByList(
    questionsProgressAll,
    companyQuestions,
  );

  const questionCount = countNumberOfQuestionsInList(companyQuestions);
  const questions = useMemo(
    () => [...quizQuestions, ...codingQuestions, ...systemDesignQuestions],
    [quizQuestions, codingQuestions, systemDesignQuestions],
  );

  const topics = useMemo(() => {
    const topicsSet = new Set<QuestionTopic>();

    questions.forEach((question) => {
      question.topics.forEach((topic) => {
        topicsSet.add(topic);
      });
    });

    return Array.from(topicsSet).map((topic) => topicLabels[topic].label);
  }, [questions, topicLabels]);

  const features = [
    {
      icon: RiQuestionnaireLine,
      label: intl.formatMessage(
        {
          defaultMessage: '{questionCount} known questions with solutions',
          description: 'Features for company guides question listing',
          id: 'M6LdL8',
        },
        { questionCount },
      ),
    },
    {
      icon: RiVerifiedBadgeLine,
      label: intl.formatMessage({
        defaultMessage: 'Insider tips',
        description: 'Features for company guides question listing',
        id: 'F9KpiA',
      }),
    },

    {
      icon: RiThumbUpLine,
      label: intl.formatMessage({
        defaultMessage: 'Recommended resources',
        description: 'Features for focus areas question listing',
        id: 'BQSRxW',
      }),
    },
  ];

  // TODO(interviews): add real insider tips data
  const insiderTipsData = [
    {
      content:
        'Amazon is known to focus a lot on behavioral questions and their Leadership Principles. Hence be well-prepared in the non-technical aspects too.',
      id: 'tip1',
    },
    {
      content:
        'Google is known to focus a lot on behavioral questions and their Leadership Principles. Hence be well-prepared in the non-technical aspects too.',
      id: 'tip2',
    },
  ];

  return (
    <div className={clsx('flex flex-col gap-y-12', 'py-12', 'relative')}>
      <Container className="relative flex flex-col gap-y-8">
        <div className="flex items-center justify-between gap-2">
          <Button
            addonPosition="start"
            className="-mb-2 -ml-5"
            href="/interviews/company"
            icon={RiArrowLeftLine}
            label={intl.formatMessage({
              defaultMessage: 'Back to companies',
              description: 'Link text to navigate to companies list page',
              id: 'YPNHFR',
            })}
            size="md"
            variant="tertiary"
          />
          {INTERVIEWS_REVAMP_2024 && (
            <InterviewsPageHeaderActions metadata={metadata} />
          )}
        </div>
        {INTERVIEWS_REVAMP_2024 ? (
          <>
            <QuestionsLearningListPageTitleSection
              description={intl.formatMessage(
                {
                  defaultMessage:
                    'The one-stop to prepare well for your {company} front end interviews.',
                  description: 'Description for company guides detail page',
                  id: '6TG+jF',
                },
                {
                  company: companyGuide.name,
                },
              )}
              feature="company-guides"
              features={features}
              logoImgSrc={companyGuide.logoUrl}
              overallProgress={questionProgressParam ?? []}
              questions={questions}
              questionsSessionKey={companyGuide.slug}
              themeBackgroundClass={themeGradientGreenYellow.className}
              title={intl.formatMessage(
                {
                  defaultMessage: '{company} Front End Interview Guide',
                  description: 'Title for company guides detail page',
                  id: 'SaUyXa',
                },
                {
                  company: companyGuide.name,
                },
              )}
            />
            <Divider />
            {/* Insider tips */}
            {insiderTipsData.length > 0 && (
              <div className="max-w-2xl">
                <InterviewsCompanyInsiderTipsSlider data={insiderTipsData} />
              </div>
            )}
          </>
        ) : (
          <QuestionsLearningListTitleSection
            description={<MDXContent mdxCode={companyGuide.body.code} />}
            feature="company-guides"
            icon={({ className, ...props }) => (
              <RiGoogleFill
                className={clsx('text-neutral-900', className)}
                {...props}
              />
            )}
            logoImgSrc={companyGuide.logoUrl}
            overallProgress={questionProgressParam ?? []}
            questionCount={questionCount}
            questionListKey={companyGuide.slug}
            questions={questions}
            themeBackgroundClass={clsx('bg-white', 'shadow-md')}
            title={`${companyGuide.name} Front End Engineer Interview Questions and Guides`}
          />
        )}
      </Container>
      <Section>
        <Container className="@container flex flex-col gap-8">
          {/* <CardContainer className="@4xl:grid-cols-4 @md:grid-cols-2 grid grid-cols-1 grid-rows-1 gap-3 md:gap-4 lg:gap-6">
            <InterviewsCompanyRoundCard
              description={<>2 questions on data structures and algorithms</>}
              icon={RiComputerLine}
              title="Online assessment"
            />
            <InterviewsCompanyRoundCard
              description={
                <>1 hour, live coding on a collaborative code editor</>
              }
              icon={RiPhoneLine}
              title="Phone interview"
            />
            <InterviewsCompanyRoundCard
              description={<>3 hours, 3 interviews with Google engineers</>}
              icon={RiChat1Line}
              title="Virtual onsite"
            />
            <InterviewsCompanyRoundCard
              description={<>1 hour, interview with engineering director</>}
              icon={RiUser2Line}
              title="Final round"
            />
          </CardContainer> */}
          {INTERVIEWS_REVAMP_2024 && (
            <Heading level="heading6">
              {intl.formatMessage(
                {
                  defaultMessage:
                    'Known {company} front end interview questions',
                  description:
                    'Heading for questions listing for company guides',
                  id: '5jFQfq',
                },
                {
                  company: companyGuide.name,
                },
              )}
            </Heading>
          )}
          {canViewStudyPlans ? (
            <QuestionsLearningList
              codingQuestions={codingQuestions}
              listKey={companyGuide.slug}
              overallProgress={questionsOverallProgress}
              quizQuestions={quizQuestions}
              systemDesignQuestions={systemDesignQuestions}
            />
          ) : (
            <div className="relative">
              <div
                className={clsx(
                  'min-h-[500px]',
                  'pointer-events-none touch-none select-none',
                )}
                // So that focus cannot go into the card, which is not meant to be used.
                {...{ inert: '' }}>
                <QuestionsList
                  checkIfCompletedQuestion={() => false}
                  questions={[...codingQuestions, ...quizQuestions].slice(0, 4)}
                />
              </div>
              <div
                className={clsx(
                  'absolute bottom-0 top-0',
                  'w-full overflow-hidden rounded-b-lg',
                )}>
                <div
                  className={clsx(
                    'absolute bottom-0 top-0 w-full',
                    'bg-gradient-to-t from-white via-white dark:from-neutral-950 dark:via-neutral-950',
                  )}
                />
                <div className={clsx('absolute bottom-0 w-full px-8')}>
                  <QuestionPaywall
                    background={false}
                    feature="company-guides"
                  />
                </div>
              </div>
            </div>
          )}

          {bottomContent && (
            <Section>
              <Divider />
              <MDXContent
                components={{
                  CompanyName: () => <span>{companyGuide.name}</span>,
                  QuestionCount: () => <span>{questionCount}</span>,
                  Topics: () => <span>{Array.from(topics).join(', ')}</span>,
                }}
                mdxCode={bottomContent.body.code}
              />
            </Section>
          )}
        </Container>
      </Section>
    </div>
  );
}