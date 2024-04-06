import InterviewsNavbar from '~/components/interviews/common/InterviewsNavbar';

type Props = Readonly<{
  children: React.ReactNode;
}>;

// TODO(projects): Find a way to merge it with Standard layout
export default function StandardLayoutWithoutGlobalBanner({ children }: Props) {
  return (
    <div
      className="flex min-h-screen flex-col"
      data-theme="projects"
      style={
        {
          '--banner-height': 0,
        } as React.CSSProperties
      }>
      <InterviewsNavbar mysteryMode={true} />
      {children}
    </div>
  );
}
