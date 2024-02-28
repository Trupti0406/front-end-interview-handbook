import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { z } from 'zod';

import { trpc } from '~/hooks/trpc';

import UserProfileInformationRow from '~/components/profile/info/UserProfileInformationRow';
import {
  getDiscussionsCommentBodyAttributes,
  useDiscussionsCommentBodySchema,
} from '~/components/projects/discussions/ProjectsDiscussionsCommentBodySchema';
import type { ProjectsDiscussionsCommentAuthor } from '~/components/projects/discussions/types';
import ProjectsProfileAvatar from '~/components/projects/users/ProjectsProfileAvatar';
import Button from '~/components/ui/Button';
import CheckboxInput from '~/components/ui/CheckboxInput';
import RichTextEditor from '~/components/ui/RichTextEditor';
import Text from '~/components/ui/Text';

import type { ProjectsChallengeItem } from '../types';
import ProjectsProfileDisplayNameLink from '../../users/ProjectsProfileDisplayNameLink';

import { zodResolver } from '@hookform/resolvers/zod';

type Props = Readonly<{
  challenge: ProjectsChallengeItem;
  viewer: ProjectsDiscussionsCommentAuthor;
}>;

type CommentFormInput = Readonly<{
  body: string;
  isQuestion: boolean;
}>;

export default function ProjectsChallengeDiscussionsNewComment({
  challenge,
  viewer,
}: Props) {
  const intl = useIntl();
  const [editorRerenderKey, setEditorRerenderKey] = useState(0);
  const createCommentMutation = trpc.projects.comments.create.useMutation();
  const attrs = getDiscussionsCommentBodyAttributes(intl);
  const discussionsCommentBodySchema = useDiscussionsCommentBodySchema();

  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CommentFormInput>({
    defaultValues: {
      body: '',
      isQuestion: false,
    },
    mode: 'onSubmit',
    resolver: zodResolver(
      z.object({
        body: discussionsCommentBodySchema,
        isQuestion: z.boolean(),
      }),
    ),
  });

  const onSubmit: SubmitHandler<CommentFormInput> = (data) => {
    return createCommentMutation.mutate(
      {
        body: data.body,
        category: data.isQuestion ? 'QUESTION' : undefined,
        domain: 'PROJECTS_CHALLENGE',
        entityId: challenge.metadata.slug,
      },
      {
        onSuccess: () => {
          setEditorRerenderKey((prevKey) => prevKey + 1);
          reset();
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center gap-4">
        <ProjectsProfileAvatar
          points={viewer.points}
          profile={viewer.userProfile}
          size="xl"
        />
        <div className="flex flex-col gap-y-1">
          <Text size="body2" weight="medium">
            <ProjectsProfileDisplayNameLink profile={viewer.userProfile} />
          </Text>
          <UserProfileInformationRow
            profile={viewer.userProfile}
            size="body3"
          />
        </div>
      </div>
      <div className="my-3">
        <RichTextEditor
          key={editorRerenderKey}
          disabled={createCommentMutation.isLoading}
          errorMessage={errors.body?.message}
          isLabelHidden={true}
          label={intl.formatMessage({
            defaultMessage: 'Discussion post comment',
            description: 'Label for discussion post input textarea',
            id: 'NA1S3Z',
          })}
          minHeight="100px"
          placeholder={attrs.placeholder}
          required={true}
          value={getValues('body')}
          onChange={(value) => setValue('body', value)}
        />
      </div>
      <CheckboxInput
        disabled={createCommentMutation.isLoading}
        label={intl.formatMessage({
          defaultMessage: 'Post as question',
          description: 'Label for toggle to post as question',
          id: 'WoEmKY',
        })}
        {...register('isQuestion')}
        // For some reason RHF doesn't work with uncontrolled checkboxes.
        // Spent an hour debugging still can't find the reason.
        onChange={(value) => setValue('isQuestion', value)}
      />
      <div className="mt-4 flex items-center gap-4">
        <Button
          className="w-[120px]"
          isDisabled={createCommentMutation.isLoading}
          isLoading={createCommentMutation.isLoading}
          label={intl.formatMessage({
            defaultMessage: 'Post',
            description: 'Label for post button on project discussions page',
            id: 'bnqijt',
          })}
          type="submit"
          variant="primary"
        />
      </div>
    </form>
  );
}
