import { useIntl } from 'react-intl';

import type { ProjectsProfileAvatarData } from '~/components/projects/challenges/types';
import type { ProjectsChallengeSubmissionAuthor } from '~/components/projects/submissions/types';

import ProjectsCommentList from './ProjectsCommentList';

export type CommentActivity = Readonly<{
  author: ProjectsProfileAvatarData;
  createdAt: number;
  description: string;
  isQuestion: boolean;
  recipient: ProjectsProfileAvatarData;
  submission: ProjectsChallengeSubmissionAuthor;
  type: 'CODE_REVIEW' | 'COMMENT';
}>;

const user1: ProjectsProfileAvatarData = {
  avatarUrl: 'https://avatars.githubusercontent.com/u/1315101?v=4',
  id: '84ca339a-5636-4749-ae9a-8357e3d9ae62',
  name: 'Yangshun Tay',
  username: 'yangshun',
};

const user2: ProjectsProfileAvatarData = {
  avatarUrl: null,
  id: '039da1a7-3cd0-482a-a991-d8b49a197ae8',
  name: 'Weiqing 2406',
  username: 'weiquu',
};

const user2Submission1: ProjectsChallengeSubmissionAuthor = {
  avatarUrl: null,
  currentStatus: null,
  id: 'id2',
  name: 'Weiqing 2406',
  startWorkDate: null,
  title: 'Title 1',
  username: 'weiquu',
};

const user2Submission2: ProjectsChallengeSubmissionAuthor = {
  avatarUrl: null,
  currentStatus: null,
  id: 'id2',
  name: 'Weiqing 2406',
  startWorkDate: null,
  title: 'Title 2',
  username: 'weiquu',
};

const comment1: CommentActivity = {
  author: user1,
  createdAt: 1705651802574,
  description: 'This is the latest code review but not a question',
  isQuestion: false,
  recipient: user2,
  submission: user2Submission1,
  type: 'CODE_REVIEW',
};

const comment2: CommentActivity = {
  author: user1,
  createdAt: 1704651802574,
  description: 'This is an earlier code review and a question',
  isQuestion: true,
  recipient: user2,
  submission: user2Submission1,
  type: 'CODE_REVIEW',
};

const comment3: CommentActivity = {
  author: user1,
  createdAt: 1705651801574,
  description: 'This is the second latest code review and a question',
  isQuestion: true,
  recipient: user2,
  submission: user2Submission2,
  type: 'CODE_REVIEW',
};

const comment4: CommentActivity = {
  author: user1,
  createdAt: 1703651802574,
  description: 'This is an even earlier code review but not a question',
  isQuestion: false,
  recipient: user2,
  submission: user2Submission2,
  type: 'CODE_REVIEW',
};

const data = [comment1, comment2, comment3, comment4];

export default function ProjectsCodeReviewsTab() {
  const intl = useIntl();
  const sortedData = data.sort((a, b) => b.createdAt - a.createdAt);
  const indexOfFirstCommentOlderThanAWeek = sortedData.findIndex((comment) => {
    const now = new Date();
    const diff = Math.abs(now.getTime() - comment.createdAt);
    const diffDays = Math.floor(diff / (1000 * 3600 * 24));

    return diffDays > 7;
  });
  const indexOfFirstCommentOlderThanAMonth = sortedData.findIndex((comment) => {
    const now = new Date();
    const diff = Math.abs(now.getTime() - comment.createdAt);
    const diffDays = Math.floor(diff / (1000 * 3600 * 24));

    return diffDays > 30;
  });
  const commentsLessThanAWeek = sortedData.slice(
    0,
    indexOfFirstCommentOlderThanAWeek,
  );
  const commentsAWeekToAMonth = sortedData.slice(
    indexOfFirstCommentOlderThanAWeek,
    indexOfFirstCommentOlderThanAMonth,
  );
  const commentsOlderThanAMonth = sortedData.slice(
    indexOfFirstCommentOlderThanAMonth,
  );

  const codeReviews = [
    {
      comments: commentsLessThanAWeek,
      title: intl.formatMessage({
        defaultMessage: 'Earlier',
        description: 'Title for earlier list of code reviews',
        id: 'buCV7d',
      }),
    },
    {
      comments: commentsAWeekToAMonth,
      title: intl.formatMessage({
        defaultMessage: 'Last week',
        description: 'Title for last week list of code reviews',
        id: 'BUK7YK',
      }),
    },
    {
      comments: commentsOlderThanAMonth,
      title: intl.formatMessage({
        defaultMessage: 'Last month',
        description: 'Title for last month list of code reviews',
        id: 'ZqRybm',
      }),
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      {codeReviews.map((codeReview) => (
        <ProjectsCommentList
          key={codeReview.title}
          comments={codeReview.comments}
          title={codeReview.title}
        />
      ))}
    </div>
  );
}
