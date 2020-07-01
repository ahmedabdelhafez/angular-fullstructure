import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class SideviewService {
  constructor() {}
  sideViewerState: Subject<Object> = new Subject();
  showHideSideViewer(state: string, template?: any) {
    this.sideViewerState.next({ state: state, template: template });
  }
  hideSideViewswer(state: string = "hide", template?: any) {
    this.sideViewerState.next({ state: state, template: null });
  }
}
