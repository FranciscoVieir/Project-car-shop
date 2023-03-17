import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import { carToCreate, createdCar, updateInput, createANewObjCar } from '../Mocks/CarServiceMocks';
import CarService from '../../../src/Services/carService';
import ICar from '../../../src/Interfaces/ICar';
import Car from '../../../src/Domains/Car';

const CAR_NOT_FOUND_ERROR = 'Car not found';
const INVALID_MONGO_ID_ERROR = 'Invalid mongo id';

describe('CarService', function () {
  beforeEach(function () {
    sinon.restore();
  });

  it('should be able to create a new car through POST', async function () {
    sinon.stub(Model, 'create').resolves(createdCar);

    const carService = new CarService();
    const createdCar1 = await carService.create(carToCreate);

    expect(createdCar1).to.be.deep.equal(createdCar);
  });

  it('should be able to get a list of all cars through GET /cars', async function () {
    sinon.stub(Model, 'find').resolves([createdCar]);

    const carService = new CarService();
    const carsList = await carService.getAllCars();

    expect(carsList).to.be.deep.equal([createdCar]);
  });

  it(
    'should return an error message with status code if the ID has an invalid format',
    async function () {
      sinon.stub(Model, 'findById').resolves(undefined);

      const carService = new CarService();
      const carById = await carService.getCarById('invalid');

      expect(carById).to.be.deep.equal(
        {
          message: INVALID_MONGO_ID_ERROR,
          status: 422,
        },
      );
    },
  );
  it('Should not be possible to retrieve a non-existent car', async function () {
    const inputId = '634852326b35b59438fbea31';

    sinon.stub(Model, 'findById').resolves(null);

    try {
      const service = new CarService();
      await service.getCarById(inputId);
    } catch (error) {
      expect((error as Error).message).to.be.equal({ message: CAR_NOT_FOUND_ERROR, status: 404 });
    }
  });

  it('Should not be possible to retrieve a car when the ID format is invalid', async function () {
    const inputId = 'idInvalid';

    try {
      const service = new CarService();
      await service.getCarById(inputId);
    } catch (error) {
      expect((error as Error).message).to.be.equal({
        message: INVALID_MONGO_ID_ERROR,
        status: 422,
      });
    }
  });

  it('Should not be possible to update a car when the ID format is invalid', async function () {
    const idInput = 'idInvalid';
    const objInput: ICar = updateInput;

    try {
      const service = new CarService();
      await service.updateCar(idInput, objInput);
    } catch (error) {
      expect((error as Error).message).to.be.equal({
        message: INVALID_MONGO_ID_ERROR,
        status: 422,
      });
    }
  });

  it('should retrieve the specified car via GET request to "/card/:id"', async function () {
    const car = new Car(createANewObjCar);
    sinon.stub(Model, 'findById').resolves(car);

    const carService = new CarService();
    const result = await carService.getCarById(`${createANewObjCar.id}`);

    expect(result.data).to.deep.equal(createANewObjCar);
  });
});
