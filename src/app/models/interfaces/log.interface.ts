import { Document } from 'mongoose';

export interface I_Log extends I_LogBase, Document {}

export interface I_LogBase {
	label?: string;
	status_code?: number;
	message?: string;
	error?: string | undefined;
	created_at?: Date;
	updated_at?: Date;
	deleted_at?: Date | null;
}
