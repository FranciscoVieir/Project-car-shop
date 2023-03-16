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
  buyValue: 175.990,
  doorsQty: 4,
  seatsQty: 5,
};

export {
  carToCreate,
  createdCar,
};