import { Schema } from 'mongoose';
import dayjs from 'dayjs';

import { I_User } from '@/app/models/interfaces/user.interface';

export class UserSchema {
	public address: string;
	public rank: I_User['rank'];
	public score: I_User['score'];
	public multiplier: I_User['multiplier'];
	public created_at: Date;
	public updated_at: Date;
	public deleted_at: Date | null;

	constructor(
		address: string,
		rank: I_User['rank'],
		score: I_User['score'],
		multiplier: I_User['multiplier'],
	) {
		this.address = address;
		this.rank = rank;
		this.score = score;
		this.multiplier = multiplier;
		this.created_at = dayjs().toDate();
		this.updated_at = dayjs().toDate();
		this.deleted_at = null;
	}

	private static rankSchema = new Schema<I_User['rank']>(
		{
			current: { type: Number },
			final: { type: Number },
		},
		{ _id: false },
	);

	private static scoreSchema = new Schema<I_User['score']>(
		{
			current: { type: Number },
			final: { type: Number },
		},
		{ _id: false },
	);

	private static multiplierSchema = new Schema<I_User['multiplier']>(
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
		return new Schema<UserSchema>({
			address: { type: String, required: true },
			rank: { type: this.rankSchema, required: true },
			score: { type: this.scoreSchema, required: true },
			multiplier: { type: this.multiplierSchema, required: true },
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
