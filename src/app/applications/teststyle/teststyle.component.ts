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
import {
  MatTable,
  MatSort,
  MatTableDataSource,
  MatPaginator,
} from "@angular/material";
import { TranslateService } from "@ngx-translate/core";
import { TranslationService } from "src/app/core/translation.service";
import { of } from "rxjs";
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
import html2canvas from "html2canvas";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

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

  displayedColumns: string[] = ["cityid", "cityname", "countryname"];
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
  ngOnInit() {
    // this.isLoading = true;
    this.paginator.pageSize = 10;
    this.dataSource = new CityDataSource(this.cityService);
    this.dataSource.getCityData(
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
  }

  ngAfterViewInit() {
    this.dataSource.counter$.subscribe((data) => {
      // set number of total city records in database
      this.paginator.length = data;
    });
    // load data after paging
    this.paginator.page
      .pipe(
        tap(() =>
          this.dataSource.getCityData(
            this.paginator.pageIndex,
            this.paginator.pageSize
          )
        )
      )
      .subscribe();
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

  getAllCity() {
    return this.cityService.getAlCity().subscribe((data) => {
      console.log("all city data");
      console.log(data);
    });
  }

  printPdf() {
    html2canvas(document.getElementById("mytable"), {
      useCORS: true,
      allowTaint: true,
      // width: 300,
      // height: 300,
    }).then(async (data) => {
      let doc = {
        content: [
          {
            image: await data.toDataURL(),
            width: 500,
            // absolutePosition: { x: 0, y: 0 },
          },
          { text: "how are you man", relativePosition: { x: 0, y: 20 } },
        ],
      };
      pdfMake.createPdf(doc).download("tablefile");
    });
  }
}
