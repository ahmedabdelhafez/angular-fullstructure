import { DOCUMENT } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { PageScrollService } from "ngx-page-scroll-core";

@Component({
  selector: "app-add",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.scss"],
})
export class AddComponent implements OnInit {
  constructor(
    private pageScrollService: PageScrollService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    this.pageScrollService.scroll({
      document: this.document,
      scrollTarget: "#h2Item",
      duration: 500,
    });
  }
}
