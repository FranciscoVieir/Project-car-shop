import IVehicle from './IVehicle';

type MotorcycleCategoryTypes = 'Street' | 'Custom' | 'Trail';

export default interface IMotorcycle extends IVehicle {
  category: MotorcycleCategoryTypes;
  engineCapacity: number;
}