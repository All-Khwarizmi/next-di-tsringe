import type { IDatabase } from "./db";
import { injectable, inject } from "tsyringe";
/* eslint-disable @typescript-eslint/no-explicit-any */

@injectable()
export class IUserRepository {
  private _db: IDatabase;

  constructor(@inject("database") database: IDatabase) {
    this._db = database;
  }

  async createUser(user: { count: number; name: string }) {
    return this._db.create("users", user);
  }
  async incrementUserCount(user: IUser) {
    return this._db.update("users", user, user.id);
  }
  async getUser(path: string, id: string) {
    return this._db.getDoc(path, id);
  }
}

// export const userRepository = new IUserRepository(firestoreDatabase);

export interface IUser {
  name: string;
  count: number;
  id: string;
}
