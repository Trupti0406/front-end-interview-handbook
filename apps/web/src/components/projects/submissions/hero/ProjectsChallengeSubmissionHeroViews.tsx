import { clsx } from 'clsx';
import { RiEyeFill } from 'react-icons/ri';

import Text from '~/components/ui/Text';
import { themeTextColor } from '~/components/ui/theme';

type Props = Readonly<{
  views: number;
}>;

export default function ProjectsChallengeSubmissionHeroViews({ views }: Props) {
  return (
    <div className="flex items-center gap-1">
      <RiEyeFill className={clsx('size-4', themeTextColor)} />
      <Text size="body3">{views}</Text>
    </div>
  );
}
