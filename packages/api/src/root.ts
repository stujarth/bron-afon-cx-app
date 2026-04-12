import { router } from './trpc';
import { tenantRouter } from './routers/tenant';
import { repairRouter } from './routers/repair';
import { rentRouter } from './routers/rent';

export const appRouter = router({
  tenant: tenantRouter,
  repair: repairRouter,
  rent: rentRouter,
});

export type AppRouter = typeof appRouter;
