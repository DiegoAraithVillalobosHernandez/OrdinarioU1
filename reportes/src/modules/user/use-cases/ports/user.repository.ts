import { TUser } from "../../entities/user";

export interface IUserRepository {
  // nombreMetodo(param): promesa(que regresa)
  findAll(): Promise<TUser[]>;
  findById(id: number): Promise<TUser>;
  save(user: TUser): Promise<boolean>;
  update(user: TUser): Promise<boolean>;
  delete(id: number): Promise<boolean>;
}
