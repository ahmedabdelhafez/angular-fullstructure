import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";

@Component({
  selector: "app-flexcontainer",
  templateUrl: "./flex.component.html",
  styleUrls: ["./flex.component.scss"],
})
export class FlexComponent implements OnInit, OnChanges {
  @Input("flexGap") flexGap: number = 5;
  flexGapSize: string = "";
  @Input("bgColor") bgColor = "green";
  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.flexGapSize = this.flexGap + "px grid";
  }
  ngOnInit() {}
}
