import mongoose, { Model } from 'mongoose';

import { ModelLibrary } from '@/libs';
import { UserSchema } from '@/app/models/schemas/user.schema';
import { I_User, I_UserBase } from '@/app/models/interfaces/user.interface';

export class User extends ModelLibrary<I_User> {
	public payload: I_UserBase = {} as I_UserBase;

	constructor() {
		super(
			mongoose.models.User ||
				(mongoose.model<I_User>(
					'User',
					UserSchema.getSchema(),
				) as Model<I_User>),
		);
	}

	public async save(): Promise<I_User> {
		return this.saveInstance(this.payload);
	}
}
