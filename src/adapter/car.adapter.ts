import { AppDataSource } from "../database/config";
import { Car } from "../entity/cars.entity";
import { User } from "../entity/user.entity";
import { CarRepositoryInterface } from "../interfaces/car.interface";
import { UserInterface } from "../interfaces/user.interface";

export class CarAdapter implements CarRepositoryInterface {
  async findAll() {
    const carRepository = AppDataSource.getRepository(Car);
    const cars = await carRepository.find();

    return cars;
  }
  async create(car: Car, user_id: string) {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ id: user_id });
    const newCar = new Car();
    newCar.name = car.name;
    newCar.model = car.model;

    newCar.year = car.year;
    newCar.color = car.color;
    newCar.user = user as User;
    const carRepository = AppDataSource.getRepository(Car);
    await carRepository.save(newCar);

    return newCar;
  }
  async update(id: string, car: Car) {
    const carRepository = AppDataSource.getRepository(Car);
    const carToUpdate = await carRepository.findOneBy({ id });
    if (!carToUpdate) {
      throw new Error("Car not found");
    }
    carToUpdate.model = car.model;
    carToUpdate.year = car.year;
    carToUpdate.color = car.color;
    await carRepository.save(carToUpdate);

    return carToUpdate;
  }
  async delete(id: string) {
    const carRepository = AppDataSource.getRepository(Car);
    const carToDelete = await carRepository.findOneBy({ id });
    if (!carToDelete) {
      throw new Error("Car not found");
    }
    await carRepository.delete(carToDelete);

    return carToDelete;
  }
  async findById(id: string) {
    const carRepository = AppDataSource.getRepository(Car);
    return await carRepository.findOneBy({ id });
  }
}
