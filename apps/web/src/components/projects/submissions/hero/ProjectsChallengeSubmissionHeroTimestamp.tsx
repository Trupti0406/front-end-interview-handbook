import { FormattedMessage } from 'react-intl';

import Text from '~/components/ui/Text';

import type { ProjectsChallengeSubmissionAugmented } from '../types';
import RelativeTimestamp from '../../../common/datetime/RelativeTimestamp';

type Props = Readonly<{
  submission: ProjectsChallengeSubmissionAugmented;
}>;

export default function ProjectsChallengeSubmissionHeroTimestamp({
  submission,
}: Props) {
  const { createdAt, editedAt } = submission;

  return (
    <Text color="secondary" size="body3">
      <RelativeTimestamp timestamp={createdAt} />
      {createdAt.getTime() !== editedAt.getTime() && (
        <>
          {' • '}
          <FormattedMessage
            defaultMessage="edited {editedAtTime}"
            description="Updated time stamp for submission detail page"
            id="kgoB9+"
            values={{
              editedAtTime: <RelativeTimestamp timestamp={editedAt} />,
            }}
          />
        </>
      )}
    </Text>
  );
}
