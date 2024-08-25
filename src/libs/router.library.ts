import { RequestHandler, Router } from 'express';

import { Middleware } from '@/app/middlewares';

type T_KeyMiddlewares = (keyof Middleware)[];

export abstract class RouterLibrary extends Middleware {
	private router: Router;
	private prefix: string;

	constructor(router: Router, prefix: string = '') {
		super();
		this.router = router;
		this.prefix = prefix;
	}

	/**
	 * Map Middleware Function
	 *
	 * @param middlewares T_KeyMiddlewares
	 * @returns RequestHandler[]
	 */
	private mapMiddleware(
		middlewares: T_KeyMiddlewares = [],
	): RequestHandler[] {
		return middlewares
			.map((middleware) => {
				const middlewareFunction = this[middleware];
				if (typeof middlewareFunction !== 'function') return null;
				return middlewareFunction.bind(this);
			})
			.filter((middleware) => middleware !== null);
	}

	/**
	 * Router GET
	 *
	 * @param path string
	 * @param controller RequestHandler
	 * @param middlewares T_KeyMiddlewares
	 */
	protected get(
		path: string,
		controller: RequestHandler,
		middlewares: T_KeyMiddlewares = [],
	) {
		this.router.get(
			`${this.prefix}${path}`,
			...this.mapMiddleware(middlewares),
			controller,
		);
	}

	/**
	 * Router POST
	 *
	 * @param path string
	 * @param controller RequestHandler
	 * @param middlewares T_KeyMiddlewares
	 */
	protected post(
		path: string,
		controller: RequestHandler,
		middlewares: T_KeyMiddlewares = [],
	) {
		this.router.post(
			`${this.prefix}${path}`,
			...this.mapMiddleware(middlewares),
			controller,
		);
	}

	/**
	 * Router PUT
	 *
	 * @param path string
	 * @param controller RequestHandler
	 * @param middlewares T_KeyMiddlewares
	 */
	protected put(
		path: string,
		controller: RequestHandler,
		middlewares: T_KeyMiddlewares = [],
	) {
		this.router.put(
			`${this.prefix}${path}`,
			...this.mapMiddleware(middlewares),
			controller,
		);
	}

	/**
	 * Router DELETE
	 *
	 * @param path string
	 * @param controller RequestHandler
	 * @param middlewares T_KeyMiddlewares
	 */
	protected delete(
		path: string,
		controller: RequestHandler,
		middlewares: T_KeyMiddlewares = [],
	) {
		this.router.delete(
			`${this.prefix}${path}`,
			...this.mapMiddleware(middlewares),
			controller,
		);
	}
}
