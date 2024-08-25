import dayjs from 'dayjs';
import { ObjectId } from 'bson';
import {
	Document,
	Model,
	PipelineStage,
	RootQuerySelector,
	UpdateQuery,
} from 'mongoose';

export abstract class ModelLibrary<T extends Document> {
	protected model: Model<T>;

	constructor(model: Model<T>) {
		this.model = model;
	}

	public async saveInstance(document: Partial<T>): Promise<T> {
		const instance = new this.model(document);
		return instance.save();
	}

	public async findOne(query: RootQuerySelector<T>): Promise<T | null> {
		const queryPayload = { ...query, deleted_at: null };
		return this.model.findOne(queryPayload).exec();
	}

	public async findById(id: ObjectId): Promise<T | null> {
		return this.findOne({ _id: id });
	}

	public async softDelete(id: ObjectId): Promise<T | null> {
		return this.model
			.findByIdAndUpdate(
				id,
				{ deleted_at: dayjs().toDate() } as UpdateQuery<T>,
				{ new: true },
			)
			.exec();
	}

	public async getRaw(pipeline: PipelineStage[]): Promise<T[]> {
		return this.model.aggregate(pipeline).exec();
	}

	public async findByIdAndUpdate(
		id: ObjectId,
		updateData: Partial<T>,
		options: { returnUpdated?: boolean } = {},
	): Promise<T | null> {
		const { returnUpdated = true } = options;
		const updateOptions = { new: returnUpdated };
		const payload = { ...updateData, updated_at: dayjs().toDate() };

		return this.model
			.findByIdAndUpdate(id, payload as UpdateQuery<T>, updateOptions)
			.exec();
	}

	public async findOneAndUpdate(
		query: RootQuerySelector<T>,
		updateData: Partial<T>,
		options: { returnUpdated?: boolean } = {},
	): Promise<T | null> {
		const { returnUpdated = true } = options;
		const updateOptions = { new: returnUpdated };
		const payload = { ...updateData, updated_at: dayjs().toDate() };

		return this.model
			.findOneAndUpdate(query, payload as UpdateQuery<T>, updateOptions)
			.exec();
	}
}
