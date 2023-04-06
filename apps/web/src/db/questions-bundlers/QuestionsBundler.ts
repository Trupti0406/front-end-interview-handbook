import fs from 'fs';
import { bundleMDX } from 'mdx-bundler';
import path, { dirname } from 'path';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import remarkSlug from 'remark-slug';

import remarkExtractToc from '@stefanprobst/remark-extract-toc';
import remarkExtractTocExport from '@stefanprobst/remark-extract-toc/mdx';

// Warning! This file will not be shipped in the client bundle.
// Do not add anything here that will be imported by client-side code.

type Options = Readonly<{
  extractFrontmatter?: boolean;
  extractHeadings?: boolean;
  loadJSFilesAsText?: boolean;
}>;

/**
 * Assumes the MDX filenames are the locales exactly.
 */
export async function readMDXFileWithLocaleFallback(
  directoryPath: string,
  locale: string,
  options: Options,
): Promise<string | null> {
  try {
    return await readMDXFile(
      path.join(directoryPath, `${locale}.mdx`),
      options,
    );
  } catch {
    // Fallback to English.
    return await readMDXFile(path.join(directoryPath, `en-US.mdx`), options);
  }
}

export async function readMDXFile(
  filePath: string,
  {
    extractHeadings = false,
    loadJSFilesAsText = true,
    extractFrontmatter = false,
  }: Options,
): Promise<string | null> {
  const source = fs.readFileSync(filePath).toString().trim();
  const fileDirectory = dirname(filePath);

  const { code } = await bundleMDX({
    cwd: fileDirectory,
    esbuildOptions(options) {
      if (loadJSFilesAsText) {
        options.loader = {
          ...options.loader,
          '.js': 'text',
        };
      }

      return options;
    },
    globals: { MDXCodeBlock: 'MDXCodeBlock' },
    mdxOptions(options) {
      const remarkPlugins = options.remarkPlugins ?? [];

      remarkPlugins.push(remarkGfm);

      if (extractFrontmatter) {
        remarkPlugins.push(remarkFrontmatter, remarkMdxFrontmatter);
      }

      if (extractHeadings) {
        remarkPlugins.push(
          remarkSlug,
          remarkExtractToc,
          remarkExtractTocExport,
        );
      }

      options.remarkPlugins = remarkPlugins;

      return options;
    },
    source,
  });

  return code;
}
