import { Component, OnInit, Input, TemplateRef } from "@angular/core";

@Component({
  selector: "app-header-section",
  templateUrl: "./header-section.component.html",
  styleUrls: ["./header-section.component.scss"],
})
export class HeaderSectionComponent implements OnInit {
  @Input("viewTemplate") viewTemplate: TemplateRef<any>;
  constructor() {}

  ngOnInit() {}
}
