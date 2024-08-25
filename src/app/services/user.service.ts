import { ObjectId } from 'bson';

import { Service } from '@/libs';
import { User } from '@/app/models/user.model';
import { I_User } from '@/app/models/interfaces/user.interface';

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
}
