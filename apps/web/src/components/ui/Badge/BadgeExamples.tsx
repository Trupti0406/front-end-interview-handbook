import { RiStarLine } from 'react-icons/ri';

import Badge from './Badge';
import UIExamplesGroup from '../misc/UIExamplesGroup';

export default function BadgeExamples() {
  return (
    <UIExamplesGroup darkMode="horizontal" title="Badge">
      <div className="flex flex-col gap-8">
        <div className="flex flex-wrap gap-4">
          <Badge label="Brand" variant="primary" />
          <Badge label="Success" variant="success" />
          <Badge label="Information" variant="info" />
          <Badge label="Warning" variant="warning" />
          <Badge label="Danger" variant="danger" />
          <Badge label="Neutral" variant="neutral" />
          <Badge label="Special" variant="special" />
        </div>
        <div className="flex flex-wrap gap-4">
          <Badge label="Small" size="sm" variant="primary" />
          <Badge label="Medium" size="md" variant="primary" />
        </div>
        <div className="flex flex-wrap gap-4">
          <Badge
            icon={RiStarLine}
            label="Small with icon"
            size="sm"
            variant="primary"
          />
          <Badge
            icon={RiStarLine}
            label="Medium with icon"
            size="md"
            variant="primary"
          />
        </div>
      </div>
    </UIExamplesGroup>
  );
}