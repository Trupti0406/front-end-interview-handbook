import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import Anchor from '~/components/ui/Anchor';
import Text from '~/components/ui/Text';

import ProjectsChallengeSubmissionsDialog from './ProjectsChallengeSubmissionsDialog';

import { useUser } from '@supabase/auth-helpers-react';

type Props = Readonly<{
  challengeSlug: string;
}>;

export default function ProjectsChallengeCompletedCountButton({
  challengeSlug,
}: Props) {
  const user = useUser();
  const [showSubmissionsDialog, setShowSubmissionsDialog] = useState(false);
  const { data: userCompletedTimes } =
    trpc.projects.submission.userCompletedTimes.useQuery(
      {
        slug: challengeSlug,
      },
      {
        enabled: !!user,
      },
    );

  if (userCompletedTimes == null || userCompletedTimes === 0) {
    return null;
  }

  return (
    <div className="flex justify-end">
      <Text className="text-right" color="secondary" size="body3">
        <FormattedMessage
          defaultMessage="You completed <button>{completedTimes, plural, one {once} other {# times}}</button>"
          description="Number of times the project was completed"
          id="zG7GM9"
          values={{
            button: (chunks) => (
              <Anchor
                href="#"
                onClick={() => {
                  setShowSubmissionsDialog(true);
                }}>
                {chunks}
              </Anchor>
            ),
            completedTimes: userCompletedTimes,
          }}
        />
      </Text>
      {showSubmissionsDialog && (
        <ProjectsChallengeSubmissionsDialog
          challengeSlug={challengeSlug}
          onClose={() => setShowSubmissionsDialog(false)}
        />
      )}
    </div>
  );
}
