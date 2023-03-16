import { isValidObjectId } from 'mongoose';
import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/carModelODM';

const CAR_NOT_FOUND_ERROR = 'Car not found';
const INVALID_MONGO_ID_ERROR = 'Invalid mongo id';

class CarService {
  private createCarDomain(car: ICar | null) {
    if (car) {
      return new Car(car);
    }
    return null;
  }

  public async create(newCarData: ICar) {
    const carODM = new CarODM();
    const createdCarData = await carODM.create(newCarData);

    const createdCarObject = this.createCarDomain(createdCarData);

    return createdCarObject;
  }

  public async getAllCars() {
    const carODM = new CarODM();
    const allCarsData = await carODM.getAll();
    const allCarsObjects = allCarsData.map((carData) => this.createCarDomain(carData));

    return allCarsObjects;
  }

  public async getCarById(carId: string) {
    if (!isValidObjectId(carId)) {
      return { message: INVALID_MONGO_ID_ERROR, status: 422 };
    }

    const carODM = new CarODM();
    const foundCarData = await carODM.getAllById(carId);

    if (!foundCarData) {
      return { message: CAR_NOT_FOUND_ERROR, status: 404 };
    }

    const createANewCar = this.createCarDomain(foundCarData);

    return {
      data: createANewCar,
      status: 200,
    };
  }

  public async updateCar(carId: string, updatedCarDataId: ICar) {
    const foundCar = await this.getCarById(carId);

    if (foundCar.data) {
      const carODM = new CarODM();
      await carODM.update(carId, updatedCarDataId);
      const updatedCarDomain = this.createCarDomain(
        { id: carId,
          ...updatedCarDataId,
        },
      );

      return {
        data: updatedCarDomain,
        status: 200,
      };
    }

    return foundCar;
  }
}

export default CarService;
