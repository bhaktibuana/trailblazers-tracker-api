import axios, {
	AxiosInstance,
	AxiosRequestConfig,
	AxiosResponse,
	InternalAxiosRequestConfig,
} from 'axios';

export abstract class ApiLibrary {
	private api: AxiosInstance;

	constructor(baseURL: string, timeout: number = 30000) {
		this.api = axios.create({
			baseURL,
			timeout,
		});

		this.initializeInterceptors();
	}

	private initializeInterceptors() {
		this.api.interceptors.request.use(this.handleRequest, this.handleError);

		this.api.interceptors.response.use(
			this.handleResponse,
			this.handleError,
		);
	}

	private handleRequest(
		config: InternalAxiosRequestConfig,
	): InternalAxiosRequestConfig {
		return config;
	}

	private handleResponse(response: AxiosResponse): AxiosResponse {
		return response;
	}

	private handleError(error: any) {
		return Promise.reject(error);
	}

	protected async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
		const response = await this.api.get<T>(url, config);
		return response.data;
	}

	protected async post<T>(
		url: string,
		data: any,
		config?: AxiosRequestConfig,
	): Promise<T> {
		const response = await this.api.post<T>(url, data, config);
		return response.data;
	}

	protected async put<T>(
		url: string,
		data: any,
		config?: AxiosRequestConfig,
	): Promise<T> {
		const response = await this.api.put<T>(url, data, config);
		return response.data;
	}

	protected async delete<T>(
		url: string,
		config?: AxiosRequestConfig,
	): Promise<T> {
		const response = await this.api.delete<T>(url, config);
		return response.data;
	}
}
