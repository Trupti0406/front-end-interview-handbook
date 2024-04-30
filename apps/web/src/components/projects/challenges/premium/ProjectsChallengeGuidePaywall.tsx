import clsx from 'clsx';
import { RiLockLine } from 'react-icons/ri';

import { themeBorderColor, themeTextSubtleColor } from '~/components/ui/theme';

import type { ProjectsPremiumAccessControlType } from './ProjectsPremiumAccessControl';
import ProjectsPremiumPaywall from './ProjectsPremiumPaywall';
import {
  useProjectsChallengePaywallSubtitle,
  useProjectsChallengePaywallTitle,
} from './ProjectsPremiumPaywallStrings';
import type { ProjectsViewerProjectsProfile } from '../../types';

type Props = Readonly<{
  slug: string;
  viewerGuideAccess: ProjectsPremiumAccessControlType;
  viewerProjectsProfile: ProjectsViewerProjectsProfile | null;
}>;

export default function ProjectsChallengeGuidePaywall({
  viewerGuideAccess: viewerContentAccess,
  viewerProjectsProfile,
  slug,
}: Props) {
  const title = useProjectsChallengePaywallTitle(viewerContentAccess);
  const credits = viewerProjectsProfile?.credits ?? 0;
  const subtitle = useProjectsChallengePaywallSubtitle(
    viewerContentAccess,
    viewerProjectsProfile?.credits ?? 0,
  );

  return (
    <div className={clsx('rounded-md p-12', ['border', themeBorderColor])}>
      <ProjectsPremiumPaywall
        credits={credits}
        icon={
          <RiLockLine
            aria-hidden={true}
            className={clsx('size-10 shrink-0', themeTextSubtleColor)}
          />
        }
        size="md"
        slug={slug}
        subtitle={subtitle}
        title={title!}
        viewerContentAccess={viewerContentAccess}
      />
    </div>
  );
}