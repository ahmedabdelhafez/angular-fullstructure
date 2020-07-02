import { Component, OnInit, ViewEncapsulation, OnDestroy } from "@angular/core";
import Swal from "sweetalert2";
import * as _moment from "moment";
import { AppAlert } from "./shared/util/AppAlert";
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
} from "@angular/material-moment-adapter";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from "@angular/material/core";
import { TranslateService } from "@ngx-translate/core";
import {
  ActivatedRoute,
  Router,
  NavigationEnd,
  RoutesRecognized,
} from "@angular/router";
import { Title } from "@angular/platform-browser";
import { filter, map } from "rxjs/operators";
import { fromEvent, Subscription } from "rxjs";
import { ConnectionService } from "ng-connection-service";
import { NgxSpinner } from "ngx-spinner/lib/ngx-spinner.enum";
import { NgxSpinnerService } from "ngx-spinner";

export const MY_FORMATS = {
  parse: {
    dateInput: "DD/MM/YYYY",
  },
  display: {
    dateInput: "DD/MM/YYYY",
    monthYearLabel: "MM YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "MM YYYY",
  },
};

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  // encapsulation: ViewEncapsulation.None,
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    { provide: MAT_DATE_LOCALE, useValue: "ar", multi: true },

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    //format: MAT_MOMENT_DATE_FORMATS
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class AppComponent implements OnInit, OnDestroy {
  isChecked: boolean;
  dateValue: any;
  dataTranslate: any;

  public subscriptions: Subscription[] = [];

  constructor(
    private translate: TranslateService,
    private dateAdapter: DateAdapter<Date>,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private connectionService: ConnectionService,
    private sppiner: NgxSpinnerService
  ) {
    // this language will be used as a fallback when a translation isn't found in the current language
    // this.translate.setDefaultLang('ar');
    // // the lang to use, if the lang isn't available, it will use the current loader to get them
    // this.translate.use('ar');
    ///change the language for material date picker
    this.translate.onDefaultLangChange.subscribe((data) => {
      // console.log(data);
      console.log("angular datepicker langugae changed");
      this.dateAdapter.setLocale(data.lang);
    });
  }

  dateClass = (d: Date) => {
    const date = d.getDate();
    // Highlight the 1st and 20th day of each month.
    return date === 1 || date === 20 ? "example-custom-date-class" : undefined;
  };

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof RoutesRecognized),
        map((event: RoutesRecognized) => {
          return event.state.root.firstChild.data;
        })
      )
      .subscribe((customData) => {
        console.log(customData);
      });

    /////////// << spinner animation >> //////////////
    // this.sppiner.show();
    // setTimeout(() => {
    //   this.sppiner.hide();
    // }, 500);

    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        ),
        map(() => {
          let route = this.activatedRoute;
          // find first route with a title set (if any)
          while (!this.getTitle(route) && route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter((route) => route.outlet === "primary"),
        map((route) => this.getTitle(route)),
        filter((title): title is string => title !== undefined)
      )
      .subscribe((title) => {
        this.titleService.setTitle(title);
      });

    ///////////////////////////////
    this.connectionService.monitor().subscribe((state) => {
      if (state) {
        AppAlert.showToastSuccess("you are connection to internet", null, 2000);
      } else {
        AppAlert.showToastError(
          "check your internet connection please",
          null,
          2000
        );
      }
    });
  }

  private getTitle(route: ActivatedRoute): string | undefined {
    const routeData = route.snapshot.data;
    if (routeData && routeData.title) {
      return routeData.title;
    }
    return undefined;
  }
  config = {
    paddingAtStart: false,
    classname: "",
    listBackgroundColor: "rgb(208, 241, 239)",
    fontColor: "rgb(8, 54, 71)",
    // backgroundColor: 'orange',
    selectedListFontColor: "salmon",
  };

  selectedItem(event) {
    console.log(event.target.value);
  }

  customDateClass = (d: Date) => {
    const date = d.getDate();

    // Highlight the 1st and 20th day of each month.
    return date === 1 || date === 20 ? "bg-danger" : undefined;
  };

  scrollTop() {
    // let scrollToTop = window.setInterval(() => {
    //   let pos = window.pageYOffset;
    //   if (pos > 0) {
    //     window.scrollTo(0, pos - 20); // how far to scroll on each step
    //   } else {
    //     window.clearInterval(scrollToTop);
    //   }
    // }, 16);
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo({ behavior: "smooth", left: 0, top: pos - 10 }); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 1);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
  }
}
