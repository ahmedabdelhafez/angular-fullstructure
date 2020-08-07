import { Component, OnInit, Input } from "@angular/core";
import { GlobalService } from "src/app/services/Global.service";
import { Router, RoutesRecognized } from "@angular/router";
import { filter, map } from "rxjs/operators";

@Component({
  selector: "app-loadingspinner",
  templateUrl: "./loadingspinner.component.html",
  styleUrls: ["./loadingspinner.component.scss"],
})
export class LoadingspinnerComponent implements OnInit {
  loadingSpinnerState = false;
  @Input("spinnerDisablePages") spinnerDisablePages: string[] = [];
  constructor(private globalService: GlobalService, private router: Router) {}

  ngOnInit() {
    this.globalService.httpLoader.subscribe((data) => {
      this.loadingSpinnerState = data;
    });
  }
}
