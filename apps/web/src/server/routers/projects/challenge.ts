import { z } from 'zod';

import ProjectsPremiumAccessControl from '~/components/projects/challenges/premium/ProjectsPremiumAccessControl';
import fetchViewerProjectsChallengeAccess from '~/components/projects/utils/fetchViewerProjectsChallengeAccess';
import fetchViewerProjectsProfile from '~/components/projects/utils/fetchViewerProjectsProfile';

import {
  readProjectsChallengeItem,
  readProjectsChallengeMetadata,
} from '~/db/projects/ProjectsReader';
import prisma from '~/server/prisma';
import { publicProcedure, router } from '~/server/trpc';
import { createSupabaseAdminClientGFE_SERVER_ONLY } from '~/supabase/SupabaseServerGFE';

import { projectsUserProcedure } from './procedures';

import { TRPCError } from '@trpc/server';

export const projectsChallengeRouter = router({
  accessUnlock: projectsUserProcedure
    .input(
      z.object({
        slug: z.string(),
      }),
    )
    .mutation(async ({ input: { slug }, ctx: { projectsProfileId } }) => {
      const projectsProfile = await prisma.projectsProfile.findFirstOrThrow({
        select: {
          credits: true,
          premium: true,
        },
        where: {
          id: projectsProfileId,
        },
      });

      if (!projectsProfile.premium || projectsProfile.credits <= 0) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Non-premium or no credits remaining',
        });
      }

      return prisma.projectsChallengeCreditTransaction.create({
        data: {
          access: {
            create: {
              profileId: projectsProfileId,
              slug,
            },
          },
          amount: 1,
          profileId: projectsProfileId,
          type: 'DEBIT' as const,
        },
      });
    }),
  canAccessAllSteps: projectsUserProcedure
    .input(
      z.object({
        slug: z.string(),
      }),
    )
    .query(async ({ input: { slug }, ctx: { projectsProfileId } }) => {
      const sessions = await prisma.projectsChallengeSession.count({
        where: {
          profileId: projectsProfileId,
          slug,
          status: {
            in: ['IN_PROGRESS', 'COMPLETED'],
          },
        },
      });

      return sessions > 0;
    }),
  downloadStarterFiles: projectsUserProcedure
    .input(
      z.object({
        slug: z.string(),
      }),
    )
    .mutation(async ({ input: { slug }, ctx: { viewer } }) => {
      const [
        { challengeMetadata },
        { viewerProjectsProfile },
        viewerUnlockedAccess,
      ] = await Promise.all([
        readProjectsChallengeMetadata(slug),
        fetchViewerProjectsProfile(viewer),
        fetchViewerProjectsChallengeAccess(slug, viewer),
      ]);

      const viewerAccess = ProjectsPremiumAccessControl(
        challengeMetadata.access,
        viewerProjectsProfile,
        viewerUnlockedAccess,
      );

      if (
        viewerAccess.downloadStarterFiles !== 'ACCESSIBLE_TO_EVERYONE' &&
        viewerAccess.downloadStarterFiles !== 'UNLOCKED'
      ) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Not authorized to download file',
        });
      }

      const supabaseAdmin = createSupabaseAdminClientGFE_SERVER_ONLY();
      const { data, error } = await supabaseAdmin.storage
        .from('projects')
        .createSignedUrl(
          `challenges/${challengeMetadata.slug}/${challengeMetadata.slug}.zip`,
          300,
          {
            download: `${challengeMetadata.slug}-starter.zip`,
          },
        );

      if (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Error creating signed URL',
        });
      }

      return data;
    }),
  hovercard: publicProcedure
    .input(
      z.object({
        locale: z.string(),
        slug: z.string(),
      }),
    )
    .query(async ({ input: { locale, slug }, ctx: { viewer } }) => {
      const { challenge } = await readProjectsChallengeItem(
        slug,
        locale,
        viewer?.id,
      );

      return {
        ...challenge,
        // Don't display status in hovercard.
        status: null,
      };
    }),
});
