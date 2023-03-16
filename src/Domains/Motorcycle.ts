import IMotorcycle from '../Interfaces/IMotorcycle';
import Vehicle from './Vehicle';

type MotorcycleCategoryTypes = 'Street' | 'Custom' | 'Trail';

export default class Motorcycle extends Vehicle {
  private category: MotorcycleCategoryTypes;
  private engineCapacity: number;

  constructor(obj: IMotorcycle) {
    super(obj);
    this.category = obj.category;
    this.engineCapacity = obj.engineCapacity;
  }
}
