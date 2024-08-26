import { Router } from 'express';

import { RouterLibrary } from '@/libs';
import { UserController } from '@/app/controllers';

export class UserRouter extends RouterLibrary<UserController> {
	constructor(router: Router) {
		super(router, '/user', new UserController());

		this.get('/', this.controller.index, ['auth']);
		this.post('/sync', this.controller.syncUser);
		this.get('/current-score', this.controller.getByCurrentScore);
		this.get('/final-score', this.controller.getByFinalScore);
		this.get('/count-ahead', this.controller.countAhead);
		this.post('/export', this.controller.export);
	}
}
