import { getServerAuthSession } from '~/app/lib/auth';

import type { CreateNextContextOptions } from '@trpc/server/adapters/next';

export async function createContext(opts: CreateNextContextOptions) {
  const session = await getServerAuthSession({ req: opts.req, res: opts.res });

  return {
    req: opts.req,
    session,
  };
}
export type Context = Awaited<ReturnType<typeof createContext>>;