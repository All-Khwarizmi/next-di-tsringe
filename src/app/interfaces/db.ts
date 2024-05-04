import { injectable, inject } from "tsyringe";

export class Firestore {
  [key: string]: {
    [key: string]: any;
  };
}
export interface Doc {
  data: {
    [key: string]: any;
  };
}

export abstract class IDatabase {
  abstract create(path: string, data: any, id?: string): Promise<string>;

  abstract update(path: string, data: any, id: string): Promise<Doc>;

  abstract getDoc(path: string, id: string): Promise<Doc>;
}

@injectable()
export class FirebaseDatabase implements IDatabase {
  private _db: Firestore;

  constructor(@inject("db") db: Firestore) {
    this._db = db;
  }
  async getDoc(path: string, id: string): Promise<Doc> {
    console.log({ db: this._db });
    const doc = this._db[path][id];
    console.log("Doc retrieved", { data: { ...doc } });
    return { data: doc };
  }
  async update(path: string, data: any, id: string): Promise<Doc> {
    console.log({ data });
    this._db[path][id] = data;
    const doc = this._db[path][id];
    console.log("Doc updated", { doc });
    return {
      data: {
        ...doc,
      },
    };
  }
  async create(path: string, data: any, id?: string): Promise<string> {
    const docId = id ?? crypto.randomUUID();
    // Ensure path exist
    this._db[path] = {};
    this._db[path][docId] = { ...data, id: docId };

    const doc = this._db[path][docId];
    console.log(`Doc with id ${docId} created`, { doc });
    return docId;
  }
}

// const firestore: Firestore = {} as Firestore;
// export const firestoreDatabase = new FirebaseDatabase(firestore);
