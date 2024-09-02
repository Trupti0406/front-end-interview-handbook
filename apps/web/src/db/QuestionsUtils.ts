import { forEach, mapValues } from 'lodash-es';

import { DSAQuestions } from '~/components/interviews/questions/common/QuestionsCodingDataStructuresAlgorithms';
import type {
  QuestionCodingFormat,
  QuestionFormat,
  QuestionFramework,
  QuestionLanguage,
  QuestionMetadata,
  QuestionSlug,
} from '~/components/interviews/questions/common/QuestionsTypes';

import type { QuestionProgress } from './QuestionsProgressTypes';

function createQuestionHref(
  format: QuestionFormat,
  slug: string,
  framework?: QuestionFramework,
): string {
  const basePath = `/questions/${format}/${slug}`;

  return framework == null ? basePath : basePath + `/${framework}`;
}

export function normalizeQuestionFrontMatter(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  frontmatter: Record<string, any>,
  format: QuestionFormat,
): QuestionMetadata {
  const { slug } = frontmatter;

  const frameworks: ReadonlyArray<QuestionFramework> =
    frontmatter.frameworks ?? [];

  return {
    author: frontmatter.author ?? null,
    companies: frontmatter.companies ?? [],
    created: new Date(frontmatter.created ?? '2021-09-05').getTime() / 1000,
    difficulty: frontmatter.difficulty,
    duration: frontmatter.duration,
    // Have to be null to be serialize-able.
    excerpt: frontmatter.excerpt ?? null,
    featured: Boolean(frontmatter.featured),
    format,
    frameworkDefault:
      frontmatter.framework_default ??
      (frameworks.length > 0 ? frameworks[0] : null),
    frameworks: frameworks.map((frameworkType) => ({
      framework: frameworkType,
      href: createQuestionHref(format, slug, frameworkType),
    })),
    href: createQuestionHref(format, slug),
    // Have to be null to be serialize-able.
    importance: frontmatter.importance ?? null,
    languages: frontmatter.languages ?? [],
    nextQuestions: frontmatter.next_questions ?? [],
    premium: frontmatter.premium,
    published: frontmatter.published,
    ranking: frontmatter.ranking ?? 100, // 1-100 where 1 is the top.
    similarQuestions: frontmatter.similar_questions ?? [],
    slug,
    // Have to be null to be serialize-able.
    subtitle: frontmatter.subtitle ?? null,
    title: frontmatter.title,
    topics: frontmatter.topics ?? [],
  };
}

export function hashQuestion(format: string, slug: QuestionSlug) {
  return format + ':' + slug;
}

function unhashQuestion(key: string): [format: string, slug: QuestionSlug] {
  const parts = key.split(':');

  return [parts[0], parts[1]];
}

export function hasCompletedQuestion(
  completedQuestions: Set<QuestionSlug>,
  question: QuestionMetadata,
): boolean {
  return completedQuestions.has(hashQuestion(question.format, question.slug));
}

export type QuestionsCategorizedProgress = Record<QuestionFormat, Set<string>>;
export type QuestionsCodingFormatCategorizedProgress = Record<
  QuestionCodingFormat,
  Set<string>
>;
export type QuestionsFrameworkLanguageCategorizedProgress = Readonly<{
  framework: Record<QuestionFramework, Set<string>>;
  language: Record<QuestionLanguage, Set<string>>;
}>;

export function categorizeQuestionListSessionProgress(
  sessionProgress?:
    | ReadonlyArray<Readonly<{ id: string; key: string }>>
    | null
    | undefined,
): QuestionsCategorizedProgress {
  return categorizeQuestionsProgress(
    (sessionProgress ?? []).map(({ id, key }) => {
      const [format, slug] = unhashQuestion(key);

      return {
        format,
        id,
        slug,
      };
    }),
  );
}

export function categorizeQuestionsProgress(
  questionProgress?: ReadonlyArray<
    Readonly<{ format: string; id: string; slug: QuestionSlug }>
  > | null,
): QuestionsCategorizedProgress {
  return {
    algo: new Set(
      (questionProgress?.filter(({ format }) => format === 'algo') ?? []).map(
        ({ slug }) => slug,
      ),
    ),
    javascript: new Set(
      (
        questionProgress?.filter(({ format }) => format === 'javascript') ?? []
      ).map(({ slug }) => slug),
    ),
    quiz: new Set(
      (questionProgress?.filter(({ format }) => format === 'quiz') ?? []).map(
        ({ slug }) => slug,
      ),
    ),
    'system-design': new Set(
      (
        questionProgress?.filter(({ format }) => format === 'system-design') ??
        []
      ).map(({ slug }) => slug),
    ),
    'user-interface': new Set(
      (
        questionProgress?.filter(({ format }) => format === 'user-interface') ??
        []
      ).map(({ slug }) => slug),
    ),
  };
}

