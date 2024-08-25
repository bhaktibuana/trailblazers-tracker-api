import { Service } from '@/libs';
import { TaikoTrailblazersApi, GoldskyApi } from '@/app/api';
import { I_User, I_UserBase } from '@/app/models/interfaces/user.interface';
import { Helper } from '@/shared/helpers';
import { Constant } from '@/shared/constants';
import { User } from '@/app/models';
import { UserService } from '@/app/services';
import {
	I_TaikoGetUsersResponse,
	I_TaikoGetNFTResponse,
	I_TaikoGetUserRankResponse,
} from '@/shared/interfaces';

export class TaikoTrailbalzersService extends Service {
	private taikoTrailblazersApi: TaikoTrailblazersApi;
	private goldskyApi: GoldskyApi;
	private userService: UserService;

	constructor() {
		super();

		this.taikoTrailblazersApi = new TaikoTrailblazersApi();
		this.goldskyApi = new GoldskyApi();
		this.userService = new UserService();
	}

	private async getTaikoUsers(
		page: number = 0,
		size: number = 100000,
	): Promise<I_TaikoGetUsersResponse> {
		const taikoUsers = await this.taikoTrailblazersApi.getUsers({
			page: page.toString(),
			size: size.toString(),
			sort: 'score',
		});
		return taikoUsers;
	}

	private async getUserNFT(address: string): Promise<I_TaikoGetNFTResponse> {
		const userNft = await this.goldskyApi.getNFT(address.toLowerCase());
		return userNft;
	}

	private async getUserRank(
		address: string,
	): Promise<I_TaikoGetUserRankResponse> {
		const userRank = await this.taikoTrailblazersApi.getUserRank(address);
		return userRank;
	}

	public async syncUser() {
		let totalUser = 0;
		let currentUser = 0;
		let isComplete = false;
		let isSuccess = false;
		let currentLoop = 0;

		try {
			const initialData = await this.getTaikoUsers(0, 1);
			totalUser = initialData.total;
			isComplete = initialData.last;

			while (!isComplete) {
				const payload: I_UserBase = {} as I_UserBase;
				const users = await this.getTaikoUsers(currentLoop);

				if (users.items.length === 0) {
					break;
				}

				const userAddresses = users.items.map((item) => item.address);

				for (let i = 0; i < userAddresses.length; i++) {
					payload.address = userAddresses[i];
					payload.profile_url =
						Constant.TAIKO_PROFILE_URL + payload.address;

					payload.multiplier = await this.processMultiplier(
						payload.address,
					);

					const rankScore = await this.processRankScore(
						payload.address,
						payload.multiplier?.total_multiplier as number,
					);
					payload.rank = rankScore.rank;
					payload.score = rankScore.score;

					const existUser = await this.userService.getByAddress(
						payload.address,
					);

					if (existUser) {
						const userPayload = Object.assign(
							{},
							payload,
						) as I_User;
						delete userPayload.address;

						await this.userService.updateByAddress(
							payload.address,
							userPayload,
						);
					} else {
						await this.userService.store(payload);
					}

					currentUser += 1;

					const progress = Helper.countProgress(
						currentUser,
						totalUser,
					);
					console.log(
						`[SYNC PROGRESS] => ${currentUser} of ${totalUser} users (${progress})`,
					);
				}
				currentLoop += 1;
				totalUser = users.total;
				isComplete = users.last;
			}

			isSuccess = true;
		} catch (error) {
			isSuccess = false;
		}

		return isSuccess;
	}

	private async processMultiplier(
		address: string,
	): Promise<I_UserBase['multiplier']> {
		const baseMultiplier = 1;
		const result: I_UserBase['multiplier'] = {
			base_multiplier: baseMultiplier,
			faction_multiplier: 0,
			snaefell_multiplier: 0,
			taikoon_multiplier: 0,
			total_raw_multiplier: baseMultiplier,
			total_multiplier: baseMultiplier,
		};

		const nft = await this.getUserNFT(address);
		const owner = nft.data.owner;

		if (owner) {
			result.faction_multiplier = Helper.formatMultiplier(
				owner.factionMultiplier,
			);
			result.snaefell_multiplier = Helper.formatMultiplier(
				owner.snaefellMultiplier,
			);
			result.taikoon_multiplier = Helper.formatMultiplier(
				owner.taikoonMultiplier,
			);
			result.total_raw_multiplier =
				Helper.formatMultiplier(owner.totalMultiplier) + baseMultiplier;
			result.total_multiplier =
				result.total_raw_multiplier > 3
					? 3
					: result.total_raw_multiplier;
		}

		return result;
	}

	private async processRankScore(
		address: string,
		totalMultiplier: number,
	): Promise<{ score: I_UserBase['score']; rank: I_UserBase['rank'] }> {
		const result = {
			score: {} as I_UserBase['score'],
			rank: {} as I_UserBase['rank'],
		};

		const data = await this.getUserRank(address);
		result.score!.current = data.score;
		result.score!.final = data.score * totalMultiplier;
		result.rank!.current = data.rank;
		result.rank!.final = -1;

		return result;
	}
}
