import { defineDocumentType } from 'contentlayer/source-files';
import path from 'node:path';

function parseProjectSlug(sourceFilePath: string) {
  return sourceFilePath.split(path.sep)[2];
}

export const ProjectsChallengeBriefDocument = defineDocumentType(() => ({
  computedFields: {
    slug: {
      description: 'Unique identifier of the project',
      resolve: (doc) => parseProjectSlug(doc._raw.sourceFilePath),
      type: 'string',
    },
  },
  contentType: 'mdx',
  filePathPattern: 'projects/challenges/*/brief/*.mdx',
  name: 'ProjectsChallengeBrief',
}));
