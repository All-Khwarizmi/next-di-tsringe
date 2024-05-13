"use client";
import type { Classe } from "@/data/db";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { ClasseContext, databaseLocalStorage } from "./classe-ctx";

export default function ClasseComponent({ classe }: { classe: Classe }) {
  const { setClasse } = useContext(ClasseContext);

  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => {
        setClasse(classe);
        databaseLocalStorage.setPreferedClasse({ name: classe.name });
        router.refresh();
      }}
    >
      {classe.name}
    </button>
  );
}
