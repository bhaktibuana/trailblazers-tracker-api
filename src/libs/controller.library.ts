import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { AppError, HTTP } from '@/shared/utils';
import { T_Pagination } from '@/shared/types';
import { Log } from '@/app/models';

export abstract class Controller {
	protected readonly STATUS_CODE = StatusCodes;

	protected response<T>(
		res: Response,
		message: string,
		statusCode: StatusCodes,
		data: T | null = null,
	): void {
		HTTP.response(res, message, statusCode, data);
	}

	protected responsePagination<T>(
		res: Response,
		message: string,
		statusCode: StatusCodes,
		data: T | null = null,
		pagination: T_Pagination = null,
	): void {
		HTTP.response(res, message, statusCode, data, pagination);
	}

	protected async errorResponse<T>(
		res: Response,
		error: T,
		label: string,
	): Promise<void> {
		if (error instanceof AppError) {
			const log = new Log();
			log.payload = {
				label,
				status_code: error.statusCode,
				message: error.message,
				error: error.stack,
			};
			await log.save();
		}
		HTTP.errorResponse(res, error);
	}

	protected errorHandler(statusCode: StatusCodes, message: string): void {
		throw new AppError(statusCode, message);
	}
}
