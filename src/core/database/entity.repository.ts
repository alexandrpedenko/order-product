import { FilterQuery, Model, Document, ProjectionType, QueryOptions, ReturnsNewDoc, UpdateQuery } from "mongoose";

export class EntityRepository<T extends Document> {

  constructor(protected readonly entityModel: Model<T>) {}

  async findOne(
    filter?: FilterQuery<T>,
    projection?: ProjectionType<T> | null,
    options?: QueryOptions<T> | null
  ): Promise<T | null> {
    return this.entityModel.findOne(filter, projection, options);
  }

  async find(
    filter: FilterQuery<T>,
    projection?: ProjectionType<T> | null | undefined,
    options?: QueryOptions<T> | null | undefined
  ): Promise<T[] | null> {
    return this.entityModel.find(filter, projection, options);
  }

  async findOneAndUpdate(
    filter?: FilterQuery<T>,
    update?: UpdateQuery<T>,
    options?: QueryOptions<T> & { upsert: true } & ReturnsNewDoc
  ): Promise<T> {
    return await this.entityModel.findOneAndUpdate(filter, update, options);
  }

  async create(entityData: Partial<T>): Promise<T> {
    const entity = new this.entityModel(entityData);
    return entity.save();
  }

  async delete(
    filter?: FilterQuery<T>,
    options?: QueryOptions<T> | null
  ): Promise<T> {
    return this.entityModel.findOneAndDelete(filter, options);
  }

  async deleteMany(
    filter?: FilterQuery<T>,
    options?: QueryOptions<T>
  ): Promise<boolean> {
    const deleteResult = this.entityModel.deleteMany(filter, options);
    return (await deleteResult).deletedCount >= 1;
  }
}
