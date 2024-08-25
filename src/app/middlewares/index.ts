import { NextFunction, Request, Response } from 'express';

export class Middleware {
	constructor() {}

	public auth(req: Request, res: Response, next: NextFunction): void {
		return next();
	}
}
