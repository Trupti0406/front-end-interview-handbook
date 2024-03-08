import Avatar from './Avatar';
import UIExamplesGroup from '../misc/UIExamplesGroup';

const sizes = ['xs', 'sm', 'lg'] as const;

const avatarSrc =
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';

export default function AvatarExamples() {
  return (
    <UIExamplesGroup darkMode="horizontal" title="Avatar">
      <div className="flex flex-wrap gap-4">
        {sizes.map((size) => (
          <Avatar key={size} alt="John Doe" size={size} src={avatarSrc} />
        ))}
      </div>
      <div className="flex flex-wrap gap-4">
        {sizes.map((size) => (
          <Avatar key={size} alt="John Doe" size={size} />
        ))}
      </div>
    </UIExamplesGroup>
  );
}
