type MotorcycleCategoryTypes = 'Street' | 'Custom' | 'Trail';

const HONDA_POP_MODEL = 'Honda POP 110';
const HONDA_BROS_MODEL = 'Honda Bros ESD 150';

const createMotorcycleInput = {
  model: HONDA_POP_MODEL,
  year: 2017,
  color: 'Red',
  status: true,
  buyValue: 16.000,
  category: 'Street' as MotorcycleCategoryTypes,
  engineCapacity: 100,
};

const createMotorcycleOutput = {
  id: '6245511f24c457abcbd142b1',
  model: HONDA_POP_MODEL,
  year: 2017,
  color: 'Red',
  status: true,
  buyValue: 16.000,
  category: 'Street' as MotorcycleCategoryTypes,
  engineCapacity: 100,
};

const getAllMotorcycleOutput = [
  {
    model: HONDA_POP_MODEL,
    year: 2017,
    color: 'Red',
    status: true,
    buyValue: 16.000,
    category: 'Street' as MotorcycleCategoryTypes,
    engineCapacity: 100,
  },
  {
    id: '624463516b53b52468fcba52',
    model: HONDA_BROS_MODEL,
    year: 2023,
    color: 'Black',
    status: true,
    buyValue: 32.000,
    category: 'Street' as MotorcycleCategoryTypes,
    engineCapacity: 150,
  },
];

const motorcycleToUpdate = {
  model: HONDA_POP_MODEL,
  year: 2017,
  color: 'Red',
  status: true,
  buyValue: 16.000,
  category: 'Street' as MotorcycleCategoryTypes,
  engineCapacity: 100,
};

export {
  createMotorcycleInput,
  createMotorcycleOutput,
  getAllMotorcycleOutput,
  motorcycleToUpdate,
};