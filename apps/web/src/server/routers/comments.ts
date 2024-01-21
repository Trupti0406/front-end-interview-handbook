import { z } from 'zod';

import prisma from '~/server/prisma';

import { publicProcedure, router, userProcedure } from '../trpc';

import { Prisma } from '@prisma/client';

const domains = ['PROJECTS_SUBMISSION', 'PROJECTS_CHALLENGE'] as const;

export const commentsRouter = router({
  create: userProcedure
    .input(
      z.object({
        category: z.string().optional(),
        // TODO(projects): reuse validation on client.
        content: z.string().trim().min(10).max(40000),
        domain: z.enum(domains),
        entityId: z.string(),
      }),
    )
    .mutation(
      async ({
        input: { entityId, domain, category, content },
        ctx: { user },
      }) => {
        return await prisma.discussionComment.create({
          data: {
            category,
            content,
            domain,
            entityId,
            userId: user.id,
          },
        });
      },
    ),
  delete: userProcedure
    .input(
      z.object({
        commentId: z.string().uuid(),
      }),
    )
    .mutation(async ({ input: { commentId }, ctx: { user } }) => {
      return await prisma.discussionComment.delete({
        where: {
          id: commentId,
          userId: user.id,
        },
      });
    }),
  liked: userProcedure
    .input(
      z.object({
        domain: z.enum(domains),
        entityId: z.string(),
      }),
    )
    .query(async ({ input: { domain, entityId }, ctx: { user } }) => {
      const likedComments = await prisma.discussionCommentVote.findMany({
        select: {
          commentId: true,
        },
        where: {
          comment: {
            domain,
            entityId,
          },
          userId: user.id,
        },
      });

      return likedComments.map(({ commentId }) => commentId);
    }),
  list: publicProcedure
    .input(
      z.object({
        domain: z.enum(domains),
        entityId: z.string(),
      }),
    )
    .query(async ({ input: { domain, entityId } }) => {
      const commentIncludeFields = {
        _count: {
          select: {
            votes: true,
          },
        },
        author: {
          select: {
            avatarUrl: true,
            id: true,
            name: true,
            title: true,
            username: true,
          },
        },
      };

      const [count, comments] = await Promise.all([
        prisma.discussionComment.count({
          where: {
            entityId,
          },
        }),
        prisma.discussionComment.findMany({
          include: {
            replies: {
              include: {
                replies: {
                  include: commentIncludeFields,
                },
                ...commentIncludeFields,
              },
            },
            ...commentIncludeFields,
          },
          orderBy: {
            createdAt: 'desc',
          },
          where: {
            domain,
            entityId,
            parentCommentId: null, // Fetch top-level comments only.
          },
        }),
      ]);

      return {
        comments,
        count,
      };
    }),
  reply: userProcedure
    .input(
      z.object({
        // TODO(projects): reuse validation on client.
        content: z.string().trim().min(10).max(40000),
        domain: z.enum(domains),
        entityId: z.string(),
        parentCommentId: z.string().uuid(),
      }),
    )
    .mutation(
      async ({
        input: { entityId, domain, content, parentCommentId },
        ctx: { user },
      }) => {
        return await prisma.discussionComment.create({
          data: {
            content,
            domain,
            entityId,
            parentCommentId,
            userId: user.id,
          },
        });
      },
    ),
  unvote: userProcedure
    .input(
      z.object({
        commentId: z.string().uuid(),
      }),
    )
    .mutation(async ({ input: { commentId }, ctx: { user } }) => {
      await prisma.discussionCommentVote.deleteMany({
        where: {
          commentId,
          userId: user.id,
        },
      });
    }),
  update: userProcedure
    .input(
      z.object({
        commentId: z.string().uuid(),
        // TODO(projects): reuse validation on client.
        content: z.string().trim().min(10).max(40000),
      }),
    )
    .mutation(async ({ input: { commentId, content }, ctx: { user } }) => {
      return await prisma.discussionComment.update({
        data: {
          content,
        },
        where: {
          id: commentId,
          userId: user.id,
        },
      });
    }),
  vote: userProcedure
    .input(
      z.object({
        commentId: z.string().uuid(),
      }),
    )
    .mutation(async ({ input: { commentId }, ctx: { user } }) => {
      try {
        await prisma.discussionCommentVote.create({
          data: {
            commentId,
            userId: user.id,
          },
        });
      } catch (err) {
        if (
          err instanceof Prisma.PrismaClientKnownRequestError &&
          err.code === 'P2002'
        ) {
          // No-op.
          return;
        }
        throw err;
      }
    }),
});
