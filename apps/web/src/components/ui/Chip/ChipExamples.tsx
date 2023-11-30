import {
  RiCheckFill,
  RiCursorFill,
  RiLoaderLine,
  RiLockLine,
} from 'react-icons/ri';

import Chip from './Chip';
import UIExamplesGroup from '../misc/UIExamplesGroup';

export default function ChipExamples() {
  return (
    <UIExamplesGroup darkMode="horizontal" title="Chip">
      <div className="flex flex-wrap gap-4">
        <Chip label="1" variant="neutral" />
        <Chip label="1" variant="active" />
        <Chip
          icon={RiCheckFill}
          isLabelHidden={true}
          label="Completed"
          variant="success"
        />
        <Chip
          icon={RiLockLine}
          isLabelHidden={true}
          label="Locked"
          variant="special"
        />
        <Chip
          icon={RiLoaderLine}
          isLabelHidden={true}
          label="Loading"
          variant="primary"
        />
        <Chip
          icon={RiCheckFill}
          isLabelHidden={true}
          label="Loading"
          variant="secondary"
        />
        <Chip
          icon={RiCursorFill}
          isLabelHidden={true}
          label="Cursor"
          variant="primary"
        />
      </div>
    </UIExamplesGroup>
  );
}
