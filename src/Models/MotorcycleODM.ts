import { Schema } from 'mongoose';
import IMotorcycle from '../Interfaces/IMotorcycle';
import AbstractODM from './AbstractODM';

class MotorcycleODM extends AbstractODM<IMotorcycle> {
  constructor() {
    const schema = new Schema<IMotorcycle>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: false },
      buyValue: { type: Number, required: true },
      category: { type: String, required: true },
      engineCapacity: { type: Number, required: true },
    });
    super(schema, 'Motorcycle');
  }

  public async create(ANewMotorcycle: IMotorcycle): Promise<IMotorcycle> {
    return this._model.create({ ...ANewMotorcycle });
  }

  public async getAll(): Promise<IMotorcycle[]> {
    return this._model.find({});
  }

  public async getAllById(id: string) {
    return this._model.findById(id);
  }

  public async updateById(id: string, obj: IMotorcycle) {
    return this._model.updateOne(
      { _id: id },
      { obj },
    );
  }
}

export default MotorcycleODM;