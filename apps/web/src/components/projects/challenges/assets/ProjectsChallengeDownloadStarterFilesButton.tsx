import { RiFolderDownloadLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import { useToast } from '~/components/global/toasts/useToast';
import Button from '~/components/ui/Button';

type Props = Readonly<{
  size: React.ComponentProps<typeof Button>['size'];
  slug: string;
}>;

export default function ProjectsChallengeDownloadStarterFilesButton({
  slug,
  size,
}: Props) {
  const { showToast } = useToast();
  const intl = useIntl();
  const downloadStarterFilesMutation =
    trpc.projects.challenge.downloadStarterFiles.useMutation();

  return (
    <Button
      addonPosition="start"
      icon={RiFolderDownloadLine}
      isDisabled={downloadStarterFilesMutation.isLoading}
      isLoading={downloadStarterFilesMutation.isLoading}
      label={intl.formatMessage({
        defaultMessage: 'Starter files',
        description:
          'Label for "Download starter files" button on Projects project page',
        id: 'pYk6+0',
      })}
      size={size}
      variant="primary"
      onClick={async () => {
        downloadStarterFilesMutation.mutate(
          {
            slug,
          },
          {
            onError() {
              showToast({
                title: intl.formatMessage({
                  defaultMessage: 'Error downloading file',
                  description: 'Error message',
                  id: 'ETNZXt',
                }),
                variant: 'danger',
              });
            },
            onSuccess({ signedUrl }) {
              window.location.href = signedUrl;
            },
          },
        );
      }}
    />
  );
}
