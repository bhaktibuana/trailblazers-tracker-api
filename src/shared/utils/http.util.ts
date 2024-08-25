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

	private static baseErrorResponse<T>(
		res: Response,
		message: string,
		statusCode: number,
		error: T | null = null,
	): void {
		res.status(statusCode).json({
			message,
			status: statusCode >= 200 && statusCode < 300,
			status_code: statusCode,
			data: null,
			error,
			pagination: null,
		} as I_HTTPResponse<T>);
	}

	public static errorResponse<T>(res: Response, error: T): void {
		if (error instanceof AppError) {
			HTTP.baseErrorResponse(res, error.message, error.statusCode, error.stack);
		} else {
			const errorMessage = 'Internal Server Error';
			Console.error(errorMessage, error);
			HTTP.baseErrorResponse(res, errorMessage, 500, error);
		}
	}
}
