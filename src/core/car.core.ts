import {
  CarInterface,
  CarRepositoryInterface,
} from "../interfaces/car.interface";
import { UserInterface } from "../interfaces/user.interface";

export class CarCore {
  constructor(private carRepository: CarRepositoryInterface) {}
  async findAll() {
    return await this.carRepository.findAll();
  }
  async create(car: CarInterface, user_id: string) {
    return await this.carRepository.create(car, user_id);
  }
  async update(id: string, car: CarInterface) {
    return await this.carRepository.update(id, car);
  }
  async delete(id: string) {
    return await this.carRepository.delete(id);
  }
  async findById(id: string) {
    return await this.carRepository.findById(id);
  }
}
