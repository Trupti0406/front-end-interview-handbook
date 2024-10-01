import { useState } from 'react';

import useSessionStorageForSets from '~/hooks/useSessionStorageForSets';

import type { QuestionFramework } from '~/components/interviews/questions/common/QuestionsTypes';
import { QuestionFrameworkLabels } from '~/components/interviews/questions/common/QuestionsTypes';
import { useIntl } from '~/components/intl';

import type { QuestionFilter } from '../QuestionFilterType';

const FRAMEWORK_OPTIONS: ReadonlyArray<QuestionFramework> = [
  'react',
  'vanilla',
  'angular',
  'svelte',
  'vue',
];

type Props = Readonly<{
  namespace?: string;
}>;

export default function useQuestionFrameworkFilter({
  namespace,
}: Props): [Set<QuestionFramework>, QuestionFilter<QuestionFramework>] {
  const intl = useIntl();
  const [frameworkState, setFrameworkState] = useState(
    new Set<QuestionFramework>(),
  );
  const [frameworkSessionStorage, setFrameworkSessionStorage] =
    useSessionStorageForSets<QuestionFramework>(
      `gfe:${namespace}:framework-filter`,
      new Set(),
    );

  // Conditionally select which hook's state to use
  const frameworkFilters = namespace ? frameworkSessionStorage : frameworkState;
  const setFrameworkFilters = namespace
    ? setFrameworkSessionStorage
    : setFrameworkState;

  const frameworkFilterOptions: QuestionFilter<QuestionFramework> = {
    id: 'framework',
    matches: (question) =>
      frameworkFilters.size === 0 ||
      question.frameworks.some((frameworkItem) =>
        frameworkFilters.has(frameworkItem.framework),
      ),
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
    onClear: () => {
      setFrameworkFilters(new Set());
    },
    options: FRAMEWORK_OPTIONS.map((value) => ({
      label: QuestionFrameworkLabels[value],
      value,
    })),
    setValues: setFrameworkFilters,
  };

  return [frameworkFilters, frameworkFilterOptions];
}
