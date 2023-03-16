import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import {
  createMotorcycleInput,
  createMotorcycleOutput,
  getAllMotorcycleOutput,
} from '../Mocks/MotorcycleMocks';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import Motorcycle from '../../../src/Domains/Motorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';

describe('MotorcycleService', function () {
  beforeEach(function () {
    sinon.restore();
  });

  it('should be able to create a new motorcycle through POST', async function () {
    const input: IMotorcycle = createMotorcycleInput;
    const output: Motorcycle = new Motorcycle(createMotorcycleOutput);
    sinon.stub(Model, 'create').resolves(createMotorcycleOutput);
    const service = new MotorcycleService();
    const result = await service.create(input);
    expect(result).to.be.deep.equal(output);
  });

  it('should be able to get a list of all motorcycles through GET /motorcycles', async function () {
    const output: Motorcycle[] = getAllMotorcycleOutput
      .map((motorcycle) => new Motorcycle(motorcycle));
    sinon.stub(Model, 'find').resolves(getAllMotorcycleOutput);
    const service = new MotorcycleService();
    const result = await service.getAllMotorcycle();
    expect(result).to.be.deep.equal(output);
  });

  it(
    'should return an error message with status code if the ID has an invalid format',
    async function () {
      sinon.stub(Model, 'findById').resolves(undefined);
      const motorcycleService = new MotorcycleService();
      const motorcycleById = await motorcycleService.getAllByIdMotorcycle('invalid');
      expect(motorcycleById).to.be.deep.equal(
        {
          message: 'Invalid mongo id',
          status: 422,
        },
      );
    },
  );

  it('should not be able to return a motorcycle that does not exist', async function () {
    const input = '6377c75de23e1cd0ef5ae88d';
    sinon.stub(Model, 'findById').resolves(null);
    try {
      const service = new MotorcycleService();
      await service.getAllByIdMotorcycle(input);
    } catch (error) {
      expect((error as Error).message).to.be.equal(
        { message: 'Motorcycle not found', status: 404 },
      );
    }
  });
});
