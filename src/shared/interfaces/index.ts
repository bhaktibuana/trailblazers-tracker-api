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
