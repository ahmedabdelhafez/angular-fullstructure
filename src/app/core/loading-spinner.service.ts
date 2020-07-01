import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class LoadingSpinnerService {
  constructor() {}
  isLoading = new Subject<boolean>();

  showSpinner() {}

  hideSpinner() {}
}
