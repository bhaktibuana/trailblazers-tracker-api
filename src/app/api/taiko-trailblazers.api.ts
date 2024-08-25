import { ApiLibrary } from '@/libs';
import { ApiConfig } from '@/configs';
import {
	I_TaikoGetUserRankResponse,
	I_TaikoGetUsersParams,
	I_TaikoGetUsersResponse,
} from '@/shared/interfaces';

export class TaikoTrailblazersApi extends ApiLibrary {
	constructor() {
		super(ApiConfig.trailblazersApi);
	}

	public async getUsers(
		params: I_TaikoGetUsersParams,
	): Promise<I_TaikoGetUsersResponse> {
		const path = '/leaderboard/user';
		const headers = {
			accept: 'application/json, text/plain, */*',
			'accept-language': 'id,en-US;q=0.9,en;q=0.8,id-ID;q=0.7',
			origin: 'https://trailblazers.taiko.xyz',
			priority: 'u=1, i',
			referer: 'https://trailblazers.taiko.xyz/',
			'sec-ch-ua':
				'"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
			'sec-ch-ua-mobile': '?0',
			'sec-ch-ua-platform': '"Windows"',
			'sec-fetch-dest': 'empty',
			'sec-fetch-mode': 'cors',
			'sec-fetch-site': 'same-site',
			'user-agent':
				'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
		};

		return await this.get<I_TaikoGetUsersResponse>(path, {
			params,
			headers,
		});
	}

	public async getUserRank(address: string) {
		const path = '/user/rank';
		const headers = {
			accept: 'application/json, text/plain, */*',
			'accept-language': 'id,en-US;q=0.9,en;q=0.8,id-ID;q=0.7',
			origin: 'https://trailblazers.taiko.xyz',
			priority: 'u=1, i',
			referer: 'https://trailblazers.taiko.xyz/',
			'sec-ch-ua':
				'"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"',
			'sec-ch-ua-mobile': '?0',
			'sec-ch-ua-platform': '"Windows"',
			'sec-fetch-dest': 'empty',
			'sec-fetch-mode': 'cors',
			'sec-fetch-site': 'same-site',
			'user-agent':
				'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
		};

		return await this.get<I_TaikoGetUserRankResponse>(path, {
			params: {
				address,
			},
			headers,
		});
	}
}
