import clsx from 'clsx';
import { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { z } from 'zod';

import { trpc } from '~/hooks/trpc';

import { useToast } from '~/components/global/toasts/useToast';
import {
  getProfileUsernameAttrs,
  useProfileUsernameSchema,
} from '~/components/profile/fields/ProfileUsernameSchema';
import Button from '~/components/ui/Button';
import TextInput from '~/components/ui/TextInput';
import { themeBorderColor } from '~/components/ui/theme';

import { getErrorMessage } from '~/utils/getErrorMessage';

import { zodResolver } from '@hookform/resolvers/zod';

type UserNameFormValues = Readonly<{
  username: string;
}>;

function useUsernameFormSchema() {
  const userNameSchema = useProfileUsernameSchema();

  return useMemo(
    () =>
      z.object({
        username: userNameSchema,
      }),
    [userNameSchema],
  );
}

export default function ProfileAccountUsername() {
  const intl = useIntl();
  const attrs = getProfileUsernameAttrs(intl);

  const toast = useToast();
  const userNameFormSchema = useUsernameFormSchema();
  const { data } = trpc.profile.getProfile.useQuery();
  const userNameUpdateMutation = trpc.profile.userNameUpdate.useMutation();

  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm<UserNameFormValues>({
    defaultValues: {
      username: '',
    },
    mode: 'all',
    resolver: zodResolver(userNameFormSchema),
    values: { username: data?.username ?? '' },
  });

  return (
    <div className={clsx('p-4', 'rounded-lg border', themeBorderColor)}>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(async (username) => {
          try {
            await userNameUpdateMutation.mutateAsync(username);
          } catch (error: unknown) {
            setError('username', { message: getErrorMessage(error) });

            return;
          }
          reset(username);
          toast.showToast({
            title: attrs.successMessage,
            variant: 'success',
          });
        })}>
        <Controller
          control={control}
          name="username"
          render={({ field }) => (
            <TextInput
              autoComplete="off"
              description={attrs.description}
              errorMessage={errors.username?.message}
              isDisabled={isSubmitting}
              label={attrs.label}
              maxLength={attrs.validation.maxLength}
              placeholder={attrs.placeholder}
              {...field}
            />
          )}
        />
        <div className="flex justify-end">
          <Button
            isDisabled={!isDirty || !isValid || isSubmitting}
            isLoading={isSubmitting}
            label={intl.formatMessage({
              defaultMessage: 'Save changes',
              description: 'Button label for a form',
              id: 'vSWYET',
            })}
            type="submit"
            variant="secondary"
          />
        </div>
      </form>
    </div>
  );
}
