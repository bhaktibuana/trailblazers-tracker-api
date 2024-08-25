import { Request, Response } from 'express';

import { HTTP } from '@/shared/utils';
import { User } from '@/app/models/user.model';
import { ObjectId } from 'bson';

export class HelloController {
	public static async index(req: Request, res: Response): Promise<void> {
		const user = new User();
		const response = await user.findById(
			new ObjectId('66cac8c7ce78d548dab9f1ca'),
		);
		// user.payload = {
		// 	address: 'asasdasd',
		// 	rank: {},
		// 	score: {},
		// 	multiplier: {},
		// };
		// user.save();
		HTTP.response(res, 'Hello World', 200, response);
	}
}
