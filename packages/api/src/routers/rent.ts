import { publicProcedure, router } from '../trpc';

export const rentRouter = router({
  getAccount: publicProcedure.query(() => {
    return {
      balance: -125.5,
      weeklyRent: 98.75,
      nextPaymentDue: '2026-04-18',
      paymentHistory: [
        { date: '2026-04-04', amount: 98.75, method: 'Direct Debit', status: 'paid' },
        { date: '2026-03-28', amount: 98.75, method: 'Direct Debit', status: 'paid' },
        { date: '2026-03-21', amount: 98.75, method: 'Direct Debit', status: 'paid' },
        { date: '2026-03-14', amount: 98.75, method: 'Online', status: 'paid' },
      ],
    };
  }),
});
