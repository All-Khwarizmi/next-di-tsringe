import type { JSONContent } from "@tiptap/react";

export interface Classe {
  name: string;
  id: string;
  students: string[];
  lessons: {
    date: string;
    notes: string;
    content?: string;
  };
}
export interface DatabaseOptions {
  preferedClasse: string;
  classes: Classe[];
}

export class DatabaseLocalStorage {
  private _classes: DatabaseOptions;
  constructor() {
    const classes = localStorage.getItem("classes");
    if (classes) {
      this._classes = JSON.parse(classes);
    } else {
      this._classes = {
        preferedClasse: "",
        classes: [
          {
            id: crypto.randomUUID(),
            name: "default",
            students: [],
            lessons: {
              date: new Date().toISOString(),
              notes: "",
              content: `
<h2>Getting started</h2>
<p>Welcome to the Tiptap editor!</p>
<p>This is a basic example of how to use the editor.</p>
<p>It’s a simple editor with a menu bar on top.</p>
<p>It’s possible to add your own menu items and extend the editor.</p>
<p>Have fun playing around with it!</p>
`,
            },
          },
        ],
      };
    }
  }

  getClasse({ name }: { name: string }) {
    return this._classes.classes.find((classe) => {
      if (classe.name === name) true;
    });
  }
  getAllClasses() {
    return this._classes.classes;
  }

  saveClasse({ classe }: { classe: Classe }) {
    this._classes.classes.push(classe);
    localStorage.setItem("classes", JSON.stringify(this._classes));
  }
  updateClasse({ classe, classeId }: { classe: Classe; classeId: string }) {
    const classeIndex = this._classes.classes.findIndex((classe) => {
      console.log(classe.id, classeId);
      if (classe.id === classeId) {
        console.log("Classe found");
        return true;
      }
    });
    if (classeIndex === -1) {
      console.error("Classe not found");
    }
    this._classes.classes[classeIndex] = classe;
    localStorage.setItem("classes", JSON.stringify(this._classes));
  }

  setPreferedClasse({ name }: { name: string }) {
    this._classes.preferedClasse = name;
    localStorage.setItem("classes", JSON.stringify(this._classes));
  }

  getClassePrefered() {
    const preferedClasseName = this._classes.preferedClasse;
    const classe = this._classes.classes.find((classe) => {
      console.log(classe.name, preferedClasseName);
      return classe.name === preferedClasseName;
    });
    console.log("prefered classe", classe);
    return classe;
  }

  getDefaultClasse() {
    return this._classes.classes[0];
  }
}

export const databaseLocalStorage = new DatabaseLocalStorage();
