export type MessageLevel = 'error' | 'info' | 'success' | 'warning';

export type Props = Readonly<{
  level: MessageLevel;
  message: string;
  userIdentifier?: string;
}>;

export default async function logMessage({
  level,
  message,
  userIdentifier,
}: Props) {
  console.info('[message]', level, message);
  // Don't log messages during development.
  if (process.env.NODE_ENV === 'development') {
    return;
  }

  try {
    await fetch(`/api/logging/message`, {
      body: JSON.stringify({
        level,
        message,
        user_identifier: userIdentifier,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
  } catch {
    // Ignore.
  }
}
