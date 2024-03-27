import { z } from 'zod';

import { hashQuestion } from '~/db/QuestionsUtils';
import prisma from '~/server/prisma';

import { router, userProcedure } from '../trpc';

export const questionListsRouter = router({
  getActiveSession: userProcedure
    .input(
      z.object({
        listKey: z.string(),
      }),
    )
    .query(async ({ input: { listKey }, ctx: { viewer } }) => {
      const session = await prisma.learningSession.findFirst({
        include: {
          progress: true,
        },
        where: {
          key: listKey,
          status: 'IN_PROGRESS',
          userId: viewer.id,
        },
      });

      return session;
    }),
  getActiveSessions: userProcedure.query(async ({ ctx: { viewer } }) => {
    return await prisma.learningSession.findMany({
      include: {
        _count: {
          select: {
            progress: true,
          },
        },
      },
      where: {
        status: 'IN_PROGRESS',
        userId: viewer.id,
      },
    });
  }),
  getSessionProgress: userProcedure
    .input(
      z.object({
        listKey: z.string(),
      }),
    )
    .query(async ({ input: { listKey }, ctx: { viewer } }) => {
      const session = await prisma.learningSession.findFirst({
        where: {
          key: listKey,
          status: 'IN_PROGRESS',
          userId: viewer.id,
        },
      });

      if (session == null) {
        return null;
      }

      return await prisma.learningSessionProgress.findMany({
        where: {
          sessionId: session.id,
        },
      });
    }),
  markAsNotComplete: userProcedure
    .input(
      z.object({
        format: z.string(),
        listKey: z.string(),
        slug: z.string(),
      }),
    )
    .mutation(async ({ input: { format, slug, listKey }, ctx: { viewer } }) => {
      try {
        const session = await prisma.learningSession.findFirst({
          where: {
            key: listKey,
            status: 'IN_PROGRESS',
            userId: viewer.id,
          },
        });

        if (session == null) {
          return;
        }

        await prisma.learningSessionProgress.deleteMany({
          where: {
            key: hashQuestion(format, slug),
            sessionId: session.id,
          },
        });
      } catch {
        // TODO: Report error
      }
    }),
  markComplete: userProcedure
    .input(
      z.object({
        format: z.string(),
        listKey: z.string(),
        slug: z.string(),
      }),
    )
    .mutation(async ({ input: { format, slug, listKey }, ctx: { viewer } }) => {
      try {
        const session = await prisma.learningSession.findFirst({
          where: {
            key: listKey,
            status: 'IN_PROGRESS',
            userId: viewer.id,
          },
        });

        if (session == null) {
          return;
        }

        return await prisma.learningSessionProgress.create({
          data: {
            key: hashQuestion(format, slug),
            sessionId: session.id,
            status: 'COMPLETED',
          },
        });
      } catch {
        // TODO: Report error
      }
    }),
  resetSessionProgress: userProcedure
    .input(
      z.object({
        sessionId: z.string(),
      }),
    )
    .mutation(async ({ input: { sessionId }, ctx: { viewer } }) => {
      // Make sure the session is active.
      const session = await prisma.learningSession.findFirst({
        where: {
          id: sessionId,
          status: 'IN_PROGRESS',
          userId: viewer.id,
        },
      });

      if (session == null) {
        return null;
      }

      await prisma.learningSessionProgress.deleteMany({
        where: {
          sessionId,
        },
      });
    }),
  startSession: userProcedure
    .input(
      z.object({
        listKey: z.string(),
      }),
    )
    .mutation(async ({ input: { listKey }, ctx: { viewer } }) => {
      const existingSession = await prisma.learningSession.findFirst({
        where: {
          key: listKey,
          status: 'IN_PROGRESS',
          userId: viewer.id,
        },
      });

      // There's an existing session, return it.
      if (existingSession != null) {
        return existingSession;
      }

      // No existing session, create one.
      const createData = {
        key: listKey,
        userId: viewer.id,
      };

      return await prisma.learningSession.create({
        data: createData,
      });
    }),
  stopSession: userProcedure
    .input(
      z.object({
        sessionId: z.string(),
      }),
    )
    .mutation(async ({ input: { sessionId }, ctx: { viewer } }) => {
      // Make sure the session is active.
      const session = await prisma.learningSession.findFirst({
        where: {
          id: sessionId,
          status: 'IN_PROGRESS',
          userId: viewer.id,
        },
      });

      if (session == null) {
        return null;
      }

      return await prisma.learningSession.update({
        data: {
          status: 'STOPPED',
          stoppedAt: new Date(),
        },
        where: {
          id: sessionId,
        },
      });
    }),
});
