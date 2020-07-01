import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from "@angular/common/http";
import { ConsoleService } from "../shared/util/ConsoleService";
import { GlobalService } from "../services/Global.service";
import { finalize, delay } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class RequestLogService implements HttpInterceptor {
  constructor(private globalService: GlobalService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): import("rxjs").Observable<HttpEvent<any>> {
    this.globalService.show();
    ConsoleService.info(`Http Method: ${req.method.toUpperCase()}`);
    // ConsoleService.info(`Requested URL: ${req.url}`);
    // ConsoleService.info(`Requested URL With Params: ${req.urlWithParams}`);
    return next.handle(req).pipe(finalize(() => this.globalService.hide()));
  }
}
