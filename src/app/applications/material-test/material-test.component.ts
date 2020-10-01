import {
  Component,
  OnInit,
  Renderer2,
  ViewChild,
  ElementRef,
  AfterViewInit,
  TemplateRef,
  Inject,
} from "@angular/core";
import { MediaObserver } from "@angular/flex-layout";

import { DOCUMENT } from "@angular/common";
import { RxFormGroup, RxFormBuilder } from "@rxweb/reactive-form-validators";
import { MaterialColumn } from "src/app/shared/components/table-custom/table-types/MaterialColumn.interface";
import { TableOptions } from "src/app/shared/components/table-custom/table-types/TableOptions.interface";
import { PaginationPosition } from "src/app/shared/components/table-custom/table-types/PaginationPosition.interface";
import { MatTable } from "@angular/material/table";
import { HttpClient } from "@angular/common/http";
import { take } from "rxjs/operators";

@Component({
  selector: "app-material-test",
  templateUrl: "./material-test.component.html",
  styleUrls: ["./material-test.component.scss"],
  animations: [],
})
export class MaterialTestComponent implements OnInit, AfterViewInit {
  users: any = [];
  tableColumns: MaterialColumn[] = [
    {
      columnName: "userId",
      visible: true,
      columnWidth: "50px",
      stickyColumn: true,
    },
    {
      columnName: "id",
      visible: true,
      columnWidth: "100px",
      stickyColumn: false,
    },
    {
      columnName: "title",
      visible: true,
      columnWidth: "200px",
      stickyColumn: false,
    },
    {
      columnName: "body",
      visible: true,
      columnWidth: "200px",
      stickyColumn: false,
    },
  ];

  tableOptions: TableOptions = {
    notDataMessage: "no data in array",
    showExportButtons: true,
    exportFileName: "'ملف بيانات'",
    showPagination: true,
    // showDetailRow: false,
    paginationPageSize: [1, 3, 5, 7, 8, 9],
    pageSize: 10,
    showFooterRow: true,
    paginationPosition: PaginationPosition.CENTER,
    paginationStyle: {
      alignFlexSlef: "flex-end",
      bgColor: "#fdebd3",
      color: "#264e70",
    },
    haveActions: true,
    actionsButtonsMethods: {
      add: {
        actionButtonName: "Add",
        actionButtonMethod: function () {
          console.log("add emp works fine");
        },
      },
      edit: {
        actionButtonName: "Edit",
        actionButtonMethod: function () {
          console.log("edit emp button works fine");
        },
      },
      remove: {
        actionButtonName: "Remove",
        actionButtonMethod: function () {
          console.log("edit emp button works fine");
        },
      },
    },
    showFilter: true,
    tableStyle: { bgColor: "#fdebd3" },
    headerCellStyle: {
      bgColor: "#48CAE4",
      color: "#03045E",
      alignText: "center",
      fontSize: "20px",
    },
    rowsCellStyle: {
      bgColor: "#CAF0F8",
      color: "#7D8597",
      alignText: "center",
      fontSize: "16px",
    },
    footerStyle: {
      footerRow: { bgColor: "#7D8597" },
      footerCellStyle: {
        bgColor: "#7D8597",
        color: "#CAF0F8",
        fontSize: "18px",
      },
    },
  };

  empForm: RxFormGroup;
  @ViewChild("mytable") mytable: MatTable<any>;

  constructor(
    private media: MediaObserver,
    @Inject(DOCUMENT) private document: Document,
    @Inject("window") private window: Window,
    private fb: RxFormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.http
      .get("https://jsonplaceholder.typicode.com/posts", {
        observe: "body",
      })
      .subscribe((data) => {
        this.users = data;
      });
  }

  buildForm() {}

  ngAfterViewInit() {}
}
