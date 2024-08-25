import { Router } from 'express';

import { HelloRouter } from '@/app/routers/hello.router';

export class AppRouter {
	constructor(router: Router) {
		new HelloRouter(router);
	}
}
