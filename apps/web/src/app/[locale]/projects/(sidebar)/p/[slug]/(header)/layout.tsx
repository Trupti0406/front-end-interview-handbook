import ProjectsProjectHeaderLayout from '~/components/projects/details/header/ProjectsProjectHeaderLayout';

import { readProjectsProjectItem } from '~/db/projects/ProjectsReader';

type Props = Readonly<{
  children: React.ReactNode;
  params: Readonly<{ locale: string; slug: string }>;
}>;

export default async function Layout({ children, params }: Props) {
  const { locale, slug } = params;

  const { project } = await readProjectsProjectItem(slug, locale);

  return (
    <ProjectsProjectHeaderLayout project={project}>
      {children}
    </ProjectsProjectHeaderLayout>
  );
}
