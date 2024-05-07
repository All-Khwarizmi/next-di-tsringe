import { databaseLocalStorage } from "@/data/db";
import { useCurrentEditor, EditorContent, Editor } from "@tiptap/react";
import { useContext, useEffect, useState } from "react";
import ClasseComponent from "./Classe";
import { useRouter } from "next/navigation";
import Provider from "./provider";
import { ClasseContext } from "./page";

export function Child() {
  const { classe } = useContext(ClasseContext);
  const classes = databaseLocalStorage.getAllClasses();
  return (
    <div className="grid grid-cols-2 py-12 gap-6 h-screen w-screen mx-4">
      <div className="flex flex-col ">
        <h1>Classes</h1>

        {classes.map((classe, index) => {
          return <ClasseComponent classe={classe} key={classe.name} />;
        })}
      </div>
      <div>
        <Provider classe={classe}>
          <EditorComponent />
        </Provider>
      </div>
    </div>
  );
}

export function EditorComponent() {
  const [name, setName] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const { editor } = useCurrentEditor();
  const { classe } = useContext(ClasseContext);

  const router = useRouter();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    console.log("classe changed", classe);
    editor?.commands.setContent(classe?.lessons?.content || "");
  }, [classe]);
  return (
    <div>
      <form className="flex flex-col">
        <label htmlFor="name">Classe Name</label>
        <input
          value={name}
          onChange={(event) => {
            event.preventDefault();
            setName(event.target.value);
          }}
          name="name"
          type="text"
        />
        <label htmlFor="notes">Notes</label>
        <textarea
          value={notes}
          onChange={(event) => {
            event.preventDefault();
            setNotes(event.target.value);
          }}
          name="notes"
        />
        <button
          type="button"
          onClick={() => {
            console.log(editor?.getJSON());
            databaseLocalStorage.saveClasse({
              classe: {
                id: crypto.randomUUID(),
                name,
                students: [],
                lessons: {
                  date: new Date().toDateString(),
                  notes,
                  content: editor?.getHTML(),
                },
              },
            });
            router.refresh();
          }}
        >
          Add
        </button>
      </form>
    </div>
  );
}
