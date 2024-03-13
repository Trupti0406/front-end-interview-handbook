'use client';

import clsx from 'clsx';
import type {
  ProjectsChallengeAPIWriteup,
  ProjectsChallengeStyleGuide,
} from 'contentlayer/generated';
import { useState } from 'react';
import {
  RiArrowRightLine,
  RiBrush2Fill,
  RiCheckboxCircleFill,
  RiCodeSSlashLine,
  RiDownload2Line,
  RiDragMove2Fill,
  RiLock2Line,
} from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import BlurOverlay from '~/components/common/BlurOverlay';
import { useProjectsChallengeSessionContext } from '~/components/projects/challenges/session/ProjectsChallengeSessionContext';
import type { ProjectsChallengeItem } from '~/components/projects/challenges/types';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Spinner from '~/components/ui/Spinner';
import type { TabItem } from '~/components/ui/Tabs';
import Tabs from '~/components/ui/Tabs';
import Text from '~/components/ui/Text';
import {
  themeBackgroundEmphasized,
  themeBorderColor,
  themeTextColor,
} from '~/components/ui/theme';

import ProjectsChallengeAssetsResponsiveBreakpointsTab from './ProjectsChallengeAssetsResponsiveBreakpointsTab';
import useProjectsChallengeProvidedResources from './useProjectsChallengeProvidedResources';
import ProjectsChallengePremiumPaywall from '../premium/ProjectsChallengePremiumPaywall';
import ProjectsChallengeMdxContent from '../../common/ProjectsChallengeMdxContent';
import type { ProjectsViewerProjectsProfile } from '../../types';

type OnlineAssetsTabType = 'api' | 'responsive-breakpoints' | 'style-guide';

function useOnlineAssetsTabs(hasStyleGuide: boolean, hasAPIWriteup: boolean) {
  const intl = useIntl();

  const tabs: Array<TabItem<OnlineAssetsTabType>> = [
    {
      icon: RiDragMove2Fill,
      label: intl.formatMessage({
        defaultMessage: 'Responsive breakpoints',
        description: 'Project assets category label',
        id: '5BQAdK',
      }),
      value: 'responsive-breakpoints',
    },
  ];

  if (hasStyleGuide) {
    tabs.push({
      icon: RiBrush2Fill,
      label: intl.formatMessage({
        defaultMessage: 'Basic style guide',
        description: 'Project assets category label',
        id: 'jVhr66',
      }),
      value: 'style-guide',
    });
  }

  if (hasAPIWriteup) {
    tabs.push({
      icon: RiCodeSSlashLine,
      label: intl.formatMessage({
        defaultMessage: 'API',
        description: 'Project assets category label',
        id: 'NkqgLg',
      }),
      value: 'api',
    });
  }

  return tabs;
}

type Props = Readonly<{
  apiWriteup?: ProjectsChallengeAPIWriteup;
  challenge: ProjectsChallengeItem;
  styleGuide?: ProjectsChallengeStyleGuide;
  viewerProjectsProfile: ProjectsViewerProjectsProfile | null;
  viewerUnlockedAccess: boolean;
}>;

