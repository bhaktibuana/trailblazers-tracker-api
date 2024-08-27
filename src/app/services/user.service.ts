// @ts-ignore
import XLSX from 'xlsx';
import path from 'path';
import fs from 'fs';

import { Service } from '@/libs';
import { User } from '@/app/models/user.model';
import { I_User, I_UserBase } from '@/app/models/interfaces/user.interface';
import { PipelineStage } from 'mongoose';
import { Constant } from '@/shared/constants';
import dayjs from 'dayjs';
import { Request } from 'express';

export class UserService extends Service {
	constructor() {
		super();
	}

	public async index(): Promise<I_User[]> {
		const pipelines: PipelineStage[] = [
			{
				$project: {
					_id: 0,
					address: 1,
					score: 1,
					multiplier: 1,
					profile_url: 1,
				},
			},
		];

		const user = new User();
		const response = await user.getRaw(pipelines);
		return response;
	}

	public async store(payload: I_UserBase) {
		const user = new User();
		user.payload = payload;
		await user.save();
		return user;
	}

	public async getByAddress(address: string): Promise<I_User | null> {
		const user = new User();
		const response = await user.findOne({ address });
		return response;
	}

	public async updateByAddress(
		address: string,
		payload: I_User,
	): Promise<I_User | null> {
		const user = new User();
		const response = await user.findOneAndUpdate({ address }, payload);
		return response;
	}

	public async getByScore(scoreType: 'current' | 'final'): Promise<I_User[]> {
		const sort: any =
			scoreType === 'current'
				? { 'score.current': -1 }
				: { 'score.final': -1 };

		const pipelines: PipelineStage[] = [
			{
				$sort: sort,
			},
			{
				$project: {
					_id: 0,
					address: 1,
					score: 1,
					multiplier: 1,
					profile_url: 1,
				},
			},
		];

		const user = new User();
		const response = await user.getRaw(pipelines);
		return response;
	}

	public async countAhead(address: string): Promise<object> {
		const pipelines: PipelineStage[] = [
			{
				$facet: {
					primary: [
						{
							$match: {
								address: address,
							},
						},
						{
							$project: {
								_id: 0,
								score: 1,
							},
						},
					],
					non_primary: [
						{
							$match: {
								address: {
									$ne: address,
								},
							},
						},
					],
				},
			},
			{
				$unwind: '$primary',
			},
			{
				$unwind: '$non_primary',
			},
			{
				$match: {
					$expr: {
						$and: [
							{
								$lt: [
									'$non_primary.score.current',
									'$primary.score.current',
								],
							},
							{
								$gt: [
									'$non_primary.score.final',
									'$primary.score.final',
								],
							},
						],
					},
				},
			},
			{
				$group: {
					_id: null,
					higher_non_primary_count: {
						$sum: 1,
					},
				},
			},
			{
				$project: {
					_id: 0,
					higher_non_primary_count: {
						$ifNull: ['$higher_non_primary_count', 0],
					},
				},
			},
		];

		const user = new User();
		const response = await user.getRaw(pipelines);

		const currentScoreData = await this.getByScore('current');
		const finalScoreData = await this.getByScore('final');

		let currentRank = 0;
		let finalRank = 0;

		currentScoreData.forEach((currentScore, index) => {
			if (currentScore.address === Constant.PRIMARY_ADDRESS) {
				currentRank = index + 1;
			}
		});

		finalScoreData.forEach((finalScore, index) => {
			if (finalScore.address === Constant.PRIMARY_ADDRESS) {
				finalRank = index + 1;
			}
		});

		const higerNonPiramryCount = (response[0] as any)
			.higher_non_primary_count;

		const result = {
			higher_non_primary_count: higerNonPiramryCount,
			rank_up_count: currentRank + higerNonPiramryCount - finalRank,
			current_rank: currentRank,
			final_rank: finalRank,
		};

		return result;
	}

	public async export(req: Request, address: string): Promise<object> {
		const url = `${req.protocol}://${req.headers.host}`;
		const fileName = `trailblazers-user_${dayjs().format('DD-MM-YYYY-HH:mm:ss')}.xlsx`;
		const filePath = path.join(process.cwd(), `./public/${fileName}`);

		const directory = path.dirname(filePath);
		if (!fs.existsSync(directory)) {
			fs.mkdirSync(directory, { recursive: true });
		}

		const currentScoreData = await this.getByScore('current');
		const finalScoreData = await this.getByScore('final');
		const countAheadData = await this.countAhead(address);

		const worksheet1 = XLSX.utils.json_to_sheet(
			currentScoreData.map((user) => ({
				Address: user.address,
				'Current Score': user.score!.current,
				'Final Score': user.score!.final,
				'Base Multiplier': user.multiplier!.base_multiplier,
				'Faction Multiplier': user.multiplier!.faction_multiplier,
				'Snaefell Multiplier': user.multiplier!.snaefell_multiplier,
				'Taikoon Multiplier': user.multiplier!.taikoon_multiplier,
				'Total Raw Multiplier': user.multiplier!.total_raw_multiplier,
				'Total Multiplier': user.multiplier!.total_multiplier,
				'Profile URL': user.profile_url,
			})),
		);
		const worksheet2 = XLSX.utils.json_to_sheet(
			finalScoreData.map((user) => ({
				Address: user.address,
				'Current Score': user.score!.current,
				'Final Score': user.score!.final,
				'Base Multiplier': user.multiplier!.base_multiplier,
				'Faction Multiplier': user.multiplier!.faction_multiplier,
				'Snaefell Multiplier': user.multiplier!.snaefell_multiplier,
				'Taikoon Multiplier': user.multiplier!.taikoon_multiplier,
				'Total Raw Multiplier': user.multiplier!.total_raw_multiplier,
				'Total Multiplier': user.multiplier!.total_multiplier,
				'Profile URL': user.profile_url,
			})),
		);
		const worksheet3 = XLSX.utils.json_to_sheet(
			[countAheadData].map((item: any) => ({
				'Higher Non-Primary Count': item.higher_non_primary_count,
				'Rank-Up Count': item.rank_up_count,
				'Current Rank': item.current_rank,
				'Final Rank': item.final_rank,
			})),
		);

		const workbook = XLSX.utils.book_new();

		XLSX.utils.book_append_sheet(workbook, worksheet1, 'Current Score');
		XLSX.utils.book_append_sheet(workbook, worksheet2, 'Final Score');
		XLSX.utils.book_append_sheet(workbook, worksheet3, 'Count Ahead');

		XLSX.writeFile(workbook, filePath);

		return {
			file_url: `${url}/${fileName}`,
		};
	}
}
