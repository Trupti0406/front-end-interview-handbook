import clsx from 'clsx';
import { RiArrowRightLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';
import { useMediaQuery } from 'usehooks-ts';

import ProjectsChallengeDifficultyTag from '~/components/projects/challenges/metadata/ProjectsChallengeDifficultyTag';
import ProjectsComponentTrackTag from '~/components/projects/challenges/metadata/ProjectsChallengeTrackTag';
import type { ProjectsChallengeItem } from '~/components/projects/challenges/types';
import Anchor from '~/components/ui/Anchor';
import Text, { textVariants } from '~/components/ui/Text';
import {
  themeBackgroundCardAltColor,
  themeBackgroundLayerColor,
  themeGlassyBorder,
  themeTextBrandColor_GroupHover,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

import ProjectsPremiumBadge from '../../common/ProjectsPremiumBadge';
import ProjectsStatusBadge from '../../common/status/ProjectsStatusBadge';

type Props = Readonly<{
  challenge: ProjectsChallengeItem;
  isViewerPremium: boolean;
}>;

export default function ProjectsChallengeSubmissionHeroCard({
  challenge,
  isViewerPremium,
}: Props) {
  const intl = useIntl();
  const { metadata, status, track, userUnlocked } = challenge;
  const {
    access: challengeAccess,
    title,
    difficulty,
    description,
    href,
  } = metadata;
  const isMobileAndBelow = useMediaQuery('(max-width: 768px)');

  return (
    <div
      className={clsx(
        'isolate',
        'flex flex-col gap-4',
        'p-4 md:p-6',
        'group relative',
        'rounded-lg',
        'w-full md:w-[436px]',
        themeGlassyBorder,
        isMobileAndBelow
          ? themeBackgroundLayerColor
          : themeBackgroundCardAltColor,
      )}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Text color="secondary" size="body2" weight="medium">
            {intl.formatMessage({
              defaultMessage: 'Challenge brief',
              description: 'Projects challenge submission hero card title',
              id: '/BGC+5',
            })}
          </Text>
          <ProjectsStatusBadge entity="challenge" status={status} />
        </div>
        <RiArrowRightLine
          aria-hidden={true}
          className={clsx(
            'size-4 shrink-0',
            themeTextSecondaryColor,
            themeTextBrandColor_GroupHover,
          )}
        />
      </div>
      <div className="flex items-center gap-x-3">
        <Anchor
          className={textVariants({
            className: 'z-[1]',
            size: 'body0',
            weight: 'bold',
          })}
          href={href}
          variant="flat">
          {title}
        </Anchor>
        {challengeAccess === 'premium' && (
          <ProjectsPremiumBadge size="sm" unlocked={userUnlocked} />
        )}
      </div>
      <Text className="line-clamp-3" color="secondary" size="body3">
        {description}
      </Text>
      <div className="z-[1] flex items-center gap-4">
        <ProjectsChallengeDifficultyTag
          difficulty={difficulty}
          variant="inline"
        />
        {isViewerPremium && <ProjectsComponentTrackTag track={track} />}
      </div>
      <Anchor aria-label={title} className="absolute inset-0" href={href} />
    </div>
  );
}
