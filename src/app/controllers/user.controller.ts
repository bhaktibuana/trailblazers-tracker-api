import { Request, Response } from 'express';

import { Controller } from '@/libs';
import { TaikoTrailbalzersService, UserService } from '@/app/services';
import { Constant } from '@/shared/constants';

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
			const response = await this.userService.index();
			this.response(res, 'User data', this.STATUS_CODE.OK, response);
		} catch (error) {
			await this.errorResponse(res, error, this.constructor.name);
		} finally {
			return;
		}
	}

	public async syncUser(req: Request, res: Response): Promise<void> {
		this.taikoTrailblazersService.syncUser(
			Constant.PRIMARY_ADDRESS,
			Constant.PRIMARY_MULTIPLIER,
		);
		this.response(res, 'Sync User in progress', this.STATUS_CODE.OK);
	}

	public async getByCurrentScore(
		_req: Request,
		res: Response,
	): Promise<void> {
		try {
			const response = await this.userService.getByScore('current');
			this.response(
				res,
				'User sort by current score',
				this.STATUS_CODE.OK,
				response,
			);
		} catch (error) {
			await this.errorResponse(res, error, this.constructor.name);
		} finally {
			return;
		}
	}

	public async getByFinalScore(_req: Request, res: Response): Promise<void> {
		try {
			const response = await this.userService.getByScore('final');
			this.response(
				res,
				'User sort by current score',
				this.STATUS_CODE.OK,
				response,
			);
		} catch (error) {
			await this.errorResponse(res, error, this.constructor.name);
		} finally {
			return;
		}
	}

	public async countAhead(_req: Request, res: Response): Promise<void> {
		try {
			const response = await this.userService.countAhead();
			this.response(
				res,
				'User ahead of primary',
				this.STATUS_CODE.OK,
				response,
			);
		} catch (error) {
			await this.errorResponse(res, error, this.constructor.name);
		} finally {
			return;
		}
	}

	public async export(req: Request, res: Response): Promise<void> {
		try {
			const response = await this.userService.export(req);
			this.response(
				res,
				'Export successful',
				this.STATUS_CODE.OK,
				response,
			);
		} catch (error) {
			await this.errorResponse(res, error, this.constructor.name);
		} finally {
			return;
		}
	}
}
