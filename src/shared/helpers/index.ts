export class Helper {
	/**
	 * Multiplier Formatter
	 *
	 * @param multiplier string
	 * @returns number
	 */
	public static formatMultiplier(multiplier: string): number {
		return parseInt(multiplier) / 1000;
	}

	/**
	 * Count Progress Percentage
	 * 
	 * @param current number
	 * @param max number
	 * @returns string
	 */
	public static countProgress(current: number, max: number): string {
		return `${(current / max) * 100}%`;
	}
}
