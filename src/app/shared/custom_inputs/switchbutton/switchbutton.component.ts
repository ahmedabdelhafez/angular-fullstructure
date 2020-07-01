import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-switchbutton",
  templateUrl: "./switchbutton.component.html",
  styleUrls: ["./switchbutton.component.scss"]
})
export class SwitchbuttonComponent implements OnInit {
  @Input("switchId") switchId: string;
  @Input("switchName") switchName: string;
  @Output("changedData") changedData = new EventEmitter<Boolean>();
  itemVal: boolean = true;
  constructor() {}

  ngOnInit() {}

  onValueChange() {
    this.changedData.emit(this.itemVal);
  }
}
