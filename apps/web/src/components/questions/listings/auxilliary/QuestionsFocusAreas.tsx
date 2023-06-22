import { BiUniversalAccess } from 'react-icons/bi';
import {
  RiDashboardLine,
  RiListCheck2,
  RiOrganizationChart,
} from 'react-icons/ri';
import { useIntl } from 'react-intl';

import useFocusAreas from '~/data/focus-areas/useFocusAreas';

import QuestionFocusAreasSection from '../../dashboard/QuestionFocusAreasSection';

type Props = Readonly<{
  limit?: number;
}>;

export default function QuestionsFocusAreas({ limit = Infinity }: Props) {
  const intl = useIntl();
  const focusAreas = useFocusAreas();
  const areas = [
    focusAreas['data-structure-algorithms'],
    focusAreas.forms,
    focusAreas.lodash,
    focusAreas.accessibility,
  ];

  return (
    <QuestionFocusAreasSection
      description="Recommended focus areas tooltip"
      focusAreas={areas.slice(0, limit)}
      title={intl.formatMessage({
        defaultMessage: 'Recommended focus areas',
        description:
          'Title of recommended focus areas section on preparation page',
        id: 'F+dxo7',
      })}
    />
  );
}
