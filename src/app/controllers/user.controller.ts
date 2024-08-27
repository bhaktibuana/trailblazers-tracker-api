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
			const response = await this.userService.index();
			this.response(res, 'User data', this.STATUS_CODE.OK, response);
		} catch (error) {
			await this.errorResponse(res, error, this.constructor.name);
		} finally {
			return;
		}
	}

	public async syncUser(_req: Request, res: Response): Promise<void> {
		this.taikoTrailblazersService.syncUser();
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

	public async countAhead(req: Request, res: Response): Promise<void> {
		const { query } = req;
		const address = (query.address as string).toLowerCase();

		try {
			await this.taikoTrailblazersService.validateUser(address);
			const response = await this.userService.countAhead(address);
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
		const { body } = req;
		const address = body.address.toLowerCase();

		try {
			await this.taikoTrailblazersService.validateUser(address);
			const response = await this.userService.export(req, address);
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
