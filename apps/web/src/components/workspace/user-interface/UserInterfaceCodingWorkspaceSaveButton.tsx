import { useEffect, useState } from 'react';

import { trpc } from '~/hooks/trpc';

import { useToast } from '~/components/global/toasts/ToastsProvider';
import type { QuestionUserInterface } from '~/components/questions/common/QuestionsTypes';
import Button from '~/components/ui/Button';
import Dialog from '~/components/ui/Dialog';
import Divider from '~/components/ui/Divider';
import Text from '~/components/ui/Text';
import TextInput from '~/components/ui/TextInput';

import { useI18nRouter } from '~/next-i18nostic/src';
import { staticUpperCase } from '~/utils/typescript/stringTransform';

import { useUserInterfaceCodingWorkspaceSavesContext } from './UserInterfaceCodingWorkspaceSaveContext';

import { useSandpack } from '@codesandbox/sandpack-react';
import type { QuestionUserInterfaceSave } from '@prisma/client';

function UpdateSaveButton({
  save,
}: Readonly<{
  save: QuestionUserInterfaceSave;
}>) {
  const { showToast } = useToast();
  const { sandpack } = useSandpack();
  const { files } = sandpack;
  const userInterfaceUpdateSubmissionMutation =
    trpc.questionSave.userInterfaceUpdate.useMutation({
      onSuccess: () => {
        showToast({
          title: `Successfully updated "${save.name}"`,
          variant: 'info',
        });
      },
    });

  return (
    <Button
      isDisabled={userInterfaceUpdateSubmissionMutation.isLoading}
      isLoading={userInterfaceUpdateSubmissionMutation.isLoading}
      label="Save"
      size="xs"
      variant="primary"
      onClick={() => {
        userInterfaceUpdateSubmissionMutation.mutate({
          files: JSON.stringify(files),
          saveId: save!.id,
        });
      }}
    />
  );
}

function NewSaveButton({
  question,
}: Readonly<{
  question: QuestionUserInterface;
}>) {
  const router = useI18nRouter();
  const { showToast } = useToast();
  const { data: saves } = trpc.questionSave.userInterfaceGetAll.useQuery({
    slug: question.metadata.slug,
  });

  const { sandpack } = useSandpack();
  const { files } = sandpack;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const numberOfSaves: number = saves?.length ?? 0;
  const [saveName, setSaveName] = useState(`Attempt ${numberOfSaves + 1}`);

  const userInterfaceAddSubmissionMutation =
    trpc.questionSave.userInterfaceAdd.useMutation({
      onSuccess: (data) => {
        setIsDialogOpen(false);
        showToast({
          title: `Successfully created "${saveName}"`,
          variant: 'success',
        });
        // TODO(submission): Add study list parameter if exists.
        router.push(
          `/questions/user-interface/${question.metadata.slug}/s/${data?.id}`,
        );
      },
    });

  useEffect(() => {
    setSaveName(`Attempt ${numberOfSaves + 1}`);
  }, [numberOfSaves]);

  function saveToServer() {
    userInterfaceAddSubmissionMutation.mutate({
      files: JSON.stringify(files),
      framework: staticUpperCase(question.framework),
      name: saveName || `Attempt ${numberOfSaves + 1}`,
      slug: question.metadata.slug,
    });
  }

  return (
    <>
      <Button
        isDisabled={userInterfaceAddSubmissionMutation.isLoading}
        isLoading={userInterfaceAddSubmissionMutation.isLoading}
        label="Save to cloud"
        size="xs"
        variant="primary"
        onClick={() => {
          setIsDialogOpen(true);
        }}
      />
      <Dialog
        isShown={isDialogOpen}
        primaryButton={
          <Button
            isDisabled={userInterfaceAddSubmissionMutation.isLoading}
            isLoading={userInterfaceAddSubmissionMutation.isLoading}
            label="Save"
            variant="primary"
            onClick={() => {
              saveToServer();
            }}
          />
        }
        secondaryButton={
          <Button
            isDisabled={userInterfaceAddSubmissionMutation.isLoading}
            label="Cancel"
            variant="secondary"
            onClick={() => {
              setIsDialogOpen(false);
            }}
          />
        }
        title="Save to cloud"
        onClose={() => {
          setIsDialogOpen(false);
        }}>
        <div className="flex flex-col gap-y-3">
          <Text color="secondary" display="block" size="custom">
            Your code will be saved into the database and can be retrieved from
            the{' '}
            <Text size="custom" weight="medium">
              "Saved versions"
            </Text>{' '}
            tab.
          </Text>
          <Divider />
          <form
            onSubmit={(event) => {
              event.preventDefault();
              saveToServer();
            }}>
            <TextInput
              autoFocus={true}
              isDisabled={userInterfaceAddSubmissionMutation.isLoading}
              label="Name your save"
              placeholder="My awesome code"
              value={saveName}
              onChange={setSaveName}
            />
          </form>
        </div>
      </Dialog>
    </>
  );
}

export default function UserInterfaceCodingWorkspaceSaveButton({
  question,
}: Readonly<{
  question: QuestionUserInterface;
}>) {
  const { save } = useUserInterfaceCodingWorkspaceSavesContext();
  const hasExistingSave = save != null;

  return (
    <div>
      {hasExistingSave ? (
        <UpdateSaveButton save={save} />
      ) : (
        <NewSaveButton question={question} />
      )}
    </div>
  );
}
