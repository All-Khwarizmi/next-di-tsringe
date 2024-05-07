import { DatabaseLocalStorage, type Classe } from "@/data/db";
import { type Dispatch, type SetStateAction, createContext } from "react";
import { container } from "tsyringe";

const inMemoryStorage: Storage = {
  getItem: () => null,
  setItem: () => null,
  removeItem: () => null,
  clear: () => null,
  key: () => null,
  length: 0,
};

let storage: Storage;
if (typeof window !== "undefined") {
  storage = window.localStorage;
} else {
  storage = inMemoryStorage;
}

container.register("storage", {
  useValue: storage,
});
export const databaseLocalStorage = container.resolve(DatabaseLocalStorage);

const classe = databaseLocalStorage.getClassePrefered();

const classeContextOptions: {
  classe: Classe;
  setClasse: Dispatch<SetStateAction<Classe>>;
} = {
  classe: classe || databaseLocalStorage.getDefaultClasse(),
  setClasse: () => {},
};

export const ClasseContext = createContext(classeContextOptions);
