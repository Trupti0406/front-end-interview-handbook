// @ts-check

import { makeSource } from 'contentlayer/source-files';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';

import { BlogAuthorDocument } from './src/contentlayer/document/BlogAuthorDocument';
import { BlogCategoryDocument } from './src/contentlayer/document/BlogCategoryDocument';
import { BlogPostDocument } from './src/contentlayer/document/BlogPostDocument';
import { BlogSeriesDocument } from './src/contentlayer/document/BlogSeriesDocument';
import { BlogSubseriesDocument } from './src/contentlayer/document/BlogSubseriesDocument';
import { ProjectsChallengeMetadataDocument } from './src/components/projects/contentlayer/ProjectsChallengeMetadataDocument';
import { ProjectsChallengeStyleGuideDocument } from './src/components/projects/contentlayer/ProjectsChallengeStyleGuideDocument';
import { ProjectsChallengeAPIWriteupDocument } from './src/components/projects/contentlayer/ProjectsChallengeAPIWriteupDocument';
import { ProjectsChallengeGuideDocument } from './src/components/projects/contentlayer/ProjectsChallengeGuideDocument';
import { ProjectsTrackMetadataDocument } from './src/components/projects/contentlayer/ProjectsTrackMetadataDocument';

export default makeSource({
  contentDirPath: 'src/content',
  documentTypes: [
    BlogAuthorDocument,
    BlogCategoryDocument,
    BlogPostDocument,
    BlogSeriesDocument,
    BlogSubseriesDocument,
    ProjectsChallengeMetadataDocument,
    ProjectsChallengeStyleGuideDocument,
    ProjectsChallengeAPIWriteupDocument,
    ProjectsChallengeGuideDocument,
    ProjectsTrackMetadataDocument,
  ],
  mdx: {
    remarkPlugins: [remarkGfm, remarkFrontmatter, remarkMdxFrontmatter],
  },
});
