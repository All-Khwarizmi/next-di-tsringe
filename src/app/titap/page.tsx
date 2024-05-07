"use client";
import "reflect-metadata";
import { Child } from "./Child";
import { useState } from "react";
import type { Classe } from "@/data/db";
import { ClasseContext, databaseLocalStorage } from "./classe-ctx";

const classe = databaseLocalStorage.getClassePrefered();
console.log("prefered classe", classe?.name);
if (typeof window === "undefined") {
  console.log("window is undefined in Home");
}

export default function Home() {
  const [classe, setClasse] = useState<Classe>(
    databaseLocalStorage.getClassePrefered() ||
      databaseLocalStorage.getDefaultClasse()
  );
  console.log({ classeName: classe.name });
  return (
    <div className=" h-screen w-screen flex flex-col justify-center items-center px-4">
      <ClasseContext.Provider value={{ classe, setClasse }}>
        <Child />
      </ClasseContext.Provider>
    </div>
  );
}
