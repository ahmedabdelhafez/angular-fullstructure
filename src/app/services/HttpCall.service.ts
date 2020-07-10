import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { HttpConfigService } from "./httpConfig.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class HttpCall {
  actionUrl: string;
  urlHeaders = new HttpHeaders();

  constructor(private http: HttpClient, private config: HttpConfigService) {
    this.actionUrl = this.config.server2.server;
    console.log("Active Url: " + this.actionUrl);
  }

  ngOnInit() {}

  /**
   * @description get all data from selected server user must pass the `uri`
   * @example getAll('/posts'), getAll('/employees)
   * @param uri `string`
   */
  public getAll<T>(uri?: string): Observable<T> {
    console.log(this.config.server2);

    return this.http.get<T>(`${this.actionUrl}${uri ? uri : ""}`);
  }

  /**
   * @description get one object from selected server user must pass the `uri`
   * @example getOne('/posts','1'), getOne('/employees,1)
   * @param uri `string`
   * @param id `string`
   */
  public getOne<T>(uri: string, id: string): Observable<T> {
    return this.http.get<T>(`${this.actionUrl}${uri}${id ? `/${id}` : ""}`);
  }

  public getOneByQuery<T>(
    uri: string,
    queryParams?: any,
    id?: any
  ): Observable<T> {
    return this.http.get<T>(`${this.actionUrl}${uri}/${id ? id : ""}`, {
      params: queryParams ? queryParams : {},
    });
  }

  public post<T>(uri: string, objectTopost: T): Observable<T> {
    return this.http.post<T>(`${this.actionUrl}${uri}`, objectTopost);
  }

  /**
   * @description update method used to update object
   * @param `uri` @type `string` the uri for end point
   * @param `updateObject` the object that you will send to end point api to update it, must contain the `id/s` for the object
   * @returns `Observable<T>`
   */
  public update<T>(uri: string, objectToUpdate: T): Observable<T> {
    return this.http.put<T>(`${this.actionUrl}${uri}`, objectToUpdate);
  }

  public delete<T>(uri: string, id: T): Observable<T> {
    if (typeof id === "string") {
      return this.http.delete<T>(`${this.actionUrl}${uri}/` + id.toString());
    }
    return this.http.delete<T>(`${this.actionUrl}${uri}`, id);
  }
}
