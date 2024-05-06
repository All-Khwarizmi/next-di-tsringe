import { databaseLocalStorage, type Classe } from "@/data/db";
import Color from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useRouter } from "next/navigation";
import ListItem from "@tiptap/extension-list-item";
import { useContext } from "react";
import { ClasseContext } from "./page";

export default function ClasseComponent({ classe }: { classe: Classe }) {
  const { setClasse } = useContext(ClasseContext);
  const editor = useEditor({
    extensions: [
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure({ types: [ListItem.name] }),
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
      }),
    ],
    content: classe.lessons.content,
  });
  const router = useRouter();
  return (
    <>
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
    </>
  );
}
