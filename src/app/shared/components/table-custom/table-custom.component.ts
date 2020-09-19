import {
  Component,
  OnInit,
  Input,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
  Inject,
} from "@angular/core";
import { MatPaginator, MatPaginatorIntl } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { MaterialColumn } from "./table-types/MaterialColumn.interface";
import { TableOptions } from "./table-types/TableOptions.interface";
import { DataSource } from "@angular/cdk/table";
import { DOCUMENT } from "@angular/common";
@Component({
  selector: "app-table-custom",
  templateUrl: "./table-custom.component.html",
  styleUrls: ["./table-custom.component.scss"],
  providers: [{ provide: MatPaginatorIntl, useClass: TableCustomComponent }],
})
export class TableCustomComponent extends MatPaginatorIntl
  implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  /** data source that have array of records to fill the table */
  @Input("tableDataSource") tableDataSource;
  itemsCount: number = 0;
  /** current page index in the material table */
  currentPageIndex: number = 0;
  numberOfPage: number = 0;
  initPageSize = 5;
  dataSource: DataSource<any>;
  /** array of table columns with options for every column
   * type of variable must be `MaterialColumn` array
   */
  @Input("tableColumns") tableColumns: MaterialColumn[];
  /**
   * additional options for material table to apply to it
   * type must be of `Tableptions` Object
   */
  @Input("tableOptions") tableOptions: TableOptions;
  /** table columns to fill the headers and fetch row items with column
   *  name from data source */
  @Input('fileName') fileName: string = "work-file";
  columns: string[] = [];

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("exporter") exporterElement;

  constructor(@Inject(DOCUMENT) private document: Document) {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    /** thid column will added if the table options object have the flag `haveActions` */
    let actionColumn = "actions";
    /** extract visible column from array */
    this.columns = this.tableColumns
      .filter((column) => {
        if (column.visible) {
          return column;
        }
      })
      .map((ele) => ele.columnName);
    if (this.tableOptions.haveActions) {
      this.columns.push(actionColumn);
    }
    this.dataSource = new MatTableDataSource<any>(this.tableDataSource);
    this.dataSource["paginator"] = this.paginator;
    this.dataSource["sort"] = this.sort;
    console.log(this.columns);
    this.itemsCount = this.tableDataSource.length;
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    /////////////
    if (this.tableOptions.showPagination) {
      this.paginator._intl.itemsPerPageLabel = "how many item in page";
      this.paginator._intl.lastPageLabel = "Last Man";
      this.paginator._intl.firstPageLabel = "First Man";
      this.paginator._intl.nextPageLabel = "Next Page";
      this.paginator._intl.previousPageLabel = "Prev Page";
    }
  }

  ngOnDestroy(): void {}
}
