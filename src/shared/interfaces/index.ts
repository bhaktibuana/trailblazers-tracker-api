export interface I_Pagination {
	total_items?: number;
	total_pages?: number;
	per_page?: number;
	current_page?: number;
	next_page?: number | null;
	previous_page?: number | null;
}

export interface I_HTTPResponse<T> {
	message: string;
	status: boolean;
	status_code: number;
	data: T | null;
	error: T | null;
	pagination: I_Pagination | null;
}

export interface I_TaikoGetUsersParams {
	sort: string;
	page: string;
	size: string;
}

export interface I_TaikoGetUsersResponse {
	items: {
		address: string;
		score: number;
	}[];
	page: number;
	size: number;
	max_page: number;
	total_pages: number;
	total: number;
	last: boolean;
	first: boolean;
	visible: number;
}

export interface I_TaikoGetNFTResponse {
	data: {
		owner: {
			id: string;
			totalMultiplier: string;
			factionMultiplier: string;
			snaefellMultiplier: string;
			taikoonMultiplier: string;
			ownedTokens: {
				contract: {
					name: string;
				};
				id: string;
				tokenId: string;
				badgeId: string | null;
				uri: string;
			}[];
		};
	};
}

export interface I_TaikoGetUserRankResponse {
	rank: number;
	address: string;
	score: number;
	multiplier: number;
	totalScore: number;
	total: number;
}
