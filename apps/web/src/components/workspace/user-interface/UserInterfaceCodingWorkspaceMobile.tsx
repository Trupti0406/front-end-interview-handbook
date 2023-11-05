import clsx from 'clsx';
import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';
import { useMediaQuery } from 'usehooks-ts';

import { themeLineColor } from '~/components/ui/theme';

// Bug in Sandpack, cannot lazy load the preview otherwise
// the bundling isn't triggered and no preview is shown.
import { SandpackPreview } from '@codesandbox/sandpack-react';

const SandpackLayout = dynamic(
  async () => {
    const { SandpackLayout: SandpackLayoutModule } = await import(
      '@codesandbox/sandpack-react'
    );

    return {
      default: SandpackLayoutModule,
    };
  },
  {
    ssr: false,
  },
);
const SandpackFileExplorer = dynamic(
  async () => {
    const { SandpackFileExplorer: SandpackFileExplorerModule } = await import(
      '@codesandbox/sandpack-react'
    );

    return {
      default: SandpackFileExplorerModule,
    };
  },
  {
    ssr: false,
  },
);
const SandpackCodeEditor = dynamic(
  async () => {
    const { SandpackCodeEditor: SandpackCodeEditorModule } = await import(
      '@codesandbox/sandpack-react'
    );

    return {
      default: SandpackCodeEditorModule,
    };
  },
  {
    ssr: false,
  },
);

export default function UserInterfaceCodingWorkspaceMobile({
  topAddOn,
}: Readonly<{
  topAddOn: ReactNode;
}>) {
  const laptopAndAbove = useMediaQuery('(min-width: 1024px)');

  if (laptopAndAbove) {
    return null;
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-y-4 px-4 pb-4 md:gap-y-6">
      {topAddOn}
      <SandpackLayout>
        <SandpackFileExplorer />
        <SandpackCodeEditor />
      </SandpackLayout>
      <div className={clsx('flex h-[500px] rounded border', themeLineColor)}>
        <SandpackPreview showNavigator={true} showOpenInCodeSandbox={false} />
      </div>
    </div>
  );
}
