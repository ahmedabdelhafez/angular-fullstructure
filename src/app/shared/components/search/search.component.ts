import { Component, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { distinctUntilChanged, debounceTime, switchMap } from "rxjs/operators";
import { HttpCall } from "src/app/services/HttpCall.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements OnInit {
  searchText: string = "";
  valEvent = "";
  alldata = [];

  userId;
  userName;

  searchTextChanged: Subject<string> = new Subject<string>();
  constructor(
    private httpData: HttpCall,
    private activeRouter: ActivatedRoute
  ) {}

  ngOnInit() {
    this.searchFrombackend();
  }

  searchFrombackend() {
    this.searchTextChanged
      .pipe(
        debounceTime(1500),
        distinctUntilChanged(),
        // start searching and change the  value
        switchMap(() => this.httpData.getAll<any>("/posts" as string))
      )
      .subscribe((data: []) => {
        console.log("show data after 1.5 second");
        if (!this.valEvent) {
          this.alldata = [];
        } else {
          this.alldata = [];
          this.alldata = data.filter((ele: any) => {
            return ele.title.includes(this.valEvent);
          });
        }
      });
  }

  clearSearchResault() {
    this.alldata.length = 0;
    this.searchText = null;
  }

  logSearchData(event) {
    // console.log(event);
    this.valEvent = event;
    this.searchTextChanged.next(event);
  }

  modelChangeVal() {
    if (this.userId) console.log(this.userId);
    if (this.userName) console.log(this.userName);
  }
}
