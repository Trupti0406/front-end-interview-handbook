import { useMemo, useState } from 'react';

import { DirectoryExplorerContext } from '~/components/common/directory-explorer/DirectoryExplorerContext';
import { ExplorerDirectory } from '~/components/common/directory-explorer/DirectoryExplorerItem';
import Alert from '~/components/ui/Alert';
import Text from '~/components/ui/Text';

import type { FileExplorerItem } from './types';
import {
  createDirectoriesFromFilePaths,
  getAllFilesInDirectory,
} from './utils';

import { useSandpack } from '@codesandbox/sandpack-react';

type Props = Readonly<{
  onOpenFile?: (fileName: string, fromFilePath?: string) => void;
  readOnly?: boolean;
}>;

export default function CodingWorkspaceExplorer({
  readOnly = true,
  onOpenFile,
}: Props) {
  const {
    sandpack: {
      files,
      setActiveFile,
      activeFile,
      addFile,
      openFile,
      closeFile,
      deleteFile,
      visibleFiles,
    },
  } = useSandpack();

  const { rootDirectory, directoryPaths } = useMemo(() => {
    return createDirectoriesFromFilePaths(Object.keys(files));
  }, [files]);

  const [openDirectories, setOpenDirectories] = useState(directoryPaths);
  const [renamingItem, setRenamingItem] = useState<string | null>(null);

  const renameFile = (oldPath: string, newPath: string) => {
    const file = files[oldPath];

    addFile(
      {
        [newPath]: file,
      },
      file.code,
      true,
    );
    closeFile(oldPath);
    deleteFile(oldPath, true);
    if (visibleFiles.includes(oldPath)) {
      openFile(newPath);
    }
    if (activeFile === oldPath) {
      setActiveFile(newPath);
    }
  };

  const handleRename = (item: FileExplorerItem, newPath: string) => {
    const { isDirectory, fullPath: oldPath } = item;

    setRenamingItem(null);
    if (oldPath === newPath) {
      return true;
    }
    if (Object.prototype.hasOwnProperty.call(files, newPath)) {
      return false;
    }
    if (isDirectory) {
      const affectedFiles = getAllFilesInDirectory(item);

      affectedFiles.forEach((file) => {
        const newFilePath = file.fullPath.replace(oldPath, newPath);

        renameFile(file.fullPath, newFilePath);
      });
      if (openDirectories.has(oldPath)) {
        const affectedDirectories = Array.from(openDirectories.keys()).filter(
          (directoryPath) => directoryPath.startsWith(oldPath),
        );
        const newOpenDirectories = new Set(openDirectories);

        affectedDirectories.forEach((oldDirectoryPath) => {
          newOpenDirectories.delete(oldDirectoryPath);
          newOpenDirectories.add(oldDirectoryPath.replace(oldPath, newPath));
        });
        setOpenDirectories(newOpenDirectories);
      }
    } else {
      renameFile(oldPath, newPath);
    }

    return true;
  };

  const handleDelete = (fullPath: string) => {
    const shouldDelete = confirm(
      `Are you sure you want to delete ${fullPath}?`,
    );

    if (!shouldDelete) {
      return;
    }

    closeFile(fullPath);
    deleteFile(fullPath);
  };

  return (
    <DirectoryExplorerContext.Provider
      value={{
        activeFile,
        cancelItemRename: () => {
          setRenamingItem(null);
        },
        deleteItem: handleDelete,
        openDirectories,
        readOnly,
        renameItem: handleRename,
        renamingItem,
        setActiveFile: (fullPath) => {
          openFile(fullPath);
          onOpenFile?.(fullPath);
          setActiveFile(fullPath);
        },
        setDirectoryOpen: (fullPath, open) => {
          const newOpenDirectories = new Set(openDirectories);

          if (open) {
            newOpenDirectories.add(fullPath);
          } else {
            newOpenDirectories.delete(fullPath);
          }
          setOpenDirectories(newOpenDirectories);
        },
        startItemRename: (fullPath) => {
          setRenamingItem(fullPath);
        },
      }}>
      <div className="flex w-full grow flex-col justify-between gap-y-3">
        <div className="flex w-full flex-col">
          <ExplorerDirectory {...rootDirectory} />
        </div>
        <Alert variant="warning">
          <Text size="body2">
            For now, files cannot be created or renamed. It's acceptable to
            write multiple components within a single file during interviews.
          </Text>
        </Alert>
      </div>
    </DirectoryExplorerContext.Provider>
  );
}
