import { model, Model, models, Schema } from 'mongoose';

abstract class AbstractODM<T> {
  protected _model: Model<T>;
  protected schema: Schema<T>;
  protected modelName: string;

  constructor(schema: Schema, modelName: string) {
    this.schema = schema;
    this.modelName = modelName;
    this._model = models[this.modelName] || model(this.modelName, this.schema);
  }

  public async create(Newobj: T): Promise<T> {
    return this._model.create({ ...Newobj });
  }

  public async getAll(): Promise<T[]> {
    return this._model.find();
  }

  public async getById(id: string) {
    return this._model.findById(id);
  }

  public async update(id: string, obj: T) {
    return this._model.updateOne(
      { _id: id },
      { obj },
    );
  }
}

export default AbstractODM;