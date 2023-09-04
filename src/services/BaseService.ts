import {Document, Model} from 'mongoose';

export default abstract class BaseService<T extends Document> {
  constructor(protected model: Model<T>){}

  async create(data: Partial<T>): Promise<T>{
    return await this.model.create(data);
  }
  async findById(id: string): Promise<T | null>{
    return await this.model.findById(id);
  }
  async findAll(conditions: Partial<T> = {}): Promise<T[]>{
    return await this.model.find({conditions});
  }
  async update(data: Partial<T>): Promise<T | null> {
    return await this.model.findByIdAndUpdate(data._id, data, {new: true})
  }
  async delete(id:string): Promise<T | null>{
    return await this.model.findByIdAndDelete(id);
  }
}
