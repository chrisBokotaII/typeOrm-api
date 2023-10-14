import { Request, Response } from "express";
import { CarAdapter } from "../adapter/car.adapter";
import { CarCore } from "../core/car.core";
import { customRequest } from "../interfaces/request.interface";
import { UserCore } from "../core/user.core";
import { UserAdapdter } from "../adapter/user.adapter";

export class carController {
  static async findAll(req: Request, res: Response) {
    try {
      const carService = new CarCore(new CarAdapter());
      const cars = await carService.findAll();
      res.status(200).json(cars);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
  static async create(req: customRequest, res: Response) {
    try {
      const carService = new CarCore(new CarAdapter());
      const car = await carService.create(req.body, req.currentUser.id);

      res.status(201).json({
        car,
      });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
  static async update(req: Request, res: Response) {
    try {
      const carService = new CarCore(new CarAdapter());
      const car = await carService.update(req.params.id, req.body);
      res.status(200).json(car);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
  static async delete(req: Request, res: Response) {
    try {
      const carService = new CarCore(new CarAdapter());

      const car = await carService.delete(req.params.id);
      res.status(200).json(car);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  static async findById(req: Request, res: Response) {
    try {
      const carService = new CarCore(new CarAdapter());
      const car = await carService.findById(req.params.id);
      res.status(200).json(car);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
}
