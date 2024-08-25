import { Document } from 'mongoose';

export interface I_User extends I_UserBase, Document {}

export interface I_UserBase {
	address?: string;
	rank?: I_Rank;
	score?: I_Score;
	multiplier?: I_Multiplier;
	profile_url?: string;
	created_at?: Date;
	updated_at?: Date;
	deleted_at?: Date | null;
}

interface I_Rank {
	current?: number;
	final?: number;
}

interface I_Score extends I_Rank {}

interface I_Multiplier {
	base_multiplier?: number;
	faction_multiplier?: number;
	snaefell_multiplier?: number;
	taikoon_multiplier?: number;
	total_raw_multiplier?: number;
	total_multiplier?: number;
}
