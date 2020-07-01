import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanLoad,
} from "@angular/router";
import { Observable } from "rxjs";
import { AppAlert } from "src/app/shared/util/AppAlert";

@Injectable({
  providedIn: "root",
})
export class CanloadGuard implements CanLoad {
  async canLoad(
    route: import("@angular/router").Route,
    segments: import("@angular/router").UrlSegment[]
  ): Promise<boolean> {
    console.log("can load work fine");

    if (!localStorage.getItem("user")) {
      await AppAlert.showToastInfo(
        "you cannot visit this url please login",
        "",
        2000
      );
      return false;
    } else {
      return true;
    }
  }
}
