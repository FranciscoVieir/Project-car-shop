import { NextFunction, Request, Response } from 'express';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/MotorcycleService';

class MotorcycleController {
  private request: Request;
  private response: Response;
  private nextFunction: NextFunction;
  private service: MotorcycleService;

  constructor(request: Request, response: Response, nextFunction: NextFunction) {
    this.request = request;
    this.response = response;
    this.nextFunction = nextFunction;
    this.service = new MotorcycleService();
  }

  public async createMotorcycle() {
    const motorcycle: IMotorcycle = {
      model: this.request.body.model,
      year: this.request.body.year,
      color: this.request.body.color,
      status: this.request.body.status,
      buyValue: this.request.body.buyValue,
      category: this.request.body.category,
      engineCapacity: this.request.body.engineCapacity,
    };

    try {
      const newMotorcycle = await this.service.create(motorcycle);
      return this.response.status(201).json(newMotorcycle);
    } catch (error) {
      this.nextFunction(error);
    }
  }

  public async getAllMotorcycle() {
    try {
      const allMotorcycles = await this.service.getAllMotorcycle();
      return this.response.status(200).json(allMotorcycles);
    } catch (error) {
      this.nextFunction(error);
    }
  }

  public async getMotorcycleById() {
    try {
      const motorCycleId = this.request.params.id;

      const {
        message,
        status,
        data,
      } = await this.service.getAllByIdMotorcycle(motorCycleId);

      if (data) return this.response.status(status).json(data);

      if (message) return this.response.status(status).json({ message });
    } catch (error) {
      this.nextFunction(error);
    }
  }

  public async updateMotorcycle() {
    try {
      const motorCycleId = this.request.params.id;
      const motorCycleBody = this.request;

      const {
        message,
        status,
        data,
      } = await this.service.updateByIdMotorcycle(motorCycleId, motorCycleBody.body);

      if (data) return this.response.status(status).json(data);

      if (message) return this.response.status(status).json({ message });
    } catch (error) {
      this.nextFunction(error);
    }
  }
}

export default MotorcycleController;
