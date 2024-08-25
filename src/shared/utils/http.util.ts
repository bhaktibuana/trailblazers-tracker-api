import { Response } from 'express';

import { AppError } from '@/shared/utils/app-error.util';
import { Console } from '@/shared/utils/console.util';
import { I_HTTPResponse } from '@/shared/interfaces';
import { T_Pagination } from '@/shared/types';

export class HTTP {
	public static response<T>(
		res: Response,
		message: string,
		statusCode: number,
		data: T | null = null,
		pagination: T_Pagination = null,
	): void {
		res.status(statusCode).json({
			message,
			status: statusCode >= 200 && statusCode < 300,
			status_code: statusCode,
			data,
			error: null,
			pagination,
		} as I_HTTPResponse<T>);
	}

	public static errorResponse<T>(error: T, res: Response): void {
		if (error instanceof AppError) {
			HTTP.response(res, error.message, error.statusCode);
		} else {
			Console.error('Internal Server Error', error);
			res.status(500).json({
				message: 'Internal server error',
				status: false,
				status_code: 500,
				data: null,
				error,
				pagination: null,
			} as I_HTTPResponse<T>);
		}
	}
}
