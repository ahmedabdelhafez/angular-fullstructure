import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  Inject,
} from "@angular/core";
import * as _moment from "moment";
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import {
  MAT_DATE_LOCALE,
  DateAdapter,
  MAT_DATE_FORMATS,
} from "@angular/material/core";
import { TranslateService } from "@ngx-translate/core";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { Title, Meta } from "@angular/platform-browser";
import { filter, map } from "rxjs/operators";
import { fromEvent, Subscription } from "rxjs";
import { DOCUMENT } from "@angular/common";
import { TranslationService } from "./core/translation.service";
import { ConsoleService } from "./shared/util/ConsoleService";
import { TranslationKeys } from "./core/model/enums/Translation-Keys.enum";
import { ReactiveFormConfig } from "@rxweb/reactive-form-validators";

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
  @ViewChild("scrollEle") scrollEle: ElementRef;
  windowScroll$ = fromEvent(window, "scroll");
  scrollStatus = false;

  /** variable the stroe value after get ir from
   *  default language from local storage on app start up */
  defaultLang =
    localStorage.getItem(TranslationKeys.TRANSLATION_KEY) !== null
      ? localStorage.getItem(TranslationKeys.TRANSLATION_KEY).toString()
      : "en";

  constructor(
    private translate: TranslateService,
    private dateAdapter: DateAdapter<Date>,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private metaService: Meta,
    private translationService: TranslationService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    // // the lang to use, if the lang isn't available, it will use the current loader to get them
    // this.translate.use(this.defaultLang);
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang(this.defaultLang);
    this.changeLanguage(this.defaultLang);

    ///change the language for material date picker
    this.translate.onDefaultLangChange.subscribe((data) => {
      // << change language on default language change >> //
      this.changeLanguage(data["lang"]);
      this.dateAdapter.setLocale(data.lang);
    });

    /**
     * @description add title to page title dynamically be getting it
     * from router data of the activated component
     */
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
  }

  /**
   * @description change font when app start up or language change
   */
  // changeFontOnLanguageChange(lang: string) {
  //   if (lang === 'ar') {
  //     // << change font when language arabic to be 'Cairo' >> //
  //     this.document.getElementById('appRootBody').style.fontFamily =
  //       'Cairo, sans-serif';
  //     ConsoleService.warning(
  //       'language change from app compo compnent To > Cairo'
  //     );
  //   } else {
  //     // << change font when language arabic to be 'Roboto' >> //
  //     this.document.getElementById('appRootBody').style.fontFamily =
  //       'Roboto, sans-serif ';
  //     ConsoleService.warning(
  //       'language change from app compo compnent To > Roboto'
  //     );
  //   }
  // }

  /** @description this method is used to toggle between languages
   *
   */
  changeLanguage(lang?: string) {
    // Add the selected language to the Local Storage
    localStorage.setItem(TranslationKeys.TRANSLATION_KEY, lang);
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);
    ////////////////////////////////////

    if (lang === "ar") {
      this.translate.setDefaultLang(lang);
      this.translate.use(lang);
      this.translationService.setAppDefaultLang(lang);
      this.dateAdapter.setLocale("ar");
      // this line to change the dire of the index page
      this.document.getElementById("htmlParent").setAttribute("dir", "rtl");
      // this line to change the language
      this.document.getElementById("htmlParent").setAttribute("lang", "ar");
      this.document
        .getElementById("theme")
        .setAttribute("href", "assets/bootstrap-rtl/bootstrap-rtl.min.css");

      // change font to be cairo
      // this.changeFontOnLanguageChange(lang);
    } else {
      this.translate.setDefaultLang(lang);
      this.translate.use(lang);
      this.translationService.setAppDefaultLang(lang);
      this.dateAdapter.setLocale("en");
      this.document
        .getElementById("theme")
        .setAttribute("href", "assets/bootstrap/css/bootstrap.min.css");
      // this.document.getElementById('theme').setAttribute('href', '');
      // this line to change the dire of the [index page]
      this.document.getElementById("htmlParent").setAttribute("dir", "ltr");
      // this line to change the language
      this.document.getElementById("htmlParent").setAttribute("lang", "en-US");
    }
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
