import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivate,
} from "@angular/router";
import { Observable } from "rxjs";
import { JwtModule } from "@auth0/angular-jwt";
import { AppAlert } from "src/app/shared/util/AppAlert";
@Injectable({
  providedIn: "root",
})
export class CanactiveateGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Promise<boolean | UrlTree> {
    if (!localStorage.getItem("user")) {
      AppAlert.showToastInfo(
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
