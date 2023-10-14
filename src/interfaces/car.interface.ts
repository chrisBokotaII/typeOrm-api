export interface CarInterface {
  id: string;
  name: string;
  model: string;
  year: string;
  color: string;
  created_at: Date;
  updated_at: Date;
}
export interface CarRepositoryInterface {
  findAll(): Promise<CarInterface[]>;
  create(car: CarInterface, user_id: string): Promise<CarInterface>;
  update(id: string, car: CarInterface): Promise<CarInterface>;
  delete(id: string): Promise<CarInterface>;
  findById(id: string): Promise<CarInterface | null>;
}
