import {
	createRootRoute,
	createRoute,
	createRouter,
} from '@tanstack/react-router';

import { DashboardPage } from './routes/DashboardPage';
import { HistoryPage } from './routes/HistoryPage';
import { RootLayout } from './routes/RootLayout';

const rootRoute = createRootRoute({
	component: RootLayout,
});

const dashboardRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/',
	component: DashboardPage,
});

const historyRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/history',
	component: HistoryPage,
});

const routeTree = rootRoute.addChildren([dashboardRoute, historyRoute]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}
