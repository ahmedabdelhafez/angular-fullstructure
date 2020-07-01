import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AppAlert } from "../../shared/util/AppAlert";
import { HttpErrorMessage } from "./HttpErrorMessage";
import { TranslationService } from "../translation.service";
import { retry } from "rxjs/operators";
import { ConsoleService } from "../../shared/util/ConsoleService";
@Injectable({
  providedIn: "root"
})
export class ErrorhandlerService implements HttpInterceptor {
  constructor(private translation?: TranslationService) {}

  HttpErrorMsg: HttpErrorMessage = new HttpErrorMessage(this.translation);

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      // retry(1),
      catchError((err: HttpErrorResponse) => {
        // << check client side error >> //
        if (err.error instanceof ErrorEvent) {
          AppAlert.showToastError(
            err.message,
            "an client side error alert",
            3000
          );
        } else {
          if (err.statusText === "Unknown Error") {
            this.HttpErrorMsg.handleHttpErrors(err.statusText);
          } else {
            console.log("An Error: " + err.status);
            this.HttpErrorMsg.handleHttpErrors(err.status);
          }
        }
        return throwError(err);
      })
    );
  }
}
