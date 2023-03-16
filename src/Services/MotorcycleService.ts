import { isValidObjectId } from 'mongoose';
import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

const NOT_FOUND_ERROR = 'Motorcycle not found';
const INVALID_ID_ERROR = 'Invalid mongo id';

class MotorcycleService {
  private createMotorcycleDomain(motorcycle: IMotorcycle | null) {
    if (motorcycle) {
      return new Motorcycle(motorcycle);
    }
    return null;
  }

  public async create(motorcycleData: IMotorcycle) {
    const motorcycleODM = new MotorcycleODM();
    const createdMotorcycle = await motorcycleODM.create(motorcycleData);

    return this.createMotorcycleDomain(createdMotorcycle);
  }

  public async getAllMotorcycle() {
    const motorcycleODM = new MotorcycleODM();
    const allMotorcyclesData = await motorcycleODM.getAll();
    const allMotorcycles = allMotorcyclesData
      .map((motorcycleData) => this.createMotorcycleDomain(motorcycleData));

    return allMotorcycles;
  }

  public async getAllByIdMotorcycle(id: string) {
    if (!isValidObjectId(id)) {
      return { message: INVALID_ID_ERROR, status: 422 };
    }

    const motorcycleODM = new MotorcycleODM();
    const foundMotorcycleData = await motorcycleODM.getById(id);

    if (!foundMotorcycleData) {
      return { message: NOT_FOUND_ERROR, status: 404 };
    }

    const createANewMotorcycle = this.createMotorcycleDomain(foundMotorcycleData);

    return {
      data: createANewMotorcycle,
      status: 200,
    };
  }

  public async updateByIdMotorcycle(id: string, updatedDataId: IMotorcycle) {
    const foundMotorcycle = await this.getAllByIdMotorcycle(id);

    if (foundMotorcycle.data) {
      const motorcycleODM = new MotorcycleODM();
      await motorcycleODM.updateById(id, updatedDataId);
      const updatedMotorcycleId = this.createMotorcycleDomain({
        id,
        ...updatedDataId,
      });

      return {
        data: updatedMotorcycleId,
        status: 200,
      };
    }

    return foundMotorcycle;
  }
}

export default MotorcycleService;