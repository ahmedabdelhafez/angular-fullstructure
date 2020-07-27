import {
  Component,
  OnInit,
  OnDestroy,
  Renderer2,
  ViewChild,
  ElementRef,
  AfterViewInit,
  AfterContentInit,
} from "@angular/core";
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

declare var $: any;
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
export class AppComponent
  implements OnInit, AfterViewInit, AfterContentInit, OnDestroy {
  public subscriptions: Subscription[] = [];
  windowScroll$ = fromEvent(window, "scroll");
  constructor(
    private translate: TranslateService,
    private dateAdapter: DateAdapter<Date>,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private connectionService: ConnectionService,
    private render: Renderer2
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
  scrollStatus = false;
  @ViewChild("scrollEle", { static: false }) scrollEle: ElementRef;
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
        AppAlert.showToastSuccess(
          this.translate.instant("generalMessage.internetConnectionSuccess"),
          null,
          2000
        );
      } else {
        AppAlert.showToastError(
          this.translate.instant("generalMessage.internetConnectionError"),
          null,
          2000
        );
      }
    });
    ///////////////////////////
    // this.windowScroll$.subscribe((data) => {
    //   // console.log("page y : " + window.pageYOffset);
    //   // console.log(data);
    // });
  }

  ngAfterViewInit(): void {}

  ngAfterContentInit(): void {
    this.windowScroll$.subscribe((data) => {
      if (data.target["scrollingElement"]["scrollTop"] > 200) {
        this.scrollStatus = true;
        this.render.addClass(this.scrollEle.nativeElement, "show-smooth");
      } else {
        this.scrollStatus = false;
        this.render.removeClass(this.scrollEle.nativeElement, "show-smooth");
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

  scrollTop() {
    let pos = window.pageYOffset;
    if (pos > 0) {
      window.scrollTo({ behavior: "smooth", left: 0, top: 0 }); // how far to scroll on each step
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
  }
}
