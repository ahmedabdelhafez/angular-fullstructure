import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgxIndexedDBModule, DBConfig } from "ngx-indexed-db";

const dbConfig: DBConfig = {
  name: "MyDb",
  version: 1,
  objectStoresMeta: [
    {
      store: "people",
      storeConfig: { keyPath: "id", autoIncrement: true },
      storeSchema: [
        { name: "name", keypath: "name", options: { unique: false } },
        { name: "email", keypath: "email", options: { unique: false } },
      ],
    },
    {
      store: "users",
      storeConfig: { keyPath: "id", autoIncrement: true },
      storeSchema: [
        { name: "token", keypath: "token", options: { unique: false } },
        { name: "username", keypath: "username", options: { unique: false } },
      ],
    },
  ],
};

@NgModule({
  imports: [CommonModule, NgxIndexedDBModule.forRoot(dbConfig)],
  declarations: [],
  exports: [NgxIndexedDBModule],
})
export class IndexdbConfigModule {}
