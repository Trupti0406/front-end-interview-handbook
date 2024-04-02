import ProjectsChallengeReputationTag from '~/components/projects/challenges/metadata/ProjectsChallengeReputationTag';
import Text from '~/components/ui/Text';

import type { ProjectsTrackItem } from './data/ProjectsTracksData';
import ProjectsChallengeProgressTag from '../challenges/metadata/ProjectsChallengeProgressTag';
import ProjectsPremiumBadge from '../common/ProjectsPremiumBadge';
import ProjectsStatusBadgeCompleted from '../common/status/ProjectsStatusBadgeCompleted';

type Props = Readonly<{
  completedCount?: number;
  isViewerPremium: boolean;
  isViewingOwnProfile: boolean;
  track: ProjectsTrackItem;
}>;

export default function ProjectsTrackAccordionHeader({
  completedCount = 0,
  isViewerPremium,
  isViewingOwnProfile,
  track,
}: Props) {
  const { points, metadata, challenges } = track;
  const { description, title } = metadata;
  const completed = completedCount === challenges.length;

  return (
    <div className="flex flex-col items-start gap-1.5 text-start">
      <div className="flex items-center gap-2">
        <Text size="body1" weight="medium">
          {title}
        </Text>
        {metadata.premium && (
          <ProjectsPremiumBadge size="sm" unlocked={isViewerPremium} />
        )}
        {completed && <ProjectsStatusBadgeCompleted entity="track" />}
      </div>
      <Text className="block" color="subtitle" size="body2">
        {description}
      </Text>
      <div className="flex flex-wrap gap-4">
        <ProjectsChallengeReputationTag points={points} variant="flat" />
        <ProjectsChallengeProgressTag
          completed={completedCount}
          showProgress={isViewingOwnProfile}
          total={challenges.length}
        />
      </div>
    </div>
  );
}