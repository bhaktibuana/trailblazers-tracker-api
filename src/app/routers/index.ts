import { Request, Response, Router } from 'express';

import { AppRouter } from '@/app/routers/app.router';
import { Constant } from '@/shared/constants';
import { HTTP } from '@/shared/utils';

class Routers {
	public readonly router = Router();
	private readonly appRouter = Router();

	constructor() {
		new AppRouter(this.appRouter);
		this.index();
	}

	/**
	 * Index Routers
	 */
	private index(): void {
		this.router.use('/api', this.appRouter);
		this.router.use('/:anyRoute', (req: Request, res: Response): void => {
			const url = `${req.protocol}://${req.headers.host}${req.originalUrl}`;
			HTTP.response(res, `URL not found: ${url}`, 404);
		});
		this.router.use('/', (req: Request, res: Response): void => {
			const url = `${req.protocol}://${req.headers.host}`;
			HTTP.response(res, Constant.APP_INDEX_MESSAGE, 200, { url });
		});
	}
}

export const routers = new Routers().router;
