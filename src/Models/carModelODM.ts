import { Schema } from 'mongoose';
import ICar from '../Interfaces/ICar';
import AbstractODM from './AbstractODM';

class CarODM extends AbstractODM<ICar> {
  constructor() {
    const schema = new Schema<ICar>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: false },
      buyValue: { type: Number, required: true },
      doorsQty: { type: Number, required: true },
      seatsQty: { type: Number, required: true },
    });
    super(schema, 'Car');
  }

  public async create(Newcar: ICar): Promise<ICar> {
    return this._model.create({ ...Newcar });
  }
  public async getAll(): Promise<ICar[]> {
    return this._model.find({});
  }

  public async getAllById(id: string) {
    const result = this._model.findById(id);

    return result;
  }
  public async update(id: string, obj: ICar) {
    return this._model.updateOne(
      { _id: id },
      { obj },
    );
  }
}

export default CarODM;