export default function ProjectsChallengeAssetsPage({
  apiWriteup,
  challenge,
  styleGuide,
  viewerProjectsProfile,
  viewerUnlockedAccess,
}: Props) {
  const intl = useIntl();
  const { metadata } = challenge;

  const { startProject, accessAllSteps, fetchingCanAccessAllSteps } =
    useProjectsChallengeSessionContext();
  const resources = useProjectsChallengeProvidedResources();
  const onlineAssetsTabs = useOnlineAssetsTabs(
    styleGuide != null,
    apiWriteup != null,
  );
  const [onlineAssetsTab, setOnlineAssetsTab] = useState<OnlineAssetsTabType>(
    'responsive-breakpoints',
  );

  const canAccess = viewerProjectsProfile?.premium && viewerUnlockedAccess;
  const showPaywall = challenge.metadata.access === 'premium' && !canAccess;

  const overlay = showPaywall ? (
    <ProjectsChallengePremiumPaywall {...viewerProjectsProfile} />
  ) : (
    <div
      className={clsx(
        'flex flex-col items-center gap-y-6',
        'mx-auto max-w-lg',
        'text-center',
      )}>
      {fetchingCanAccessAllSteps ? (
        <Spinner size="md" />
      ) : (
        <>
          <Heading className="text-center drop-shadow" level="heading5">
            <FormattedMessage
              defaultMessage="You can download assets after starting the project"
              description="Title for project overlay on projects details page"
              id="all5El"
            />
          </Heading>
          <div
            className={clsx(
              'flex flex-col rounded-lg p-4',
              themeBackgroundEmphasized,
            )}>
            <Text size="body0" weight="bold">
              <FormattedMessage
                defaultMessage="Assets provided"
                description="Label for Assets Provided card on start project overlay on Projects project assets page"
                id="gRN6GJ"
              />
            </Text>
            <ul className="mt-4">
              {resources.map(({ id, label }) => (
                <li key={id} className="flex gap-2.5">
                  <RiCheckboxCircleFill
                    aria-hidden={true}
                    className={clsx('mt-1 h-3 w-3 shrink-0', themeTextColor)}
                  />
                  <Text size="body2">{label}</Text>
                </li>
              ))}
            </ul>
          </div>
          <Button
            label={intl.formatMessage({
              defaultMessage: 'Start project',
              description:
                'Label for Start Project button on Projects project assets page',
              id: '4BBxZ1',
            })}
            size="md"
            variant="primary"
            onClick={startProject}
          />
        </>
      )}
    </div>
  );

  // TODO(projects): integrate with unlock credits.
  const unlockedProjects = true;

  return (
    <BlurOverlay
      align="center"
      maxHeight={500}
      overlay={overlay}
      showOverlay={!accessAllSteps}>
      <div className="flex flex-col items-stretch">
        <div className="grid grid-cols-1 gap-x-6 gap-y-12 lg:grid-cols-4">
          <div
            className={clsx('flex flex-col gap-6 pr-6', [
              'lg:border-r',
              themeBorderColor,
            ])}>
            <Heading level="heading6">
              <FormattedMessage
                defaultMessage="To download"
                description="Title for To Download section on Projects project assets page"
                id="Ju61WC"
              />
            </Heading>
            <Section>
              <div className="flex flex-col gap-4">
                <Button
                  addonPosition="start"
                  href={metadata.downloadStarterFilesHref}
                  icon={RiCodeSSlashLine}
                  label={intl.formatMessage({
                    defaultMessage: 'Starter code + assets',
                    description:
                      'Label for Starter Code button on Projects project assets page',
                    id: 'Nemz26',
                  })}
                  size="lg"
                  variant="secondary"
                />
                <Button
                  addonPosition="start"
                  href={
                    unlockedProjects
                      ? metadata.downloadDesignFileHref
                      : undefined
                  }
                  icon={unlockedProjects ? RiDownload2Line : RiLock2Line}
                  label={intl.formatMessage({
                    defaultMessage: 'Figma design file',
                    description:
                      'Label for Figma Design File button on Projects project assets page',
                    id: 'GUmfcW',
                  })}
                  size="lg"
                  variant={unlockedProjects ? 'special' : 'secondary'}
                />
                {!viewerProjectsProfile?.premium && (
                  <>
                    <Text color="subtle" size="body3">
                      <FormattedMessage
                        defaultMessage="Purchase Premium to unlock access to the design file. Build accurately and learn to work with production-level specifications."
                        description="CTA for Figma Design File button on Projects project assets page"
                        id="qmU2/H"
                      />
                    </Text>
                    <Button
                      className="-ms-3 self-start"
                      href="/projects/pricing"
                      icon={RiArrowRightLine}
                      label={intl.formatMessage({
                        defaultMessage: 'View plans',
                        description:
                          'Label for View Plans button on Projects project assets page',
                        id: 'BHvjJJ',
                      })}
                      size="sm"
                      variant="tertiary"
                    />
                  </>
                )}
              </div>
            </Section>
          </div>
          <div className="flex flex-1 flex-col gap-6 lg:col-span-3">
            <Heading className="lg:sr-only" level="heading6">
              <FormattedMessage
                defaultMessage="Online assets"
                description="Title for Online Assets section on Projects project assets page"
                id="2gImEH"
              />
            </Heading>
            <Section>
              <Tabs
                label={intl.formatMessage({
                  defaultMessage: 'Select online asset type',
                  description: 'Label for tabs to select online asset type',
                  id: 'ZsOMcv',
                })}
                size="sm"
                tabs={onlineAssetsTabs}
                value={onlineAssetsTab}
                onSelect={setOnlineAssetsTab}
              />
              {onlineAssetsTab === 'responsive-breakpoints' && (
                <ProjectsChallengeAssetsResponsiveBreakpointsTab
                  challenge={challenge}
                />
              )}
              {onlineAssetsTab === 'style-guide' && styleGuide != null && (
                <div className="pt-2">
                  <ProjectsChallengeMdxContent mdxCode={styleGuide.body.code} />
                </div>
              )}
              {onlineAssetsTab === 'api' && apiWriteup != null && (
                <div className="pt-2">
                  <ProjectsChallengeMdxContent mdxCode={apiWriteup.body.code} />
                </div>
              )}
            </Section>
          </div>
        </div>
      </div>
    </BlurOverlay>
  );
}