export function categorizeQuestionsProgressByCodingFormat(
  questionProgress?: ReadonlyArray<
    Readonly<{ format: string; id: string; slug: QuestionSlug }>
  > | null,
): QuestionsCodingFormatCategorizedProgress {
  return {
    'data-structures-algorithms': new Set(
      (
        questionProgress?.filter(({ slug }) => DSAQuestions.has(slug)) ?? []
      ).map(({ slug }) => slug),
    ),
    'user-interface': new Set(
      (
        questionProgress?.filter(({ format }) => format === 'user-interface') ??
        []
      ).map(({ slug }) => slug),
    ),
    utilities: new Set(
      (
        questionProgress?.filter(
          ({ format, slug }) =>
            format === 'javascript' && !DSAQuestions.has(slug),
        ) ?? []
      ).map(({ slug }) => slug),
    ),
  };
}

export function categorizeQuestionsProgressByFrameworkAndLanguage(
  questionProgress: ReadonlyArray<
    Readonly<{ format: string; id: string; slug: QuestionSlug }>
  > | null,
  questions: Readonly<{
    frameworkQuestions: Record<
      QuestionFramework,
      ReadonlyArray<QuestionMetadata>
    >;
    languageQuestions: Record<
      QuestionLanguage,
      ReadonlyArray<QuestionMetadata>
    >;
  }>,
): QuestionsFrameworkLanguageCategorizedProgress {
  const { frameworkQuestions, languageQuestions } = questions;

  const frameworkSlugsMap = mapValues(
    frameworkQuestions,
    (questionList) => new Set(questionList.map((q) => q.slug)),
  );
  const languageSlugsMap = mapValues(
    languageQuestions,
    (questionList) => new Set(questionList.map((q) => q.slug)),
  );

  // Initialize categorized progress objects
  const framework = mapValues(
    frameworkQuestions,
    () => new Set<QuestionSlug>(),
  );
  const language = mapValues(languageQuestions, () => new Set<QuestionSlug>());

  if (!questionProgress) {
    return { framework, language };
  }

  // Categorize questionProgress by framework and language
  questionProgress.forEach(({ slug }) => {
    forEach(frameworkSlugsMap, (slugs, key) => {
      if (slugs.has(slug)) {
        framework[key as QuestionFramework].add(slug);
      }
    });

    forEach(languageSlugsMap, (slugs, key) => {
      if (slugs.has(slug)) {
        language[key as QuestionLanguage].add(slug);
      }
    });
  });

  return { framework, language };
}

export function filterQuestionsProgressByList(
  questionProgress: QuestionsCategorizedProgress,
  questions: Record<QuestionFormat, ReadonlyArray<QuestionSlug>>,
): QuestionsCategorizedProgress {
  return {
    algo: new Set(
      Array.from(questionProgress.algo).filter(
        (slug) => questions.algo.includes(slug) ?? true,
      ),
    ),
    javascript: new Set(
      Array.from(questionProgress.javascript).filter(
        (slug) => questions.javascript.includes(slug) ?? true,
      ),
    ),
    quiz: new Set(
      Array.from(questionProgress.quiz).filter(
        (slug) => questions.quiz.includes(slug) ?? true,
      ),
    ),
    'system-design': new Set(
      Array.from(questionProgress['system-design']).filter(
        (slug) => questions['system-design'].includes(slug) ?? true,
      ),
    ),
    'user-interface': new Set(
      Array.from(questionProgress['user-interface']).filter(
        (slug) => questions['user-interface'].includes(slug) ?? true,
      ),
    ),
  };
}

export function roundQuestionCountToNearestTen(count: number) {
  return Math.floor(count / 10) * 10;
}

export function countNumberOfQuestionsInList(
  questions: Record<QuestionFormat, ReadonlyArray<QuestionSlug>>,
): number {
  return Object.values(questions)
    .map((q) => q.length)
    .reduce((prev, curr) => prev + curr, 0);
}

export function questionsForImportProgress(
  questions: ReadonlyArray<QuestionMetadata>,
  overallProgress: ReadonlyArray<QuestionProgress>,
  currentSessionProgress?:
    | ReadonlyArray<Readonly<{ id: string; key: string }>>
    | null
    | undefined,
) {
  // Create a Set for fast lookups
  const overallProgressSession = new Set(
    overallProgress?.map((item) => hashQuestion(item.format, item.slug)),
  );
  const currentSession = new Set(
    currentSessionProgress?.map((item) => item.key),
  );

  // Filter out last session questions progress which are no present in the current session progress
  const questionsProgressToImport = new Set(
    Array.from(overallProgressSession).filter(
      (item) => !currentSession.has(item),
    ),
  );

  return questions.filter((item) =>
    questionsProgressToImport.has(hashQuestion(item.format, item.slug)),
  );
}
