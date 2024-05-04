import { useState, useEffect } from "react";
import { IUserRepository, type IUser } from "./interfaces";
import { UserUsecase } from "./usecase";
import { container } from "tsyringe";
import { FirebaseDatabase } from "./db";
container.register("db", { useValue: {} });
container.register("database", { useClass: FirebaseDatabase });
container.register("userRepository", { useClass: IUserRepository });
const userUsecase = container.resolve(UserUsecase);
export function useCreateUser(userUsecase: UserUsecase) {
  const [user, setUser] = useState<{
    count: number;
    name: string;
  } | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  useEffect(() => {
    if (user) {
      userUsecase.create(user).then((userId) => setUserId(userId));
    }
  }, [user, userUsecase]);
  return { setUser, userId };
}

export function useGetUser(userUsecase: UserUsecase) {
  const [user, setUser] = useState<IUser | null>(null);

  const [userId, setUserId] = useState<IUser["id"] | null>(null);
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    console.log("getting user id :", user?.id);
    if (userId) {
      userUsecase.getUser(userId).then((user) => {
        setUser(user);
      });
    }
  }, [userId, userUsecase]);

  return { setUserId, user };
}
export function useIncrementUserCount(userUsecase: UserUsecase) {
  const [user, setUser] = useState<IUser | null>(null);
  const [newCount, setNewCount] = useState<IUser["count"] | null>();
  useEffect(() => {
    if (user) {
      userUsecase
        .incrementUserCount({
          ...user,
          count: user.count + 1,
        })
        .then((doc) => setNewCount(doc.data.count));
    }
  }, [user, userUsecase]);
  return { setUser, newCount };
}

export function UserAdapter(userUsecase: UserUsecase) {
  return {
    useCreateUser: useCreateUser.bind(null, userUsecase),
    useIncrementUserCount: useIncrementUserCount.bind(null, userUsecase),
    useGetUser: useGetUser.bind(null, userUsecase),
  };
}

export const userAdapter = UserAdapter(userUsecase);
