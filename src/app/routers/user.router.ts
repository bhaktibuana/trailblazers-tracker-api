import { Router } from 'express';

import { RouterLibrary } from '@/libs';
import { UserController } from '@/app/controllers';

export class UserRouter extends RouterLibrary<UserController> {
	constructor(router: Router) {
		super(router, '/user', new UserController());

		this.get('/', this.controller.index, ['auth']);
	}
}
