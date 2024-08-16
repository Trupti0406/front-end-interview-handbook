import { activityRouter } from './activity';
import { projectRouter } from './project';
import { socialPostsRouter } from './social-posts';
import { socialUsersRouter } from './social-users';
import { router } from '../trpc';

export const appRouter = router({
  activity: activityRouter,
  project: projectRouter,
  socialPosts: socialPostsRouter,
  socialUsers: socialUsersRouter,
});

// Export type definition of API
export type AppRouter = typeof appRouter;
