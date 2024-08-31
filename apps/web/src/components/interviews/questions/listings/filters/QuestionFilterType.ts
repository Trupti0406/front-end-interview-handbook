import type { ReactNode } from 'react';

import type { QuestionMetadata } from '../../common/QuestionsTypes';

export type QuestionFilter<
  T extends string,
  Q extends QuestionMetadata = QuestionMetadata,
> = Readonly<{
  id: string;
  matches: (question: Q) => boolean;
  name: string;
  onChange: (value: T) => void;
  options: ReadonlyArray<{
    icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
    label: ReactNode;
    tooltip?: string;
    value: T;
  }>;
  tooltip?: string;
}>;
