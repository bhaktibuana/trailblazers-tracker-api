import { config as dotenvConfig } from 'dotenv';
dotenvConfig();

export class ApiConfig {
	public static readonly trailblazersApi = process.env.TRAILBLAZERS_API || '';
	public static readonly goldskyApi = process.env.GOLDSKY_API || '';
}
