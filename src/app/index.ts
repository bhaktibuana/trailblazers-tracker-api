import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';

import { routers } from '@/app/routers';
import { DatabaseConfig } from '@/configs';
import { TaikoTrailbalzersService } from './services';

export class App {
	private readonly app = express();

	constructor(port: number) {
		this.init();
		this.middlewares();
		this.routes();
		this.listenServer(port);
	}

	/**
	 * App Init code
	 */
	private init(): void {
		const database = new DatabaseConfig();
		database.connect();

		const test = new TaikoTrailbalzersService();
		test.syncUser();
	}

	/**
	 * App Middlewares
	 */
	private middlewares(): void {
		this.app.enable('trust proxy');
		this.app.use(helmet({ crossOriginEmbedderPolicy: false }));
		this.app.use(cors());
		this.app.use(express.json());
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({ extended: true }));
	}

	/**
	 * App Routes
	 */
	private routes(): void {
		this.app.use('/', routers);
	}

	/**
	 * App Listener
	 *
	 * @param port number
	 */
	private listenServer(port: number): void {
		this.app.listen(port, () => {
			console.log('App is running on port', port);
		});
	}
}
