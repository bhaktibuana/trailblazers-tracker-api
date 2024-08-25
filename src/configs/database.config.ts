import mongoose from 'mongoose';

export class DatabaseConfig {
	private url: string;

	constructor() {
		this.url = process.env.DATABASE_URL || '';
	}

	public connect() {
		try {
			mongoose.connect(this.url, {
				dbName: 'trailblazers_tracker_db',
			});
			console.log('Successfully connected to the database');
		} catch (error) {
			console.error('Error connecting to the database', error);
			process.exit(1);
		}
	}
}
