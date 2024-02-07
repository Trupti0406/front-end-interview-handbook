import clsx from 'clsx';
import { useIntl } from 'react-intl';

import useCompanyNames from '~/hooks/useCompanyNames';
import useSessionStorageForSets from '~/hooks/useSessionStorageForSets';

import { useUserProfile } from '~/components/global/UserProfileProvider';
import type { QuestionCompany } from '~/components/interviews/questions/common/QuestionsTypes';
import { themeIconColor } from '~/components/ui/theme';

import type { QuestionFilter } from '../QuestionFilterType';

const COMPANY_OPTIONS: ReadonlyArray<QuestionCompany> = [
  'google',
  'amazon',
  'apple',
  'airbnb',
  'linkedin',
  'lyft',
  'uber',
  'dropbox',
  'microsoft',
  'stripe',
];

type Props = Readonly<{
  namespace: string;
}>;

export default function useQuestionCompanyFilter({
  namespace,
}: Props): [Set<QuestionCompany>, QuestionFilter<QuestionCompany>] {
  const intl = useIntl();
  const { userProfile } = useUserProfile();
  const companyNames = useCompanyNames();
  const [companyFilters, setCompanyFilters] =
    useSessionStorageForSets<QuestionCompany>(
      `gfe:${namespace}:company-filter`,
      new Set(),
    );
  const CompanyFilterOptions: QuestionFilter<QuestionCompany> = {
    id: 'company',
    matches: (question) =>
      companyFilters.size === 0 ||
      !userProfile?.isPremium ||
      question.companies.some((company) => companyFilters.has(company)),
    name: intl.formatMessage({
      defaultMessage: 'Company',
      description: 'Header for company filters',
      id: 'IiZazG',
    }),
    onChange: (value) => {
      const newCompanies = new Set(companyFilters);

      newCompanies.has(value)
        ? newCompanies.delete(value)
        : newCompanies.add(value);
      setCompanyFilters(newCompanies);
    },
    options: COMPANY_OPTIONS.map((company) => {
      const Icon = companyNames[company].logo;

      return {
        label: (
          <div className="flex items-center gap-2">
            <Icon className={clsx('size-4 shrink-0', themeIconColor)} />
            {companyNames[company].label}
          </div>
        ),
        value: company,
      };
    }),
  };

  return [companyFilters, CompanyFilterOptions];
}
