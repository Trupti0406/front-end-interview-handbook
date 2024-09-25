import { cookies } from 'next/headers';

import { currentExperiment } from '~/components/experiments';
import FeedbackWidget from '~/components/global/feedback/FeedbackWidget';
import InterviewsSidebarContainer from '~/components/interviews/common/InterviewsSidebarContainer';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function SidebarExpandedLayout({ children }: Props) {
  return (
    <div className="flex">
      <InterviewsSidebarContainer
        showNewSidebar={
          cookies().get(currentExperiment.name)?.value ===
          currentExperiment.variants.b
        }
      />
      <div className="relative w-0 grow">{children}</div>
      <FeedbackWidget />
    </div>
  );
}