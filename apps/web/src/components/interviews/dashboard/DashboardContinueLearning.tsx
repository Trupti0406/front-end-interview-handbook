import clsx from 'clsx';
import { FormattedMessage } from 'react-intl';

import Button from '~/components/ui/Button';
import GradientProgressBar from '~/components/ui/GradientProgressBar/GradientProgressBar';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import type { ThemeGradient } from '~/components/ui/theme';
import {
  themeBackgroundCardWhiteOnLightColor,
  themeBorderColor,
  themeGlassyBorder,
} from '~/components/ui/theme';

import QuestionCountLabel from '../questions/metadata/QuestionCountLabel';
import QuestionTotalTimeLabel from '../questions/metadata/QuestionTotalTimeLabel';

import 'react-circular-progressbar/dist/styles.css';

type Props = Readonly<{
  hideHeading?: boolean;
  items: ReadonlyArray<{
    completedCount: number;
    durationMins?: number;
    gradient: ThemeGradient;
    // Resume button leads here.
    href: string;
    questionsCount: number;
    reverseGradient?: boolean;
    title: string;
  }>;
}>;

export default function DashboardContinueLearning({
  items,
  hideHeading = false,
}: Props) {
  return (
    <div className="flex flex-col gap-4">
      {!hideHeading && (
        <Heading level="heading6">
          <FormattedMessage
            defaultMessage="Continue learning"
            description="Title of Continue Learning section in preparation dashboard"
            id="TebaLD"
          />
        </Heading>
      )}
      <div
        className={clsx(
          'flex flex-col divide-y rounded-lg',
          themeBackgroundCardWhiteOnLightColor,
          themeGlassyBorder,
          themeBorderColor,
        )}>
        {items.map(
          ({
            completedCount,
            durationMins,
            gradient,
            href,
            reverseGradient = false,
            title,
            questionsCount,
          }) => {
            const progressPercentage = (completedCount / questionsCount) * 100;

            return (
              <div
                key={href}
                className={clsx(
                  'flex items-center justify-between gap-4 px-5 py-4',
                  themeBorderColor,
                )}>
                <div className="flex items-center gap-4">
                  <GradientProgressBar
                    className="h-14 w-14"
                    gradient={gradient}
                    progressPercentage={progressPercentage}
                    reverseGradient={reverseGradient}
                  />
                  <div className="flex flex-col gap-1">
                    <Text weight="medium">{title}</Text>
                    <div className="inline-flex flex-wrap gap-x-6 gap-y-1">
                      {durationMins && (
                        <QuestionTotalTimeLabel
                          mins={durationMins}
                          showIcon={true}
                        />
                      )}
                      {questionsCount && (
                        <QuestionCountLabel
                          count={questionsCount}
                          showIcon={true}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <Button href={href} label="Resume" variant="primary" />
              </div>
            );
          },
        )}
      </div>
    </div>
  );
}
