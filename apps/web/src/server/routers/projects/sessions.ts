import { allProjectsChallengeMetadata } from 'contentlayer/generated';
import { z } from 'zod';

import {
  readProjectsChallengeList,
  readProjectsTrackList,
} from '~/db/projects/ProjectsReader';
import prisma from '~/server/prisma';

import { projectsUserProcedure } from './procedures';
import { router } from '../../trpc';

const projectsSessionProcedure = projectsUserProcedure.input(
  z.object({
    slug: z.string(),
  }),
);

export const projectsSessionsRouter = router({
  create: projectsSessionProcedure.mutation(
    async ({ input: { slug }, ctx: { projectsProfileId } }) => {
      // Don't allow creating multiple sessions.
      const existingSession = await prisma.projectsChallengeSession.findFirst({
        where: {
          profileId: projectsProfileId,
          slug,
          status: 'IN_PROGRESS',
        },
      });

      if (existingSession != null) {
        return existingSession;
      }

      return await prisma.projectsChallengeSession.create({
        data: {
          profileId: projectsProfileId,
          slug,
        },
      });
    },
  ),
  end: projectsSessionProcedure.mutation(
    async ({ input: { slug }, ctx: { projectsProfileId } }) => {
      return await prisma.projectsChallengeSession.updateMany({
        data: {
          status: 'STOPPED',
          stoppedAt: new Date(),
        },
        where: {
          profileId: projectsProfileId,
          slug,
          status: 'IN_PROGRESS',
        },
      });
    },
  ),
  getLatestInProgress: projectsSessionProcedure.query(
    async ({ input: { slug }, ctx: { projectsProfileId } }) => {
      return await prisma.projectsChallengeSession.findFirst({
        where: {
          profileId: projectsProfileId,
          slug,
          status: 'IN_PROGRESS',
        },
      });
    },
  ),
  getMostProgressTracks: projectsUserProcedure
    .input(
      z.object({
        limit: z.number().int().positive(),
      }),
    )
    .query(async ({ input: { limit }, ctx: { projectsProfileId } }) => {
      const { tracks } = await readProjectsTrackList();
      const completedSessions = await prisma.projectsChallengeSession.findMany({
        where: {
          profileId: projectsProfileId,
          status: 'COMPLETED',
        },
      });

      const userTracksData = tracks.map((track) => {
        const completedChallengesForTrack = track.challenges.filter(
          (challenge) =>
            completedSessions.some(
              (session) => session.slug === challenge.slug,
            ),
        );
        const pointsCompleted = completedChallengesForTrack.reduce(
          (total, challenge) => total + challenge.points,
          0,
        );
        const totalPoints = track.challenges.reduce(
          (total, challenge) => total + challenge.points,
          0,
        );
        const percentageCompleted = (pointsCompleted / totalPoints) * 100;
        const numChallengesCompleted = completedChallengesForTrack.length;
        const numChallenges = track.challenges.length;

        return {
          ...track,
          numChallenges,
          numChallengesCompleted,
          percentageCompleted,
        };
      });

      return userTracksData
        .filter((track) => track.percentageCompleted < 100)
        .sort((a, b) => b.percentageCompleted - a.percentageCompleted)
        .slice(0, limit);
    }),
  getMostRecentlyStarted: projectsUserProcedure
    .input(
      z.object({
        limit: z.number().int().positive(),
      }),
    )
    .query(async ({ input: { limit }, ctx: { projectsProfileId } }) => {
      const sessions = await prisma.projectsChallengeSession.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        take: limit,
        where: {
          profileId: projectsProfileId,
          status: 'IN_PROGRESS',
        },
      });

      return sessions.map((session) => {
        const challenge = allProjectsChallengeMetadata.find(
          (project) => project.slug === session.slug,
        );

        return {
          ...session,
          challenge,
        };
      });
    }),
  getSessionsBasedOnStatus: projectsUserProcedure
    .input(
      z.object({
        statuses: z
          .array(z.enum(['COMPLETED', 'IN_PROGRESS', 'STOPPED']))
          .nonempty(),
      }),
    )
    .query(async ({ input: { statuses }, ctx: { projectsProfileId } }) => {
      const sessions = await prisma.projectsChallengeSession.findMany({
        where: {
          profileId: projectsProfileId,
          status: {
            in: statuses,
          },
        },
      });

      const { challenges: projectsChallengeList } =
        await readProjectsChallengeList();

      return sessions.map((session) => {
        const challenge = projectsChallengeList.find(
          (project) => project.metadata.slug === session.slug,
        );

        return {
          ...session,
          challenge,
        };
      });
    }),
  isNewToProjects: projectsUserProcedure.query(
    async ({ ctx: { projectsProfileId } }) => {
      const sessions = await prisma.projectsChallengeSession.count({
        where: {
          profileId: projectsProfileId,
        },
      });

      return sessions === 0;
    },
  ),
  startedBefore: projectsUserProcedure.query(
    async ({ ctx: { projectsProfileId } }) => {
      const sessions = await prisma.projectsChallengeSession.count({
        where: {
          profileId: projectsProfileId,
        },
      });

      return sessions > 0;
    },
  ),
});
