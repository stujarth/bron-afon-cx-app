import { z } from 'zod';
import { publicProcedure, router } from '../trpc';

export const tenantRouter = router({
  getProfile: publicProcedure.query(() => {
    return {
      id: 'demo-tenant-1',
      name: 'Siân Williams',
      email: 'sian.williams@example.com',
      phone: '07700 900123',
      address: '14 Heol y Castell, Cwmbran, NP44 1AB',
      preferredLanguage: 'cy',
      points: 450,
      level: 'Gold',
    };
  }),

  updatePreferences: publicProcedure
    .input(
      z.object({
        preferredLanguage: z.enum(['en', 'cy']).optional(),
        emailEnabled: z.boolean().optional(),
        smsEnabled: z.boolean().optional(),
        pushEnabled: z.boolean().optional(),
      }),
    )
    .mutation(({ input }) => {
      return { success: true, ...input };
    }),
});
