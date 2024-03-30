'use client';

import clsx from 'clsx';
import { RiRocketLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';
import usePagination from '~/hooks/usePagination';

import FilterButton from '~/components/common/FilterButton';
import ProjectsChallengeCard from '~/components/projects/challenges/lists/ProjectsChallengeCard';
import useProjectsSessionStatusFilter from '~/components/projects/profile/progress/useProjectsSessionStatusFilter';
import EmptyState from '~/components/ui/EmptyState';
import Pagination from '~/components/ui/Pagination';
import Spinner from '~/components/ui/Spinner';
import { themeTextColor } from '~/components/ui/theme';

import { ProjectsChallengeSessionStatus } from '@prisma/client';

type Props = Readonly<{
  isViewerPremium: boolean;
  isViewingOwnProfile: boolean;
  targetUserId: string;
}>;

const ITEMS_PER_PAGE = 6;

export default function ProjectsProfileProgressAllChallengesTab({
  isViewingOwnProfile,
  isViewerPremium,
  targetUserId,
}: Props) {
  const intl = useIntl();

  const [challengeFilter, challengeFilterOptions] =
    useProjectsSessionStatusFilter({
      initialValue: 'IN_PROGRESS',
      namespace: 'all-challenges',
    });

  const { data: allSessions, isLoading } = trpc.projects.sessions.list.useQuery(
    {
      orderBy: 'desc',
      statuses: [
        ProjectsChallengeSessionStatus.IN_PROGRESS,
        ProjectsChallengeSessionStatus.COMPLETED,
      ],
      userId: targetUserId,
    },
  );

  const shownSessions = allSessions
    ?.filter((session) => {
      return challengeFilterOptions.matches(session);
    })
    .filter((session, index, self) => {
      return (
        self.findIndex(
          (s) =>
            s.challenge?.metadata.slug === session.challenge?.metadata.slug,
        ) === index
      );
    });

  // Pagination
  const {
    currentPageItems: currentPageSessions,
    totalPages,
    setCurrentPage,
    currentPage,
  } = usePagination({
    deps: [],
    itemsPerPage: ITEMS_PER_PAGE,
    totalList: shownSessions,
  });

  const emptyState = (
    <EmptyState
      icon={RiRocketLine}
      iconClassName={themeTextColor}
      subtitle={
        isViewingOwnProfile
          ? intl.formatMessage({
              defaultMessage:
                'You have not started any projects matching those filters.',
              description:
                'Subtitle for no projects yet on projects progress tab',
              id: 'vvPx/k',
            })
          : intl.formatMessage({
              defaultMessage:
                'This user has not started any projects matching those filters.',
              description:
                'Subtitle for no projects yet on projects progress tab',
              id: 'Dt0MpD',
            })
      }
      title={intl.formatMessage({
        defaultMessage: 'No projects matching those filters',
        description: 'Title for no projects yet on projects progress tab',
        id: '+uw4/h',
      })}
    />
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-row gap-4">
        <fieldset>
          <legend className="sr-only">{challengeFilterOptions.name}</legend>
          <div className={clsx('flex flex-wrap items-center gap-2')}>
            {challengeFilterOptions.options.map(({ icon: Icon, ...option }) => (
              <FilterButton
                key={option.value}
                icon={Icon}
                label={String(option.label)}
                purpose="tab"
                selected={challengeFilter === option.value}
                tooltip={option.tooltip}
                onClick={() => challengeFilterOptions.onChange(option.value)}
              />
            ))}
          </div>
        </fieldset>
      </div>
      {(() => {
        if (isLoading) {
          return (
            <div className="flex h-20 w-full items-center justify-center">
              <Spinner size="md" />
            </div>
          );
        }
        if (currentPageSessions && currentPageSessions.length !== 0) {
          return (
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-6">
                {currentPageSessions.map((session) =>
                  session.challenge ? (
                    <ProjectsChallengeCard
                      key={session.id}
                      challenge={session.challenge}
                      isViewerPremium={isViewerPremium}
                      variant="card"
                    />
                  ) : null,
                )}
              </div>
              {totalPages > 1 && (
                <div className="flex items-center justify-between">
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onPageChange={(value) => setCurrentPage(value)}
                  />
                </div>
              )}
            </div>
          );
        }

        return emptyState;
      })()}
    </div>
  );
}
