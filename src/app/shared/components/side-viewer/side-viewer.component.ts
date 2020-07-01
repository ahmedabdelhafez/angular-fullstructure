import {
  Component,
  OnInit,
  Input,
  TemplateRef,
  OnDestroy
} from "@angular/core";

import {
  trigger,
  style,
  state,
  transition,
  animate
} from "@angular/animations";
import { SideviewService } from "src/app/services/sideview.service";
@Component({
  selector: "side-viewer",
  templateUrl: "./side-viewer.component.html",
  styleUrls: ["./side-viewer.component.scss"],
  animations: [
    trigger("showhide", [
      state(
        "show",
        style({
          display: "initial",
          transform: "translateX(0px)",
          opacity: 1
        })
      ),
      state(
        "hide",
        style({
          transform: "translateX(-400px)",
          opacity: 0
          // display: "none"
        })
      ),
      transition("hide => show", animate("0.5s 0.2s ease-out")),
      transition("show => hide", animate("1s 0.1s ease-in"))
    ]),
    trigger("openclose", [
      state(
        "show",
        style({
          width: "*",
          opacity: 1,
          transform:'rotateX(180deg)'
        })
      ),
      state(
        "hide",
        style({
          width: "0",
          opacity: 0,
          transform: "rotateX(90deg)"
        })
      ),
      transition("close => open", animate("0.3s 0.2s ease-in")),
      transition("open => close", animate("0.6s 0.2s ease-out"))
    ])
  ]
})

/**
 * this component used to sho and hide side viewer to display coneten fro any template from any component
 * `Usage Guide:`
 * 1- you must inject the `SideView` service in the component that need to view its template item
 * 2- you must create a template ref in the component that want to view any data
 * 3- in th component that use the service you must add onDestroy hook and send state `hide` & template 'null' to close the side view
 */
export class SideViewerComponent implements OnInit, OnDestroy {
  @Input("viewTemplate") viewTemplate: TemplateRef<any>;
  state: string = "hide";
  template: TemplateRef<any>;
  constructor(private sideView: SideviewService) {}

  ngOnInit() {
    this.sideView.sideViewerState.subscribe((data: Object) => {
      console.log(data);
      this.state = data["state"];
      this.template = data["template"];
    });
  }

  closeViewer() {
    this.sideView.showHideSideViewer("hide", null);
  }

  ngOnDestroy(): void {
    // this.globalService.showHideSideViewer("hide", null);
  }
}
