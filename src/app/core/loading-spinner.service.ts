import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from "@angular/common/http";
import { GlobalService } from "../services/Global.service";
import { finalize, tap, delay } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class LoadingSpinnerService implements HttpInterceptor {
  constructor(private globalService: GlobalService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.globalService.httpLoader.next(true);
    return next.handle(req).pipe(
      delay(1500),
      finalize(() => this.globalService.httpLoader.next(false)),
      tap(
        (event) => {
          if (event instanceof HttpResponse) {
            this.globalService.httpLoader.next(false);
          }
        },
        (err) => {
          this.globalService.httpLoader.next(false);
        }
      )
    );
  }
}
