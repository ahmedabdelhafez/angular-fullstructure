import { Injectable } from "@angular/core";
import { PreloadingStrategy, Route } from "@angular/router";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PreloadStartegyService implements PreloadingStrategy {
  constructor() {}
  // preload key must be in the data object on the module route
  preload(
    route: Route,
    load: () => import("rxjs").Observable<any>
  ): Observable<any> {
    if (route.data && route.data["preload"]) {
      return load();
    } else {
      return of(null);
    }
  }
}
