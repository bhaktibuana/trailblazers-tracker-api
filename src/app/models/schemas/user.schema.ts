import { Schema } from 'mongoose';
import dayjs from 'dayjs';

import { I_UserBase } from '@/app/models/interfaces/user.interface';

export class UserSchema {
	private static rankSchema = new Schema<I_UserBase['rank']>(
		{
			current: { type: Number },
			final: { type: Number },
		},
		{ _id: false },
	);

	private static scoreSchema = new Schema<I_UserBase['score']>(
		{
			current: { type: Number },
			final: { type: Number },
		},
		{ _id: false },
	);

	private static multiplierSchema = new Schema<I_UserBase['multiplier']>(
		{
			base_multiplier: { type: Number },
			faction_multiplier: { type: Number },
			snaefell_multiplier: { type: Number },
			taikoon_multiplier: { type: Number },
			total_raw_multiplier: { type: Number },
			total_multiplier: { type: Number },
		},
		{ _id: false },
	);

	public static getSchema() {
		return new Schema<I_UserBase>({
			address: { type: String, required: true },
			rank: { type: this.rankSchema, required: true },
			score: { type: this.scoreSchema, required: true },
			multiplier: { type: this.multiplierSchema, required: true },
			profile_url: { type: String, required: true },
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
