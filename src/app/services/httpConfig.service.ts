import { Injectable } from "@angular/core";

/**
 * @description uage of this class
 * 1- user can create any number of servers he used to get data from
 * 2- user can use [serverWithApiUrl] method to call the full server or can create his own url with multiple prifixes
 */
@Injectable({
  providedIn: "root"
})
export class HttpConfigService {
  server1 = {
    server: "http://localhost:",
    port: 3000,
    prefix: "api/",
    serverWithApiUrl(): string {
      return (
        this.server1.server + this.server1.port.toString() + this.server1.prefix
      );
    }
  };
  server2 = {
    server: "http://jsonplaceholder.typicode.com",
    port: 4000,
    prefix: "api/",
    serverWithApiUrl(): string {
      return this.server2.server;
    }
  };

  constructor() {}

  setServer(server: string) {}

  setApiUrl(apiUrl: string) {}
}
