import { IUserRepository, type IUser } from "./interfaces";
import { delay, inject, injectable } from "tsyringe";

@injectable()
export class UserUsecase {
  private _userRepository: IUserRepository;
  constructor(
    @inject(delay(() => IUserRepository)) userRepository: IUserRepository
  ) {
    this._userRepository = userRepository;
  }
  async create(user: { count: number; name: string }) {
    return await this._userRepository.createUser(user);
  }
  async incrementUserCount(user: IUser) {
    return await this._userRepository.incrementUserCount(user);
  }
  async getUser(userId: IUser["id"]) {
    const userDoc = await this._userRepository.getUser("users", userId);
    console.log({ userDoc });
    const user: IUser = {
      count: userDoc.data.count,
      id: userDoc.data.id,
      name: userDoc.data.name,
    };
    return user;
  }
}
// export const userUsecase = new UserUsecase(userRepository);
