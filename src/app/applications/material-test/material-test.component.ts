import {
  Component,
  OnInit,
  Renderer2,
  ViewChild,
  ElementRef,
  AfterViewInit,
  TemplateRef,
  Inject,
  ViewEncapsulation,
} from "@angular/core";
import { MediaObserver } from "@angular/flex-layout";

import { DOCUMENT } from "@angular/common";
import { RxFormGroup, RxFormBuilder } from "@rxweb/reactive-form-validators";
import { MaterialColumn } from "src/app/shared/components/table-custom/table-types/MaterialColumn.interface";
import { TableOptions } from "src/app/shared/components/table-custom/table-types/TableOptions.interface";
import { PaginationPosition } from "src/app/shared/components/table-custom/table-types/PaginationPosition.interface";

import { PostService } from "src/app/services/post.service";
import { DataSource } from "@angular/cdk/table";

@Component({
  selector: "app-material-test",
  templateUrl: "./material-test.component.html",
  styleUrls: ["./material-test.component.scss"],
  encapsulation: ViewEncapsulation.None,
  animations: [],
})
export class MaterialTestComponent implements OnInit {
  postData: any = [];
  constructor(private postService: PostService) {}

  tableOptions: TableOptions = {
    notDataMessage: "No Posts here",
    haveActions: false,
    paginationPageSize: [1, 3, 5, 10, 15, 20],
    exportFileName: "exported-data",
    pageSize: 10,
    paginationPosition: PaginationPosition.CENTER,
    showFooterRow: false,
    showExportButtons: true,
    showPagination: true,
  };

  tableColumn: MaterialColumn[] = [
    { columnName: "id", visible: true },
    { columnName: "userId", visible: true },
    { columnName: "title", visible: true },
    { columnName: "body", visible: false },
    { columnName: "Actions", visible: false },
  ];

  ngOnInit() {
    this.postService.getAllPosts().subscribe(
      (data) => {
        this.postData = data;
      },
      (err) => {
        console.log("an error here");
      }
    );
  }
}
