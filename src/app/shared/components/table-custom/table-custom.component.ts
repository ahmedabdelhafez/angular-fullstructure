import {
  Component,
  OnInit,
  Input,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from "@angular/core";
import { MatPaginator, MatSort } from "@angular/material";

@Component({
  selector: "app-table-custom",
  templateUrl: "./table-custom.component.html",
  styleUrls: ["./table-custom.component.scss"],
})
export class TableCustomComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input("dataSource") dataSource: any;
  @Input("tableColumns") tableColumns: string[];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  
  constructor() {}

  ngOnInit() {}
  ngAfterViewInit(): void {
    throw new Error("Method not implemented.");
  }
  ngOnDestroy(): void {
    throw new Error("Method not implemented.");
  }
}
