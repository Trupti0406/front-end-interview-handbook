import clsx from 'clsx';

import Text from '~/components/ui/Text';

import { skipTextClassName } from './style';
import type { TestResults } from './types';

export type TestsOutcome = 'correct' | 'indeterminate' | 'none' | 'wrong';

type Props = Readonly<{
  outcome: TestsOutcome;
  results: TestResults;
}>;

export default function TestsOutcomeBadge({ outcome, results }: Props) {
  return (
    <div className="flex gap-x-4">
      {outcome === 'correct' && (
        <Text color="success" size="body3" weight="medium">
          Correct
        </Text>
      )}
      {outcome === 'wrong' && (
        <Text color="error" size="body3" weight="medium">
          Wrong answer
        </Text>
      )}
      <Text size="body3">
        {results.fail > 0 && (
          <>
            <Text color="error" size="body3" weight="medium">
              {results.fail} failed
            </Text>
            ,{' '}
          </>
        )}
        {results.skip > 0 && (
          <>
            <span className={clsx(skipTextClassName)}>
              {results.skip} skipped
            </span>
            ,{' '}
          </>
        )}
        {results.pass > 0 && (
          <>
            <Text color="success" size="body3" weight="medium">
              {results.pass} passed
            </Text>
            ,{' '}
          </>
        )}
        <span>{results.total} total</span>
      </Text>
    </div>
  );
}