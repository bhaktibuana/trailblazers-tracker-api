import { Router } from 'express';

import { RouterLibrary } from '@/libs';
import { HelloController } from '@/app/controllers/hello.controllers';

export class HelloRouter extends RouterLibrary {
	constructor(router: Router) {
		super(router, '/hello');

		this.get('/', HelloController.index, ['auth']);
	}
}
