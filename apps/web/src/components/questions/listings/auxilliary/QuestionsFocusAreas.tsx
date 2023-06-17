import { BiUniversalAccess } from 'react-icons/bi';
import {
  RiDashboardLine,
  RiListCheck2,
  RiOrganizationChart,
} from 'react-icons/ri';
import { useIntl } from 'react-intl';

import QuestionFocusAreasSection from '../../dashboard/QuestionFocusAreasSection';

export default function QuestionsFocusAreas() {
  const intl = useIntl();

  return (
    <QuestionFocusAreasSection
      description="Recommended focus areas tooltip"
      focusAreas={[
        {
          description: 'Lorem ipsum',
          durationMins: 92,
          icon: RiOrganizationChart,
          questionCount: 47,
          title: 'Data structures & algorithms',
        },
        {
          description: 'Lorem ipsum',
          durationMins: 92,
          icon: RiDashboardLine,
          questionCount: 47,
          title: 'Design system components',
        },
        {
          description: 'Lorem ipsum',
          durationMins: 92,
          icon: RiListCheck2,
          questionCount: 47,
          title: 'Forms',
        },
        {
          description: 'Lorem ipsum',
          durationMins: 92,
          icon: BiUniversalAccess,
          questionCount: 47,
          title: 'Accessibility',
        },
        {
          description: 'Lorem ipsum',
          durationMins: 92,
          icon: RiOrganizationChart,
          questionCount: 47,
          title: 'Foo',
        },
        {
          description: 'Lorem ipsum',
          durationMins: 92,
          icon: RiDashboardLine,
          questionCount: 47,
          title: 'Bar',
        },
        {
          description: 'Lorem ipsum',
          durationMins: 92,
          icon: RiListCheck2,
          questionCount: 47,
          title: 'Haz',
        },
        {
          description: 'Lorem ipsum',
          durationMins: 92,
          icon: BiUniversalAccess,
          questionCount: 47,
          title: 'Uno',
        },
      ]}
      title={intl.formatMessage({
        defaultMessage: 'Recommended focus areas',
        description:
          'Title of recommended focus areas section on preparation page',
        id: 'F+dxo7',
      })}
    />
  );
}
