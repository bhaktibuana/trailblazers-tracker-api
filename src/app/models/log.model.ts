import mongoose, { Model } from 'mongoose';

import { ModelLibrary } from '@/libs';
import { LogSchema } from '@/app/models/schemas/log.schema';
import { I_Log, I_LogBase } from '@/app/models/interfaces/log.interface';

export class Log extends ModelLibrary<I_Log> {
	public payload: I_LogBase = {} as I_LogBase;

	constructor() {
		super(
			mongoose.models.Log ||
				(mongoose.model<I_Log>(
					'Log',
					LogSchema.getSchema(),
				) as Model<I_Log>),
		);
	}

	public async save(): Promise<I_Log> {
		return this.saveInstance(this.payload);
	}
}
