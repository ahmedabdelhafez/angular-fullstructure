import { Injectable } from "@angular/core";
import { Subject, Observable } from 'rxjs';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

@Injectable({
  providedIn: "root"
})
export class LoadingSpinnerService implements HttpInterceptor {
  constructor() {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    throw new Error("Method not implemented.");
  }
  isLoading = new Subject<boolean>();

  showSpinner() {}

  hideSpinner() {}
}
