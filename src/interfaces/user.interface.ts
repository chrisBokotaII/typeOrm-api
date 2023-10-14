export interface UserInterface {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

export interface UserRepositoryInterface {
  findAll(): Promise<UserInterface[]>;
  create(user: UserInterface): Promise<UserInterface>;
  update(id: string, user: UserInterface): Promise<UserInterface>;
  delete(id: string): Promise<UserInterface>;
  findById(id: string): Promise<UserInterface | null>;
  findByEmail(email: string): Promise<UserInterface | null>;
}
