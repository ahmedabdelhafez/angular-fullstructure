import {
  Component,
  OnInit,
  Input,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTable } from "@angular/material/table";
import { MaterialColumn } from "./table-types/MaterialColumn.interface";
import { TableOptions } from "./table-types/TableOptions.interface";

@Component({
  selector: "app-table-custom",
  templateUrl: "./table-custom.component.html",
  styleUrls: ["./table-custom.component.scss"],
})
export class TableCustomComponent
  implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input("dataSource") dataSource: any;
  @Input("tableColumns") tableColumns: MaterialColumn[];
  @Input("tableOptions") tableOptions: TableOptions;
  columns: string[] = [];
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.columns = this.tableColumns.map((ele) => ele.columnName);
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    throw new Error("Method not implemented.");
  }
  ngOnDestroy(): void {
    throw new Error("Method not implemented.");
  }
}
