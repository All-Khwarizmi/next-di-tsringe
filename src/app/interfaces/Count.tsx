"use client";

import { useEffect, useState } from "react";
import { userAdapter } from "../interfaces/adapters";
import type { IUser } from "./interfaces";

export default function Count() {
  const [userLocalId, setUserLocalId] = useState<IUser["id"] | null>(null);
  const [localUser, setLocalUser] = useState<IUser | null>(null);
  const { setUserId: getUser, user } = userAdapter.useGetUser();
  const { setUser: incrementCount, newCount } =
    userAdapter.useIncrementUserCount();
  const { setUser, userId } = userAdapter.useCreateUser();
  useEffect(() => {
    if (userId) {
      setUserLocalId(userId);
    }
  }, [userId]);
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (newCount) {
      console.log("new count ", newCount, "old count", localUser?.count);
      if (localUser) {
        setLocalUser((prev) => (prev ? { ...prev, count: newCount } : null));
      }
    }
  }, [newCount]);
  useEffect(() => {
    if (user) {
      setLocalUser(user);
    }
  }, [user]);

  return (
    <div className="count">
      <div>
        Create User
        {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
        <button
          className="btn"
          onClick={() => setUser({ count: 0, name: "Jon" })}
        >
          +
        </button>
      </div>
      {userLocalId && (
        <div>
          <h1> get user with id {userLocalId} </h1>
          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
          <button onClick={() => getUser(userLocalId)}>+</button>
        </div>
      )}
      {localUser !== null && (
        <div>
          <h1> {localUser.count} </h1>
          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
          <button onClick={() => incrementCount(localUser)}>+</button>
        </div>
      )}
    </div>
  );
}
