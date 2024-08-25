import { config as dotenvConfig } from 'dotenv';
dotenvConfig();

export class AppConfig {
	public static readonly nodeEnv = process.env.NODE_ENV || 'development';
	public static readonly port = parseInt(process.env.PORT || '3000');
}
