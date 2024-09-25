import { RiStarSmileFill } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import Badge from '~/components/ui/Badge';

export default function InterviewsPremiumBadge() {
  const intl = useIntl();

  return (
    <Badge
      icon={RiStarSmileFill}
      label={intl.formatMessage({
        defaultMessage: 'Premium',
        description: 'Premium user or content',
        id: 'rf0xcZ',
      })}
      size="sm"
      variant="special"
    />
  );
}