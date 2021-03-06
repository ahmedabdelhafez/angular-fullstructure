import { Injectable } from "@angular/core";
import { HttpCall } from "./HttpCall.service";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class GlobalService {
  menuState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  httpLoader: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  //////////////////////
  constructor() {}

  get getMenuState() {
    return this.menuState.asObservable();
  }

  set setMenuState(state: boolean) {
    this.menuState.next(state);
  }

  show() {
    this.httpLoader.next(true);
  }

  hide() {
    this.httpLoader.next(false);
  }
}
