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

@Component({
  selector: "app-material-test",
  templateUrl: "./material-test.component.html",
  styleUrls: ["./material-test.component.scss"],
  animations: [],
})
export class MaterialTestComponent implements OnInit, AfterViewInit {
  users = [
    { name: "ahmed", age: 24, salary: 25000 },
    { name: "medo", age: 26, salary: 20000 },
    { name: "koko", age: 20, salary: 18000 },
    { name: "fofo", age: 21, salary: 30000 },
    { name: "mohamed", age: 20, salary: 15000 },
    { name: "ahmed", age: 22, salary: 22000 },
    { name: "ali", age: 24, salary: 40000 },
    { name: "hassan", age: 25, salary: 15000 },
    { name: "zoz", age: 25, salary: 21000 },
    { name: "toto", age: 28, salary: 33000 },
    { name: "ziko", age: 29, salary: 22000 },
  ];

  tableColumns: MaterialColumn[] = [
    { columnName: "name", visible: true },
    { columnName: "age", visible: true },
    { columnName: "salary", visible: true },
  ];

  tableOptions: TableOptions = {
    notDataMessage: "no data in array",
    showPagination: true,
    showDetailRow: false,
    paginationPageSize: [1, 3, 5, 7, 8, 9],
    pageSize: 7,
    paginationPosition: PaginationPosition.CENTER,
    paginationStyle: {
      alignFlexSlef: "flex-end",
      bgColor: "seagreen",
      color: "blanchedalmond",
    },
    haveActions: false,
    showFilter: true,
    tableStyle: { bgColor: "green" },
  };

  empForm: RxFormGroup;
  @ViewChild("mytable") mytable: MatTable<any>;

  constructor(
    private media: MediaObserver,
    @Inject(DOCUMENT) private document: Document,
    @Inject("window") private window: Window,
    private fb: RxFormBuilder
  ) {}

  ngOnInit() {}

  buildForm() {}

  ngAfterViewInit() {}
}
