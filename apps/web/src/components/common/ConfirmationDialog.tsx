import type { ReactNode } from 'react';
import { useIntl } from 'react-intl';

import type { ButtonVariant } from '~/components/ui/Button';
import Button from '~/components/ui/Button';
import Dialog from '~/components/ui/Dialog';

import { textVariants } from '../ui/Text';

type Props = Readonly<{
  children?: ReactNode;
  confirmButtonLabel?: string;
  confirmButtonVariant?: ButtonVariant;
  isDisabled?: boolean;
  isLoading?: boolean;
  isShown: boolean;
  onCancel?: () => void;
  onConfirm: () => void;
  title?: string;
  trigger?: ReactNode;
}>;

export default function ConfirmationDialog({
  children,
  confirmButtonLabel,
  confirmButtonVariant = 'primary',
  isLoading = false,
  isDisabled = false,
  isShown,
  onCancel,
  onConfirm,
  title,
  trigger,
}: Props) {
  const intl = useIntl();

  return (
    <Dialog
      isShown={isShown}
      primaryButton={
        <Button
          isDisabled={isDisabled}
          isLoading={isLoading}
          label={
            confirmButtonLabel ??
            intl.formatMessage({
              defaultMessage: 'Yes',
              description: 'Confirmation button label',
              id: 'VtwkKb',
            })
          }
          size="md"
          variant={confirmButtonVariant}
          onClick={() => onConfirm()}
        />
      }
      secondaryButton={
        <Button
          isDisabled={isLoading}
          label={intl.formatMessage({
            defaultMessage: 'Cancel',
            description: 'Cancel button label in confirmation dialog',
            id: 'ldxi7D',
          })}
          size="md"
          variant="secondary"
          onClick={() => onCancel?.()}
        />
      }
      title={
        title ??
        intl.formatMessage({
          defaultMessage: 'Confirm action?',
          description: 'Confirmation model title',
          id: '6Us9sa',
        })
      }
      trigger={trigger}
      onClose={() => onCancel?.()}>
      <div className={textVariants({ color: 'subtitle', size: 'body2' })}>
        {children}
      </div>
    </Dialog>
  );
}
