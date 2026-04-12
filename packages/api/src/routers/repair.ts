import { z } from 'zod';
import { publicProcedure, router } from '../trpc';

export const repairRouter = router({
  list: publicProcedure.query(() => {
    return [
      {
        id: 'repair-1',
        title: 'Leaking tap in kitchen',
        status: 'in_progress' as const,
        priority: 'routine' as const,
        createdAt: '2026-04-10T10:00:00Z',
        estimatedCompletion: '2026-04-15T10:00:00Z',
        steps: [
          { label: 'Reported', completed: true, date: '2026-04-10' },
          { label: 'Triaging', completed: true, date: '2026-04-10' },
          { label: 'Scheduled', completed: true, date: '2026-04-11' },
          { label: 'In Progress', completed: true, date: '2026-04-12' },
          { label: 'Completed', completed: false },
        ],
      },
      {
        id: 'repair-2',
        title: 'Broken window handle — bedroom',
        status: 'scheduled' as const,
        priority: 'routine' as const,
        createdAt: '2026-04-08T14:30:00Z',
        estimatedCompletion: '2026-04-18T10:00:00Z',
        steps: [
          { label: 'Reported', completed: true, date: '2026-04-08' },
          { label: 'Triaging', completed: true, date: '2026-04-09' },
          { label: 'Scheduled', completed: true, date: '2026-04-10' },
          { label: 'In Progress', completed: false },
          { label: 'Completed', completed: false },
        ],
      },
    ];
  }),

  getById: publicProcedure.input(z.object({ id: z.string() })).query(({ input }) => {
    return {
      id: input.id,
      title: 'Leaking tap in kitchen',
      description:
        'The kitchen tap has been dripping constantly. Water is pooling around the base.',
      status: 'in_progress' as const,
      priority: 'routine' as const,
      category: 'Plumbing',
      createdAt: '2026-04-10T10:00:00Z',
      estimatedCompletion: '2026-04-15T10:00:00Z',
      assignedTo: 'Dai Evans — Plumbing Team',
      steps: [
        { label: 'Reported', completed: true, date: '2026-04-10' },
        { label: 'Triaging', completed: true, date: '2026-04-10' },
        { label: 'Scheduled', completed: true, date: '2026-04-11' },
        { label: 'In Progress', completed: true, date: '2026-04-12' },
        { label: 'Completed', completed: false },
      ],
    };
  }),

  create: publicProcedure
    .input(
      z.object({
        title: z.string().min(1),
        description: z.string().min(1),
        category: z.string().optional(),
        priority: z.enum(['emergency', 'urgent', 'routine']).default('routine'),
      }),
    )
    .mutation(({ input }) => {
      return {
        id: 'repair-new',
        ...input,
        status: 'reported' as const,
        createdAt: new Date().toISOString(),
      };
    }),
});
