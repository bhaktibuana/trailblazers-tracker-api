import { ObjectId } from 'bson';

import { Service } from '@/libs';
import { User } from '@/app/models/user.model';
import { I_User, I_UserBase } from '@/app/models/interfaces/user.interface';

export class UserService extends Service {
	constructor() {
		super();
	}

	public async index(): Promise<I_User | null> {
		const user = new User();
		const response = await user.findById(
			new ObjectId('66cac8c7ce78d548dab9f1ca'),
		);

		if (response === null)
			this.errorHandler(this.STATUS_CODE.NOT_FOUND, 'User not found');

		return response;
	}

	public async store(payload: I_UserBase) {
		const user = new User();
		user.payload = payload;
		await user.save();
		return user;
	}

	public async getByAddress(address: string): Promise<I_User | null> {
		const user = new User();
		const response = await user.findOne({ address });
		return response;
	}

	public async updateByAddress(
		address: string,
		payload: I_User,
	): Promise<I_User | null> {
		const user = new User();
		const response = await user.findOneAndUpdate({ address }, payload);
		return response;
	}
}
