import { Request, Response } from 'express';

import { Controller } from '@/libs';
import { TaikoTrailbalzersService, UserService } from '@/app/services';

export class UserController extends Controller {
	private userService: UserService;
	private taikoTrailblazersService: TaikoTrailbalzersService;

	constructor() {
		super();

		this.userService = new UserService();
		this.taikoTrailblazersService = new TaikoTrailbalzersService();
	}

	public async index(_req: Request, res: Response): Promise<void> {
		try {
			// const response = await this.userService.index();
			// const response =
			// 	await this.taikoTrailblazersService.getTaikoUsers();
			const response = await this.taikoTrailblazersService.syncUser();
			this.response(res, 'User data', this.STATUS_CODE.OK, response);
		} catch (error) {
			await this.errorResponse(res, error, this.constructor.name);
		} finally {
			return;
		}
	}
}
