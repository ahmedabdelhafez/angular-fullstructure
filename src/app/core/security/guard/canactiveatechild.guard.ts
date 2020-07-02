import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivateChild,
} from "@angular/router";
import { Observable } from "rxjs";
import { AppAlert } from "src/app/shared/util/AppAlert";

@Injectable({
  providedIn: "root",
})
export class CanactiveatechildGuard implements CanActivateChild {
  async canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
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
