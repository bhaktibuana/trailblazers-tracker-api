import { Router } from 'express';

import { UserRouter } from '@/app/routers/user.router';

export class AppRouter {
	constructor(router: Router) {
		new UserRouter(router);
	}
}
