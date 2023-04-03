import { useState } from 'react';
import { useIntl } from 'react-intl';

import type { QuestionFilter } from './QuestionFilterType';
import type { QuestionFramework } from '../common/QuestionsTypes';
import { QuestionFrameworkLabels } from '../common/QuestionsTypes';

const FRAMEWORK_OPTIONS: ReadonlyArray<QuestionFramework> = [
  'react',
  'vanilla',
];

export default function useQuestionFrameworkFilter(): [
  Set<QuestionFramework>,
  QuestionFilter<QuestionFramework>,
] {
  const intl = useIntl();
  const [frameworkFilters, setFrameworkFilters] = useState<
    Set<QuestionFramework>
  >(new Set());

  const frameworkFilterOptions: QuestionFilter<QuestionFramework> = {
    id: 'Framework',
    name: intl.formatMessage({
      defaultMessage: 'Framework',
      description: 'Question framework',
      id: 'xbmWBx',
    }),
    onChange: (value) => {
      const newFrameworks = new Set(frameworkFilters);

      newFrameworks.has(value)
        ? newFrameworks.delete(value)
        : newFrameworks.add(value);
      setFrameworkFilters(newFrameworks);
    },
    options: FRAMEWORK_OPTIONS.map((value) => ({
      label: QuestionFrameworkLabels[value],
      value,
    })),
  };

  return [frameworkFilters, frameworkFilterOptions];
}
