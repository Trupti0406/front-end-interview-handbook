import clsx from 'clsx';
import { useState } from 'react';
import { RiQuestionnaireLine } from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import Spinner from '~/components/ui/Spinner';
import Text from '~/components/ui/Text';
import { themeTextSecondaryColor } from '~/components/ui/theme';

import DiscussionsComment from './DiscussionsComment';
import DiscussionsCommentSort from './DiscussionsCommentSort';
import type {
  DiscussionsCommentSortField,
  DiscussionsCommentUserProfile,
} from './types';

type Props = Readonly<{
  domain: 'PROJECTS_CHALLENGE' | 'PROJECTS_SUBMISSION';
  entityId: string;
  viewer?: DiscussionsCommentUserProfile | null;
}>;

export default function DiscussionsCommentList({
  entityId,
  domain,
  viewer,
}: Props) {
  const [isAscendingOrder, setIsAscendingOrder] = useState(false);
  const [sortField, setSortField] =
    useState<DiscussionsCommentSortField>('votes');
  const { data, isLoading } = trpc.comments.list.useQuery({
    domain,
    entityId,
    sort: {
      field: sortField,
      isAscendingOrder,
    },
  });

  if (isLoading) {
    return (
      <div className="w-full p-8">
        <Spinner display="block" size="lg" />
      </div>
    );
  }

  const { count, comments } = data ?? {};

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center justify-between">
        <div
          className={clsx(
            'flex items-center gap-1.5',
            themeTextSecondaryColor,
          )}>
          <RiQuestionnaireLine className="h-5 w-5" />
          <Text color="inherit" size="body3">
            <FormattedMessage
              defaultMessage="{commentCount} comments"
              description="Label for comment count on project discussions page"
              id="g5XqyS"
              values={{
                commentCount: count,
              }}
            />
          </Text>
        </div>
        <DiscussionsCommentSort
          isAscendingOrder={isAscendingOrder}
          setIsAscendingOrder={setIsAscendingOrder}
          setSortField={setSortField}
          sortField={sortField}
        />
      </div>
      {comments?.map((comment) => (
        <DiscussionsComment
          key={comment.id}
          comment={comment}
          level={1}
          viewer={viewer}
        />
      ))}
    </div>
  );
}
