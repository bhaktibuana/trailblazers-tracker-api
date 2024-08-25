import { StatusCodes } from 'http-status-codes';

import { AppError } from '@/shared/utils';

export abstract class Service {
	protected readonly STATUS_CODE = StatusCodes;

	protected errorHandler(statusCode: StatusCodes, message: string): void {
		throw new AppError(statusCode, message);
	}
}
