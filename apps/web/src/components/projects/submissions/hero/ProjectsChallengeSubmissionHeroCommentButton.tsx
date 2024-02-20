import clsx from 'clsx';
import { RiMessage2Fill } from 'react-icons/ri';

import Text from '~/components/ui/Text';
import {
  themeBackgroundLayerEmphasized,
  themeBorderElementColor,
  themeTextColor,
} from '~/components/ui/theme';

type Props = Readonly<{
  comments: number;
  onClick: () => void;
}>;

export default function ProjectsChallengeSubmissionHeroCommentButton({
  comments,
  onClick,
}: Props) {
  return (
    <button
      className={clsx(
        'flex items-center justify-center gap-1 px-3 py-2',
        'w-full md:w-auto',
        themeBackgroundLayerEmphasized,
        'border',
        themeBorderElementColor,
        'rounded-2xl',
      )}
      type="button"
      onClick={onClick}>
      <RiMessage2Fill className={clsx('size-4', themeTextColor)} />
      <Text size="body3">{comments}</Text>
    </button>
  );
}
