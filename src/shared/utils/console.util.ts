import { AppConfig } from '@/configs';
import { T_Console } from '@/shared/types';

export class Console {
	public static log<T>(title: string, payload: T): void {
		Console.console<T>('log', title, payload);
	}

	public static error<T>(title: string, payload: T): void {
		Console.console<T>('error', title, payload);
	}

	private static console<T>(
		type: T_Console,
		title: string,
		payload: T,
	): void {
		if (AppConfig.nodeEnv === 'production') return;
		if (type === 'log') {
			console.log(`[${title}] =>`, payload);
		} else if (type === 'error') {
			console.error(`[${title}] =>`, payload);
		}
	}
}
