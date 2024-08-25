import { Request, Response } from 'express';

import { Controller } from '@/libs';
import { UserService } from '@/app/services';

export class UserController extends Controller {
	private userService: UserService;

	constructor() {
		super();

		this.userService = new UserService();
	}

	public async index(_req: Request, res: Response): Promise<void> {
		try {
			const response = await this.userService.index();
			this.response(res, 'User data', this.STATUS_CODE.OK, response);
		} catch (error) {
			await this.errorResponse(res, error, this.constructor.name);
		} finally {
			return;
		}
	}
}
