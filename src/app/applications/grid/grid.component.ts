import {
  Component,
  OnInit,
  TemplateRef,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Renderer2,
} from "@angular/core";

import { PostService } from "../../services/post.service";
import { CityService } from "../../services/datasource_service/City.service";
import { Location } from "@angular/common";
import * as $ from "jquery";
import { DomSanitizer } from "@angular/platform-browser";
import { ImageUtil } from "src/app/shared/util/ImageUtil";
import { HttpClient } from "@angular/common/http";

import { ActivatedRoute } from "@angular/router";

import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "src/app/shared/components/dialog/dialog.component";
import { FormOperation } from "src/app/core/model/FormOperation.iterface";
import { FormGroup } from "@angular/forms";
import { City } from "src/app/core/model/CityDataSource.interface";

// declare var $: any;

@Component({
  selector: "app-grid",
  templateUrl: "./grid.component.html",
  styleUrls: ["./grid.component.scss"],
})
export class GridComponent implements OnInit, AfterViewInit {
  @ViewChild("rangeItem", { static: true }) rangeItem: ElementRef<
    HTMLInputElement
  >;
  cityData: City[] = [];
  page: number = 0;
  total: number = 0;
  itemPerPage: 5;

  

  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private render: Renderer2,
    private cityService: CityService,
    private location: Location,
    private sanitize: DomSanitizer,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  separateDialCode = true;

  imgBase: string[] = [];
  numberOfImages = 0;
  ngOnInit() {}

  ngAfterViewInit() {}

  getKeyCode(event) {
    console.log("key code after event");
    console.log(event);
  }

  async convertImageToBase64(event) {
    this.imgBase = await ImageUtil.convertImageToBase64(event);
    this.numberOfImages = this.imgBase.length;
  }

  showEvents(template: TemplateRef<any>) {
    this.dialog.open(DialogComponent, {
      minWidth: 500,
      width: "900px",
      height: "650px",
      data: { title: "Events Calendar", template: template },
    });
  }
}
