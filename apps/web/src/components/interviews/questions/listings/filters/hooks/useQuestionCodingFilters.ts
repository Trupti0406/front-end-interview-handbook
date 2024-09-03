import type {
  QuestionFormat,
  QuestionMetadataWithCompletedStatus,
} from '~/components/interviews/questions/common/QuestionsTypes';

import useQuestionCompanyFilter from './useQuestionCompanyFilter';
import useQuestionCompletionStatusFilter from './useQuestionCompletionStatusFilter';
import useQuestionDifficultyFilter from './useQuestionDifficultyFilter';
import useQuestionFormatFilter from './useQuestionFormatFilter';
import useQuestionFrameworkFilter from './useQuestionFrameworkFilter';
import useQuestionLanguageFilter from './useQuestionLanguageFilter';
import useQuestionSearchFilter from './useQuestionSearchFilter';
import questionMatchesTextQuery from '../questionMatchesTextQuery';

type Props = Readonly<{
  formatFiltersFilterPredicate?: (format: QuestionFormat) => boolean;
  formatFiltersOrderComparator?: (
    a: QuestionFormat,
    b: QuestionFormat,
  ) => number;
  initialFormat?: QuestionFormat | null;
  namespace: string;
}>;

export default function useQuestionCodingFilters({
  formatFiltersFilterPredicate,
  formatFiltersOrderComparator,
  namespace,
  initialFormat,
}: Props) {
  // Filtering.
  const [query, setQuery] = useQuestionSearchFilter({ namespace });
  const [difficultyFilters, difficultyFilterOptions] =
    useQuestionDifficultyFilter({ namespace });
  const [companyFilters, companyFilterOptions] = useQuestionCompanyFilter({
    namespace,
  });
  const [languageFilters, languageFilterOptions] = useQuestionLanguageFilter({
    namespace,
  });
  const [frameworkFilters, frameworkFilterOptions] = useQuestionFrameworkFilter(
    { namespace },
  );
  const [completionStatusFilters, completionStatusFilterOptions] =
    useQuestionCompletionStatusFilter({ namespace });
  const [formatFilters, formatFilterOptions] = useQuestionFormatFilter({
    filter: formatFiltersFilterPredicate,
    initialValue: initialFormat == null ? [] : [initialFormat],
    namespace,
    order: formatFiltersOrderComparator,
  });

  const filters: ReadonlyArray<
    [number, (question: QuestionMetadataWithCompletedStatus) => boolean]
  > = [
    // Query.
    [0, (question) => questionMatchesTextQuery(question, query)],
    // Difficulty.
    [difficultyFilters.size, difficultyFilterOptions.matches],
    // Company.
    [companyFilters.size, companyFilterOptions.matches],
    // Language.
    [languageFilters.size, languageFilterOptions.matches],
    // Format.
    [formatFilters.size, formatFilterOptions.matches],
    // Framework.
    [frameworkFilters.size, frameworkFilterOptions.matches],
    // Completion Status.
    [completionStatusFilters.size, completionStatusFilterOptions.matches],
  ];

  return {
    companyFilterOptions,
    companyFilters,
    completionStatusFilterOptions,
    completionStatusFilters,
    difficultyFilterOptions,
    difficultyFilters,
    filters,
    formatFilterOptions,
    formatFilters,
    frameworkFilterOptions,
    frameworkFilters,
    languageFilterOptions,
    languageFilters,
    query,
    setQuery,
  };
}
