import clsx from 'clsx';
import { useState } from 'react';
import { RiImageLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import ProjectsImageBreakpointButtonGroup from '~/components/projects/common/ProjectsImageBreakpointButtonGroup';
import {
  type ProjectsImageBreakpointCategory,
  ProjectsImageBreakpointDimensions,
} from '~/components/projects/common/ProjectsImageBreakpoints';
import ProjectsChallengeSubmissionImageComparisonSlider from '~/components/projects/submissions/ProjectsChallengeSubmissionImageComparisonSlider';
import type { ProjectsChallengeSubmissionDeploymentUrls } from '~/components/projects/submissions/types';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import {
  themeBorderBrandColor,
  themeBorderElementColor,
  themeOutlineElement_FocusVisible,
  themeOutlineElementBrandColor_FocusVisible,
} from '~/components/ui/theme';

import ProjectsImageViewer from './ProjectsImageViewer';
import type { ProjectsChallengeVariantImages } from '../challenges/types';

type Props = Readonly<{
  allowRetakeScreenshot?: boolean;
  deploymentUrls: ProjectsChallengeSubmissionDeploymentUrls;
  isTakingScreenshot: boolean;
  onTakeScreenshot: () => void;
  specImagesForVariant: ProjectsChallengeVariantImages;
  title?: string;
}>;

export default function ProjectsImageComparison({
  title,
  specImagesForVariant,
  deploymentUrls,
  ...props
}: Props) {
  const intl = useIntl();
  const [selectedBreakpoint, setSelectedBreakpoint] =
    useState<ProjectsImageBreakpointCategory>('desktop');
  const [selectedScreenIndex, setSelectedScreenIndex] = useState(0);

  const deploymentImagesForBreakpointWithComparison = (
    deploymentUrls ?? []
  ).map((deploymentUrlItem) => {
    const matchingComparisonImage = specImagesForVariant?.find(
      (comparisonImage) => comparisonImage.label === deploymentUrlItem.label,
    );

    return {
      image: deploymentUrlItem?.images?.[selectedBreakpoint] ?? '',
      label: deploymentUrlItem?.label,
      original: matchingComparisonImage?.images?.[selectedBreakpoint] ?? '',
    };
  });
  const { width } = ProjectsImageBreakpointDimensions[selectedBreakpoint];

  return (
    <div
      className={clsx(
        'flex flex-col overflow-hidden',
        'rounded-lg',
        ['border', themeBorderElementColor],
        'bg-neutral-50 dark:bg-neutral-950',
      )}>
      {/* Header */}
      {title && (
        <div
          className={clsx(
            'flex flex-col justify-between gap-4 md:flex-row',
            'px-4 py-4 md:px-6',
          )}>
          <Heading level="heading6">{title}</Heading>
          {'allowRetakeScreenshot' in props && props.allowRetakeScreenshot && (
            <Button
              addonPosition="start"
              icon={RiImageLine}
              isDisabled={props.isTakingScreenshot}
              isLoading={props.isTakingScreenshot}
              label={intl.formatMessage({
                defaultMessage: 'Retake screenshot',
                description: 'Retake screenshot button label',
                id: 'e0C2cj',
              })}
              tooltip={intl.formatMessage({
                defaultMessage:
                  'When your site URL was submitted, we automatically take screenshots of your pages. You can manually trigger retake with this button if your site has been updated',
                description: 'Tooltip for retake screenshot button',
                id: 'eNCfLw',
              })}
              variant="secondary"
              onClick={props.onTakeScreenshot}
            />
          )}
        </div>
      )}
      {/* Image Comparison Slider */}
      <div className="flex-1">
        {deploymentImagesForBreakpointWithComparison[selectedScreenIndex]
          .original ? (
          <ProjectsChallengeSubmissionImageComparisonSlider
            aspectRatio="7/3"
            image={
              deploymentImagesForBreakpointWithComparison[selectedScreenIndex]
                .image
            }
            maxWidth={width}
            originalImage={
              deploymentImagesForBreakpointWithComparison[selectedScreenIndex]
                .original
            }
          />
        ) : (
          <ProjectsImageViewer
            alt={
              deploymentImagesForBreakpointWithComparison[selectedScreenIndex]
                .label
            }
            aspectRatio="7/3"
            grid={ProjectsImageBreakpointDimensions[selectedBreakpoint].grid}
            src={
              deploymentImagesForBreakpointWithComparison[selectedScreenIndex]
                .image
            }
            width={width}
          />
        )}
      </div>
      {/* Footer */}
      <div
        className={clsx(
          'grid grid-cols-2 gap-4',
          deploymentImagesForBreakpointWithComparison.length > 1 &&
            'md:grid-cols-4',
          'px-4 py-4 md:px-6',
          'w-full',
          ['border-t', themeBorderElementColor],
        )}>
        <div className={clsx('col-span-1 flex flex-col justify-center')}>
          <Text color="secondary" size="body1" weight="medium">
            {
              deploymentImagesForBreakpointWithComparison[selectedScreenIndex]
                .label
            }
          </Text>
          {deploymentUrls && (
            <Text className="block truncate whitespace-nowrap" size="body2">
              <Anchor
                href={deploymentUrls[selectedScreenIndex].href}
                warnAboutExternalLink={true}>
                {deploymentUrls[selectedScreenIndex].href}
              </Anchor>
            </Text>
          )}
        </div>
        <div className="col-span-1 flex items-center justify-end md:order-last">
          <ProjectsImageBreakpointButtonGroup
            breakpoint={selectedBreakpoint}
            setBreakpoint={setSelectedBreakpoint}
          />
        </div>
        {deploymentImagesForBreakpointWithComparison.length > 1 && (
          <div className={clsx('flex justify-center gap-2', 'col-span-2')}>
            {deploymentImagesForBreakpointWithComparison.map((page, index) => (
              <button
                key={page.label}
                aria-label={page.label}
                className={clsx(
                  'size-12 overflow-clip rounded',
                  'border',
                  index === selectedScreenIndex
                    ? themeBorderBrandColor
                    : themeBorderElementColor,
                  themeOutlineElement_FocusVisible,
                  themeOutlineElementBrandColor_FocusVisible,
                )}
                type="button"
                onClick={() => setSelectedScreenIndex(index)}>
                <img
                  alt={page.label}
                  className="size-full object-cover"
                  src={page.image}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}