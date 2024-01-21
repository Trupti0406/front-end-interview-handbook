import clsx from 'clsx';
import { startCase } from 'lodash-es';
import { useState } from 'react';
import {
  RiAddCircleLine,
  RiIndeterminateCircleLine,
  RiPencilFill,
  RiReplyFill,
} from 'react-icons/ri';
import { useIntl } from 'react-intl';

import Anchor from '~/components/ui/Anchor';
import Badge from '~/components/ui/Badge';
import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';
import {
  themeBackgroundColor,
  themeElementBorderColor,
} from '~/components/ui/theme';

import DiscussionsCommentDeleteButton from './DiscussionsCommentDeleteButton';
import DiscussionsCommentEditInput from './DiscussionsCommentEditInput';
import DiscussionsCommentReplies from './DiscussionsCommentReplies';
import DiscussionsCommentRepliesThreadLines from './DiscussionsCommentRepliesThreadLines';
import DiscussionsCommentVoteButton from './DiscussionsCommentVoteButton';
import DiscussionsReplyInput from './DiscussionsReplyInput';
import type {
  DiscussionsCommentItem,
  DiscussionsCommentUserProfile,
} from './types';
import { getRelativeTimestamp } from '../projects/common/relativeTimestampValues';
import ProjectsLikeCountTag from '../projects/stats/ProjectsLikeCountTag';
import ProjectsUserJobTitle from '../projects/users/ProjectsUserJobTitle';
import ProjectsUserYearsOfExperience from '../projects/users/ProjectsUserYearsOfExperience';
import UserAvatarWithLevel from '../projects/users/UserAvatarWithLevel';

type Props = Readonly<{
  className?: string;
  comment: DiscussionsCommentItem;
  level: number;
  viewer?: DiscussionsCommentUserProfile | null;
}>;

const MAX_LEVEL_TO_ALLOW_REPLIES = 2;

export default function DiscussionsComment({
  comment,
  level,
  className,
  viewer,
}: Props) {
  const {
    id: commentId,
    author,
    _count: { votes: votesCount },
    content,
    category,
    replies,
  } = comment;
  const intl = useIntl();
  const replyCount = replies?.length ?? 0;
  const hasReplies = replyCount > 0;

  const [mode, setMode] = useState<'delete' | 'edit' | 'reply' | null>(null);
  const [showReplies, setShowReplies] = useState(false);

  const shouldPadBottom = mode === 'reply' || showReplies;
  const collapseButtonLabel = intl.formatMessage(
    {
      defaultMessage:
        'Collapse {replyCount, plural, =0 {none} one {# reply} other {# replies}}',
      description: 'Label for collapse replies button',
      id: 'puP8B5',
    },
    {
      replyCount,
    },
  );

  return (
    <div className={clsx('flex flex-col grow', className)}>
      <div className="flex items-start gap-4">
        <div className="relative flex flex-col items-center self-stretch">
          <UserAvatarWithLevel
            level={11}
            profile={author}
            progress={50}
            size="2xl"
          />
          {(hasReplies || mode === 'reply') && (
            <div
              className={clsx(
                'h-full w-px flex-1 border-l',
                themeElementBorderColor,
              )}
            />
          )}
          {showReplies && (
            <>
              <div
                className={clsx(
                  'absolute bottom-8 h-4 w-4',
                  themeBackgroundColor,
                )}
              />
              <div className="absolute bottom-6 self-center">
                <Button
                  icon={RiIndeterminateCircleLine}
                  isLabelHidden={true}
                  label={collapseButtonLabel}
                  tooltip={collapseButtonLabel}
                  variant="tertiary"
                  onClick={() => {
                    setShowReplies(false);
                  }}
                />
              </div>
            </>
          )}
        </div>
        <div
          className={clsx(
            'flex flex-1 flex-col items-start gap-3',
            shouldPadBottom ? 'pb-6' : 'pb-1',
          )}>
          <div className="flex flex-col gap-1">
            <div className="flex gap-3">
              <Text color="secondary" size="body2">
                <Text size="inherit" weight="medium">
                  <Anchor
                    href={`/projects/u/${author.username}`}
                    variant="flat">
                    {author.name}
                  </Anchor>
                </Text>
                {' · '}
                <span>{getRelativeTimestamp(comment.createdAt)}</span>
              </Text>
            </div>
            <div className="flex gap-4">
              {author.title && (
                <ProjectsUserJobTitle jobTitle={author.title} size="2xs" />
              )}
              {/* TODO(projects): render from user */}
              <ProjectsUserYearsOfExperience size="2xs" yearsOfExperience={2} />
            </div>
          </div>
          {category && (
            <Badge
              label={startCase(category.toLowerCase())}
              size="sm"
              variant="primary"
            />
          )}
          {mode === 'edit' ? (
            <DiscussionsCommentEditInput
              comment={comment}
              onCancel={() => {
                setMode(null);
              }}
            />
          ) : (
            <Text size="body2">{content}</Text>
          )}
          <div className="flex -mt-1">
            {viewer == null ? (
              <ProjectsLikeCountTag likeCount={votesCount} />
            ) : (
              <div className="-ml-3">
                <DiscussionsCommentVoteButton
                  comment={comment}
                  count={votesCount}
                />
              </div>
            )}
            {viewer != null && level <= MAX_LEVEL_TO_ALLOW_REPLIES && (
              <Button
                addonPosition="start"
                className="ms-2"
                icon={RiReplyFill}
                label={intl.formatMessage({
                  defaultMessage: 'Reply',
                  description:
                    'Label for reply button on project discussions page',
                  id: 'buggxJ',
                })}
                variant="tertiary"
                onClick={() => setMode(mode === 'reply' ? null : 'reply')}
              />
            )}
            {viewer?.id === author.id && (
              <Button
                addonPosition="start"
                icon={RiPencilFill}
                label={intl.formatMessage({
                  defaultMessage: 'Edit',
                  description:
                    'Label for edit button on project discussions page',
                  id: 'g2Nt5j',
                })}
                variant="tertiary"
                onClick={() => setMode(mode === 'edit' ? null : 'edit')}
              />
            )}
            {viewer?.id === author.id && (
              <DiscussionsCommentDeleteButton
                commentId={commentId}
                dialogShown={mode === 'delete'}
                onClick={() => setMode('delete')}
                onDismiss={() => setMode(null)}
              />
            )}
          </div>
        </div>
      </div>
      {mode === 'reply' && viewer != null && (
        <DiscussionsReplyInput
          hasNext={hasReplies}
          parentComment={comment}
          viewer={viewer}
          onCancel={() => {
            setMode(null);
          }}
        />
      )}
      {!showReplies && hasReplies && (
        <div className="flex">
          <DiscussionsCommentRepliesThreadLines branchHeightClass="h-5 -translate-y-1" />
          <Button
            addonPosition="start"
            className="-ms-3.5"
            icon={RiAddCircleLine}
            label={intl.formatMessage(
              {
                defaultMessage:
                  '{replyCount, plural, one {Show # reply} other {Show # replies}}',
                description:
                  'Label for more replies button on project discussions page',
                id: 'g9OX0J',
              },
              { replyCount },
            )}
            variant="tertiary"
            onClick={() => {
              setShowReplies(true);
            }}
          />
        </div>
      )}
      {showReplies && comment.replies && comment.replies.length > 0 && (
        <DiscussionsCommentReplies
          level={level + 1}
          replies={comment.replies}
          viewer={viewer}
        />
      )}
    </div>
  );
}
