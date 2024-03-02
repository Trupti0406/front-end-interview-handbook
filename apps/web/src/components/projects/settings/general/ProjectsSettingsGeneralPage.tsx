'use client';

import clsx from 'clsx';

import useUserProfile from '~/hooks/user/useUserProfile';

import SupabaseAuthUpdatePassword from '~/components/auth/SupabaseAuthUpdatePassword';
import Timestamp from '~/components/common/Timestamp';
import ProfileAccountEmail from '~/components/profile/fields/ProfileAccountEmail';
import Heading from '~/components/ui/Heading';
import Spinner from '~/components/ui/Spinner';
import Text from '~/components/ui/Text';
import { themeBorderColor } from '~/components/ui/theme';

import { useUser } from '@supabase/auth-helpers-react';

export default function ProjectsSettingsGeneralPage() {
  const { userProfile } = useUserProfile();
  const user = useUser();

  if (userProfile == null) {
    return <Spinner size="lg" />;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <Heading level="heading5">Account settings</Heading>
        <Text color="secondary" size="body2">
          Joined on <Timestamp date={userProfile.createdAt} />
        </Text>
      </div>
      <div className="flex flex-col gap-6 md:max-w-md">
        {user && <ProfileAccountEmail user={user} />}
        <div className="flex flex-col gap-6 md:max-w-md">
          <div className={clsx('rounded-lg p-4', ['border', themeBorderColor])}>
            <SupabaseAuthUpdatePassword showTitle={false} />
          </div>
        </div>
      </div>
    </div>
  );
}