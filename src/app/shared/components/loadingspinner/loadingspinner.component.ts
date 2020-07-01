import { Component, OnInit } from "@angular/core";
import { GlobalService } from "src/app/services/Global.service";

@Component({
  selector: "app-loadingspinner",
  templateUrl: "./loadingspinner.component.html",
  styleUrls: ["./loadingspinner.component.scss"]
})
export class LoadingspinnerComponent implements OnInit {
  state = false;
  constructor(private globalService: GlobalService) {}

  ngOnInit() {
    this.globalService.httpLoader.subscribe(data => {
      this.state = data;
    });
  }
}
