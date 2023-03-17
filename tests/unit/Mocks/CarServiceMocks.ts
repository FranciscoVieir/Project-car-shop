import ICar from '../../../src/Interfaces/ICar';

const carToCreate: ICar = {
  model: 'Marea',
  year: 2002,
  color: 'Black',
  status: true,
  buyValue: 15.990,
  doorsQty: 4,
  seatsQty: 5,
};

const createdCar: ICar = {
  id: '62eaf55c3b4b2a80466091043',
  model: 'Golf',
  year: 2022,
  color: 'Black',
  status: true,
  buyValue: 45.990,
  doorsQty: 4,
  seatsQty: 5,
};

const updateInput = {
  model: 'Marea',
  year: 2002,
  color: 'Black',
  status: true,
  buyValue: 15.990,
  doorsQty: 4,
  seatsQty: 5,
};

const createANewObjCar: ICar = {
  id: '61bce4a375ec3d2b3d46c390',
  model: 'Golf',
  year: 2018,
  color: 'White',
  buyValue: 23.000,
  doorsQty: 2,
  seatsQty: 2,
  status: true,
};

export {
  carToCreate,
  createdCar,
  updateInput,
  createANewObjCar,
};