import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from "@angular/core";
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from "@angular/animations";

import { TranslateService } from "@ngx-translate/core";
import { TranslationService } from "src/app/core/translation.service";
import { of, merge } from "rxjs";
import {
  delay,
  finalize,
  debounceTime,
  distinctUntilChanged,
  tap,
} from "rxjs/operators";
import { ConsoleService } from "src/app/shared/util/ConsoleService";
import {
  AbstractControl,
  FormGroup,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { HttpCall } from "src/app/services/HttpCall.service";
import { CityDataSource } from "./datasource/CityDataSource";
import { CityService } from "../../services/datasource_service/City.service";
import { MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

export interface PeriodicElement {
  name: string;
  empId: number;
  salary: number;
  symbol: string;
  image: string;
}

@Component({
  selector: "app-teststyle",
  templateUrl: "./teststyle.component.html",
  styleUrls: ["./teststyle.component.scss"],
  animations: [
    trigger("fadeIn", [
      // state('in', style({
      //   'opacity': '1'
      // })),
      transition("void => *", [
        style({
          transform: "translateX(100%)",
          opacity: 1,
        }),
        animate("1.25s ease-in-out"),
      ]),
      // << end state 1 >> //
      transition("* => void", [
        animate(
          "700ms ease-out",
          style({
            transform: "skewX(-25deg) translateX(50%)",
            color: "red",
            opacity: 0,
          })
        ),
      ]),
      // << end state 2 >> //
    ]),
  ],
})
export class TeststyleComponent implements OnInit, AfterViewInit {
  @ViewChild("table", { static: true }) table: MatTable<any>;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  st1: boolean = false;

  displayedColumns: string[] = ["cityId", "cityName", "countryName"];
  dataSource: CityDataSource;
  searchText: string = "";
  isLoading: boolean = false;
  constructor(
    private translate: TranslateService,
    private tsData: TranslationService,
    private fb: FormBuilder,
    private http: HttpCall,
    private cityService: CityService
  ) {}

  myform: FormGroup;
  sortObject: any;
  ngOnInit() {
    // this.isLoading = true;
    // set default page size to 10 rows only
    this.paginator.pageSize = 10;
    this.dataSource = new CityDataSource(this.cityService);
    this.dataSource.getCityData(
      this.paginator.pageIndex,
      this.paginator.pageSize,
      "cityId",
      "desc"
    );
  }

  ngAfterViewInit() {
    this.dataSource.counter$.subscribe((data) => {
      // set number of total city records in database
      this.paginator.length = data;
    });
    this.sort.sortChange.subscribe((data) => {
      // <<reset paginator after sorting>> //
      this.paginator.pageIndex = 0;
      this.sortObject = data;
      console.log(data);
    });

    // merge sort with paginator
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap((ele) => {
          console.log("from tab"),
            console.log(ele),
            this.dataSource.getCityData(
              this.paginator.pageIndex,
              this.paginator.pageSize,
              ele["active"],
              ele["direction"]
            );
        })
      )
      .subscribe();

    // load data after pagination change
    // this.paginator.page
    //   .pipe(
    //     tap(() =>
    //       this.dataSource.getCityData(
    //         this.paginator.pageIndex,
    //         this.paginator.pageSize
    //       )
    //     )
    //   )
    //   .subscribe();
  }

  getCurrentValue(row) {
    console.log("current row value");
    console.log(row);
  }

  remove(row, idx?) {
    console.log("delete item number: " + idx);
    // this.dataSource.splice(idx, 1);
  }

  doFilter(event) {
    console.log(event);
  }

  checkSalary(row) {
    return row.salary > 1000 && row.salary <= 12000 ? true : false;
  }

  async checkName(control: AbstractControl) {
    let name = control.value as string;
    console.log("userid  value: " + name);

    return await new Promise((res, rej) => {
      setTimeout(() => {
        this.http
          .getOne<any>(`posts`, name)
          .pipe(distinctUntilChanged())
          .toPromise()
          .then((data) => {
            console.log(data);
            if (data) {
              res({ isfound: true });
            }
          })
          .catch((err) => {
            res(null);
          });
      }, 1500);
    });
  }
}
