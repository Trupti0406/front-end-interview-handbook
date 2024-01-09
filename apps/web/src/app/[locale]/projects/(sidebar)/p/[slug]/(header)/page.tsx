import ProjectsProjectBriefPage from '~/components/projects/details/brief/ProjectsProjectBriefPage';

import { readProjectsProjectItem } from '~/db/projects/ProjectsReader';

type Props = Readonly<{
  params: Readonly<{ locale: string; slug: string }>;
}>;

export default async function Page({ params }: Props) {
  const { slug, locale } = params;
  const { project } = await readProjectsProjectItem(slug, locale);

  return <ProjectsProjectBriefPage project={project} />;
}
