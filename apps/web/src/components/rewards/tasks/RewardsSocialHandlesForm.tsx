import clsx from 'clsx';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';
import TextInput from '~/components/ui/TextInput';
import { themeDivideColor } from '~/components/ui/theme';

import {
  cleanGitHubUserInput,
  cleanLinkedInUserInput,
  cleanTwitterUserInput,
} from './RewardsSocialHandlesUtils';

export type RewardsHandlesData = Readonly<{
  gitHubUsername: string;
  linkedInUsername: string;
  twitterUsername: string;
}>;

type RewardsHandlesValidation = Readonly<{
  gitHub: PromiseSettledResult<void>;
  linkedIn: PromiseSettledResult<void>;
  twitter: PromiseSettledResult<void>;
}>;

type Props = Readonly<{
  handlesData: RewardsHandlesData;
  onHandlesDataChange: (newData: RewardsHandlesData) => void;
  onNextStage: (handlesData: RewardsHandlesData) => void;
}>;

export default function RewardsSocialHandlesForm({
  handlesData,
  onHandlesDataChange,
  onNextStage,
}: Props) {
  const { mutate: verifySocialHandles, isLoading } =
    trpc.rewards.verifySocialHandles.useMutation();
  const [validationErrors, setValidationErrors] =
    useState<RewardsHandlesValidation | null>(null);
  const [hasError, setHasError] = useState(false);

  return (
    <form
      className="flex w-full flex-col gap-2"
      onSubmit={(event) => {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        const data = {
          gitHubUsername: cleanGitHubUserInput(
            (formData.get('github') ?? '').toString(),
          ),
          linkedInUsername: cleanLinkedInUserInput(
            (formData.get('linkedin') ?? '').toString(),
          ),
          twitterUsername: cleanTwitterUserInput(
            (formData.get('twitter') ?? '').toString(),
          ),
        };

        setHasError(false);
        setValidationErrors(null);
        verifySocialHandles(data, {
          onError: () => {
            setHasError(true);
          },
          onSuccess: (res) => {
            if (res.allValid) {
              onNextStage(data);

              return;
            }

            setValidationErrors(res.fields);
          },
        });
      }}>
      <Text className="block" color="secondary" size="body2">
        <FormattedMessage
          defaultMessage="Please enter your social media handles for us to verify."
          description="Rewards campaign help text"
          id="ZYXIkT"
        />
      </Text>
      <div className={clsx('w-full divide-y', themeDivideColor)}>
        <div className="flex items-center justify-between gap-4 py-4">
          <Text size="body2">GitHub</Text>{' '}
          <div className="w-full max-w-sm">
            <TextInput
              autoFocus={true}
              errorMessage={
                validationErrors?.gitHub.status === 'rejected'
                  ? validationErrors?.gitHub.reason
                  : undefined
              }
              isDisabled={isLoading}
              isLabelHidden={true}
              label="GitHub"
              name="github"
              placeholder="https://github.com/john-doe"
              value={handlesData.gitHubUsername}
              onChange={(value) => {
                onHandlesDataChange({
                  ...handlesData,
                  gitHubUsername: value,
                });
              }}
            />
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 py-4">
          <Text size="body2">LinkedIn</Text>
          <div className="w-full max-w-sm">
            <TextInput
              errorMessage={
                validationErrors?.linkedIn.status === 'rejected'
                  ? validationErrors?.linkedIn.reason
                  : undefined
              }
              isDisabled={isLoading}
              isLabelHidden={true}
              label="LinkedIn"
              name="linkedin"
              placeholder="https://linkedin.com/in/john-doe"
              value={handlesData.linkedInUsername}
              onChange={(value) => {
                onHandlesDataChange({
                  ...handlesData,
                  linkedInUsername: value,
                });
              }}
            />
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 py-4">
          <Text size="body2">Twitter</Text>
          <div className="w-full max-w-sm">
            <TextInput
              className="w-full"
              errorMessage={
                validationErrors?.twitter.status === 'rejected'
                  ? validationErrors?.twitter.reason
                  : undefined
              }
              isDisabled={isLoading}
              isLabelHidden={true}
              label="Twitter"
              name="twitter"
              placeholder="https://twitter.com/john-doe"
              value={handlesData.twitterUsername}
              onChange={(value) => {
                onHandlesDataChange({
                  ...handlesData,
                  twitterUsername: value,
                });
              }}
            />
          </div>
        </div>
      </div>
      {hasError && (
        <Text className="block" color="error" size="body2">
          <FormattedMessage
            defaultMessage="Invalid inputs. Please check that you have filled in the username or profile URL correctly."
            description="Form error text"
            id="kK7Cf2"
          />
        </Text>
      )}
      <div className="flex justify-end">
        <Button
          isDisabled={isLoading}
          isLoading={isLoading}
          label="Next"
          size="sm"
          type="submit"
          variant="primary"
        />
      </div>
    </form>
  );
}
