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
   * @description get all data from selected server user must pass the uri
   * @example getAll('/posts'), getAll('/employees)
   * @param uri `string`
   */
  public getAll<T>(uri?: string): Observable<T> {
    console.log(this.config.server2);

    return this.http.get<T>(`${this.actionUrl}${uri ? uri : ""}`);
  }

  public getOne<T>(uri: string, id: any): Observable<T> {
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

  public post<T>(uri: string, postObject: any): Observable<T> {
    return this.http.post<T>(`${this.actionUrl}${uri}`, postObject);
  }

  /**
   * @description update method used to update object
   * @param `uri` @type `string` the uri for end point
   * @param `updateObject` the object that you will send to end point api to update it, must contain the `id/s` for the object
   * @returns `Observable<T>`
   */
  public update<T>(uri: string, updateObject: any): Observable<T> {
    return this.http.put<T>(`${this.actionUrl}${uri}`, updateObject);
  }

  public delete<T>(uri: string, id: any): Observable<T> {
    if (typeof id != "string") {
      throw new Error("id must be string");
    }
    return this.http.delete<T>(`${this.actionUrl}${uri}/` + id.toString());
  }
}
