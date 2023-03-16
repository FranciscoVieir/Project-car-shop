// import { NextFunction, Request, Response } from 'express';
import { Request, Response, NextFunction } from 'express';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/carService';

class CarController {
  private request: Request;
  private response: Response;
  private nextFunction: NextFunction;
  private carService: CarService;

  constructor(request: Request, response: Response, nextFunction: NextFunction) {
    this.request = request;
    this.response = response;
    this.nextFunction = nextFunction;
    this.carService = new CarService();
  }

  public async createCar() {
    const carData: ICar = {
      model: this.request.body.model,
      year: this.request.body.year,
      color: this.request.body.color,
      status: this.request.body.status || false,
      buyValue: this.request.body.buyValue,
      doorsQty: this.request.body.doorsQty,
      seatsQty: this.request.body.seatsQty,
    };

    try {
      const createdCar = await this.carService.create(carData);
      return this.response.status(201).json(createdCar);
    } catch (error) {
      this.nextFunction(error);
    }
  }

  public async getAllCars() {
    try {
      const allCars = await this.carService.getAllCars();
      return this.response.status(200).json(allCars);
    } catch (error) {
      this.nextFunction(error);
    }
  }

  public async getCarById() {
    try {
      const carId = this.request.params.id;
      const {
        message,
        status,
        data,
      } = await this.carService.getCarById(carId);

      if (data) {
        return this.response.status(status).json(data);
      }

      if (message) {
        return this.response.status(status).json({ message });
      }
    } catch (error) {
      this.nextFunction(error);
    }
  }

  public async updateCar() {
    try {
      const carId = this.request.params.id;
      const carData = this.request.body;

      const {
        message,
        status,
        data,
      } = await this.carService.updateCar(carId, carData);

      if (data) {
        return this.response.status(status).json(data);
      }

      if (message) {
        return this.response.status(status).json({ message });
      }
    } catch (error) {
      this.nextFunction(error);
    }
  }
}

export default CarController;
