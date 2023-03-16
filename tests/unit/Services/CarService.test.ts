import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import { carToCreate, createdCar } from '../Mocks/CarServiceMocks';
import CarService from '../../../src/Services/carService';

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
        { message: 'Invalid mongo id',
          status: 422,
        },
      );
    },
  );
});
