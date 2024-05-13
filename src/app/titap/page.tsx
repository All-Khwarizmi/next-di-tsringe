"use client";
import "reflect-metadata";
import { Child } from "./Child";
import { useState } from "react";
import type { Classe } from "@/data/db";
import { ClasseContext, databaseLocalStorage } from "./classe-ctx";


export default function Home() {
  const [classe, setClasse] = useState<Classe>(
    databaseLocalStorage.getClassePrefered() ||
      databaseLocalStorage.getDefaultClasse()
  );
  return (
    <div className=" h-screen w-screen flex flex-col justify-center items-center px-4">
      <ClasseContext.Provider value={{ classe, setClasse }}>
        <Child />
      </ClasseContext.Provider>
    </div>
  );
}
