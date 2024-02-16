import type { z } from 'zod';

import type {
  motivationReasonValue,
  yoeReplacementSchema,
} from '~/components/projects/misc';

import type { ProjectsImageBreakpointCategory } from './common/ProjectsImageBreakpoints';
import type { ProjectsSkillKey } from './skills/types';

export type ProjectsMotivationReasonValue = z.infer<
  typeof motivationReasonValue
>;

export type ProjectsMotivationReasonOption = Readonly<{
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  id: ProjectsMotivationReasonValue;
  label: React.ReactNode;
}>;

export type ProjectsMotivationReasonFormChoice =
  | {
      otherValue: string;
      value: 'other';
    }
  | {
      value: Exclude<ProjectsMotivationReasonValue, 'other'>;
    };

export type ProjectsMotivationReasonFormValues = Readonly<{
  motivations: Array<ProjectsMotivationReasonFormChoice>;
}>;

// TODO(projects): generalize this field.
export type ProjectsYoeReplacement = z.infer<typeof yoeReplacementSchema>;

export type ProjectsProfileEditFormValues = {
  avatarUrl?: string;
  bio: string;
  githubUsername: string;
  hasNotStartedWork: boolean;
  jobTitle: string;
  linkedInUsername: string;
  monthYearExperience: string | undefined;
  motivations: Array<ProjectsMotivationReasonFormChoice>;
  name: string;
  skillsProficient: Array<ProjectsSkillKey>;
  skillsToGrow: Array<ProjectsSkillKey>;
  website: string;
  yoeReplacement: {
    option: string | undefined;
    otherText: string | undefined;
  };
};

export type ProjectsSortField =
  | 'completedCount'
  | 'createdAt'
  | 'difficulty'
  | 'recommended';

export type ProjectsChallengesDifficulty =
  | 'mid'
  | 'nightmare'
  | 'senior'
  | 'starter';

export type ProjectsRecommendedAction = {
  cta: string;
  description: string;
  href: string;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  title: string;
};

export type ProjectsProfileAvatarData = ProjectsProfileAvatarDataSlim &
  Readonly<{
    points: number;
  }>;

export type ProjectsProfileAvatarDataSlim = Readonly<{
  avatarUrl: string | null;
  id: string;
  name: string | null;
  username: string;
}>;

export type ProjectsBaseScreenshot = Readonly<{
  label: string;
  screenshots: Record<ProjectsImageBreakpointCategory, string>;
}>;
