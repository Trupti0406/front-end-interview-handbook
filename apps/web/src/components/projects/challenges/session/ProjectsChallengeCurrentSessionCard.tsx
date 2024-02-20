import clsx from 'clsx';
import { useState } from 'react';
import {
  RiArrowDownSLine,
  RiInformationLine,
  RiStopCircleLine,
  RiTimerLine,
} from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import Button from '~/components/ui/Button';
import Dialog from '~/components/ui/Dialog';
import Text from '~/components/ui/Text';
import {
  themeBackgroundCardColor,
  themeGlassyBorder,
  themeIconColor,
  themeTextSecondaryColor,
} from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

import ProjectsChallengeCurrentSessionSkillsForm from './ProjectsChallengeCurrentSessionSkillsForm';
import { useProjectsChallengeSessionContext } from './ProjectsChallengeSessionContext';
import type { ProjectsChallengeItem } from '../types';

import type { ProjectsChallengeSession } from '@prisma/client';

type Props = Readonly<{
  challenge: ProjectsChallengeItem;
  session: ProjectsChallengeSession;
}>;

export default function ProjectsChallengeCurrentProjectSessionCard({
  challenge,
  session,
}: Props) {
  const intl = useIntl();
  const [showEndSessionDialog, setShowEndSessionDialog] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const { endSession, isEndSessionLoading } =
    useProjectsChallengeSessionContext();

  const { submitHref, slug } = challenge.metadata;
  const { createdAt, roadmapSkills, techStackSkills } = session;
  const updateSessionSkillsMutation =
    trpc.projects.sessions.skillsUpdate.useMutation();

  const handleEndSession = async () => {
    await endSession(slug);
  };

  const expandButton = (
    <Button
      className={clsx('transition-transform', isExpanded && 'rotate-180')}
      icon={RiArrowDownSLine}
      isLabelHidden={true}
      label={
        isExpanded
          ? intl.formatMessage({
              defaultMessage: 'Collapse',
              description:
                'Label for "Collapse" button on current project session card',
              id: 'n2UNgq',
            })
          : intl.formatMessage({
              defaultMessage: 'More',
              description:
                'Label for "More" button on current project session card',
              id: 'dgTN/f',
            })
      }
      size="xs"
      variant="tertiary"
      onClick={() => setIsExpanded((expanded) => !expanded)}
    />
  );

  return (
    <>
      <Dialog
        isShown={showEndSessionDialog}
        primaryButton={
          <Button
            isDisabled={isEndSessionLoading}
            isLoading={isEndSessionLoading}
            label={intl.formatMessage({
              defaultMessage: 'Confirm',
              description:
                'Label for confirm button on end project session dialog',
              id: 'hFD3sp',
            })}
            variant="danger"
            onClick={async () => {
              await handleEndSession();
              setShowEndSessionDialog(false);
            }}
          />
        }
        secondaryButton={
          <Button
            isDisabled={isEndSessionLoading}
            label={intl.formatMessage({
              defaultMessage: 'Cancel',
              description:
                'Label for cancel end session button on end project session dialog',
              id: '2MMkM0',
            })}
            variant="secondary"
            onClick={() => {
              setShowEndSessionDialog(false);
            }}
          />
        }
        title={intl.formatMessage({
          defaultMessage: 'End project session?',
          description: 'Title for end project session dialog',
          id: 'IIyxmO',
        })}
        onClose={() => {
          setShowEndSessionDialog(false);
        }}>
        <Text>
          <FormattedMessage
            defaultMessage="Are you sure you want to terminate this session? You will be able to restart the project anytime."
            description="Content for end project session dialog"
            id="H6Hg+y"
          />
        </Text>
      </Dialog>
      <div
        className={clsx(
          'flex flex-col gap-y-6',
          'w-full rounded-lg p-6',
          themeGlassyBorder,
          themeBackgroundCardColor,
        )}>
        <div className="flex w-full flex-col justify-between gap-3 md:flex-row">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-2">
                <Text className="flex gap-x-2" weight="bold">
                  <FormattedMessage
                    defaultMessage="Current project session"
                    description="Title for current project session card"
                    id="AfXYpF"
                  />
                </Text>
                <Tooltip
                  label={intl.formatMessage({
                    defaultMessage:
                      'A user can complete a project multiple times – each instance is tracked as separate sessions.',
                    description: 'Tooltip for current project session',
                    id: '0U+s+4',
                  })}>
                  <RiInformationLine
                    className={clsx('size-4 shrink-0', themeIconColor)}
                  />
                </Tooltip>
              </div>
              <div className="block md:hidden">{expandButton}</div>
            </div>
            <div className={clsx('flex gap-1', themeTextSecondaryColor)}>
              <RiTimerLine className="size-4" color="inherit" />
              <Text color="inherit" size="body3">
                <FormattedMessage
                  defaultMessage="Since {date}"
                  description="Since date for current project session card"
                  id="ZZIJ0i"
                  values={{
                    date: intl.formatDate(createdAt, {
                      day: 'numeric',
                      month: 'short',
                    }),
                  }}
                />
              </Text>
            </div>
          </div>
          <div className="flex gap-4 md:gap-2">
            <Button
              className="flex min-w-[100px] flex-1 md:inline-flex"
              href={submitHref}
              label={intl.formatMessage({
                defaultMessage: 'Submit',
                description:
                  'Label for "Submit project" button on current project session card',
                id: '8RXTKM',
              })}
              size="xs"
              variant="primary"
            />
            {/* Unable to make the button equal width on mobile because of the tooltip wrapper.
              We'll prioritize code cleanliness over matching the design. */}
            <Button
              addonPosition="start"
              icon={RiStopCircleLine}
              label={intl.formatMessage({
                defaultMessage: 'End session',
                description:
                  'Label for "End session" button on current project session card',
                id: 'WNERnb',
              })}
              size="xs"
              tooltip={intl.formatMessage({
                defaultMessage:
                  'You can choose to end a project session if you choose not to work on it anymore. We will stop prompting you to continue the project in the dashboard',
                description:
                  'Tooltip for "End session" button on current project session card',
                id: 'L4W5rT',
              })}
              tooltipSide="bottom"
              variant="danger"
              onClick={() => {
                setShowEndSessionDialog(true);
              }}
            />
            <div className="hidden md:block">{expandButton}</div>
          </div>
        </div>
        {isExpanded && (
          <ProjectsChallengeCurrentSessionSkillsForm
            defaultValues={{
              roadmapSkills,
              techStackSkills: techStackSkills ?? [],
            }}
            onSubmit={(data) => {
              updateSessionSkillsMutation.mutate({
                ...data,
                sessionId: session.id,
                slug,
              });
            }}
          />
        )}
      </div>
    </>
  );
}
