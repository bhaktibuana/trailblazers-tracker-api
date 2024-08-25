import { Schema } from 'mongoose';
import dayjs from 'dayjs';

import { I_LogBase } from '@/app/models/interfaces/log.interface';

export class LogSchema {
	public static getSchema() {
		return new Schema<I_LogBase>({
			label: { type: String, required: true },
			status_code: { type: Number },
			message: { type: String, required: true },
			error: { type: String || undefined, default: null },
			created_at: {
				type: Date,
				required: true,
				default: dayjs().toDate(),
			},
			updated_at: {
				type: Date,
				required: true,
				default: dayjs().toDate(),
			},
			deleted_at: { type: Date, default: null },
		});
	}
}
