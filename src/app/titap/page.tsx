"use client";

import { Child } from "./Child";
import {
  type SetStateAction,
  createContext,
  useState,
  type Dispatch,
} from "react";
import { type Classe, databaseLocalStorage } from "@/data/db";

const classe = databaseLocalStorage.getClassePrefered();
console.log("prefered classe", classe?.name);
const classeContextOptions: {
  classe: Classe;
  setClasse: Dispatch<SetStateAction<Classe>>;
} = {
  classe: classe || databaseLocalStorage.getDefaultClasse(),
  setClasse: () => {},
};

export const ClasseContext = createContext(classeContextOptions);

export default function Home() {
  const [classe, setClasse] = useState<Classe>(
    databaseLocalStorage.getClassePrefered() ||
      databaseLocalStorage.getDefaultClasse()
  );
  console.log({ classeName: classe.name });
  return (
    <div className=" h-screen w-screen flex justify-center items-center">
      <ClasseContext.Provider value={{ classe, setClasse }}>
        <Child />
      </ClasseContext.Provider>
    </div>
  );
}
