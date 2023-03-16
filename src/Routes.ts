import { Router } from 'express';
import CarController from './Controllers/CarController';
import MotorcycleController from './Controllers/MotorcycleController';

const router = Router();

router.post('/cars', (req, res, next) =>
  new CarController(req, res, next).createCar());

router.get('/cars', (req, res, next) => new CarController(req, res, next).getAllCars());

router.get('/cars/:id', (req, res, next) => new CarController(req, res, next).getCarById());

router.put('/cars/:id', (req, res, next) => new CarController(req, res, next).updateCar());

router.get('/motorcycles', (req, res, next) =>
  new MotorcycleController(req, res, next).getAllMotorcycle());

router.get('/motorcycles/:id', (req, res, next) =>
  new MotorcycleController(req, res, next).getMotorcycleById());

router.post('/motorcycles', (req, res, next) =>
  new MotorcycleController(req, res, next).createMotorcycle());

router.put('/motorcycles/:id', (req, res, next) =>
  new MotorcycleController(req, res, next).updateMotorcycle());

export default router;
