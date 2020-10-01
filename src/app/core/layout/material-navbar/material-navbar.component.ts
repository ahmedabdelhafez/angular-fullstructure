import {
  Component,
  OnInit,
  AfterViewInit,
  Inject,
  Renderer2,
  ViewChild,
  ElementRef,
} from "@angular/core";
import * as $ from "jquery";
import { Router, ActivatedRoute } from "@angular/router";
import { Configuration, MultilevelNodes } from "ng-material-multilevel-menu";
import { TranslateService } from "@ngx-translate/core";
import { DOCUMENT } from "@angular/common";
import { DateAdapter } from "@angular/material/core";
import { TranslationService } from "../../translation.service";
import { ConfigAppService } from "src/app/services/ConfigApp.service";
import { TranslationKeys } from "../../model/enums/Translation-Keys.enum";

@Component({
  selector: "app-material-navbar",
  templateUrl: "./material-navbar.component.html",
  styleUrls: ["./material-navbar.component.scss"],
})
export class MaterialNavbarComponent implements OnInit, AfterViewInit {
  @ViewChild("mainNavbar", { static: true }) mainNavbar: ElementRef<
    HTMLElement
  >;
  menuStateEn = "hide";
  menuStateAr = "hide";
  config: Configuration;

  appRouterData: MultilevelNodes[] = [
    {
      label: "home",
      data: { name: "home" },
      onSelected: () => {
        this.router.navigate(["/"]);
        this.menuStateAr = "hide";
        this.menuStateEn = "hide";
      },
      faIcon: "fa fa-home",
      activeFaIcon: "fa fa-calculator",
      link: "/",
    },
    {
      label: "testprint",
      data: { name: "testprint" },
      icon: "alarm",
      link: "testprint",
      onSelected: () => {
        this.router.navigate(["/testprint"]);
        this.menuStateAr = "hide";
        this.menuStateEn = "hide";
      },
      navigationExtras: { relativeTo: this.activatedRoute },
    },
    {
      label: "teststyle",
      data: { name: "teststyle" },
      link: "/teststyle",
      icon: "offline_pin",
      activeIcon: "pan_tool",
      onSelected: () => {
        this.router.navigate(["/teststyle"]);
        this.menuStateAr = "hide";
        this.menuStateEn = "hide";
      },
      navigationExtras: { relativeTo: this.activatedRoute },
    },
    {
      label: "aboutus",
      data: { name: "aboutus" },
      link: "/aboutus",
      onSelected: () => {
        this.router.navigate(["/aboutus"]);
        this.menuStateAr = "hide";
        this.menuStateEn = "hide";
      },
      navigationExtras: {
        relativeTo: this.activatedRoute,
      },
      icon: "star_rate",
      hidden: false,
      items: [
        {
          label: "more about",
          icon: "home",
          activeIcon: "note",
          onSelected: () => {
            this.menuStateAr = "hide";
            this.menuStateEn = "hide";
          },
          data: { name: "moreabout" },
          items: [
            {
              label: "grid",
              icon: "grid",
              activeIcon: "note",
              data: { name: "grid" },
              onSelected: () => {
                this.menuStateAr = "hide";
                this.menuStateEn = "hide";
              },
            },
          ],
        },
      ],
    },
    {
      label: "fullmenu",
      data: { name: "fullmenu" },
      link: "/fullmenu",
      onSelected: () => {
        this.router.navigate(["/fullmenu"]);
        this.menuStateAr = "hide";
        this.menuStateEn = "hide";
      },
      navigationExtras: {
        relativeTo: this.activatedRoute,
      },
      icon: "star_rate",
      hidden: false,
    },
    {
      label: "slider",
      data: { name: "slider" },
      link: "/slider",
      onSelected: () => {
        this.router.navigate(["/slider"]);
        this.menuStateAr = "hide";
        this.menuStateEn = "hide";
      },
      navigationExtras: {
        relativeTo: this.activatedRoute,
      },
      icon: "star_rate",
      hidden: false,
    },
    {
      label: "observable",
      data: { name: "observable" },
      link: "/observable",
      onSelected: () => {
        this.router.navigate(["/observable"]);
        this.menuStateAr = "hide";
        this.menuStateEn = "hide";
      },
      navigationExtras: {
        relativeTo: this.activatedRoute,
      },
      icon: "star_rate",
      hidden: false,
    },
    {
      label: "grid",
      data: { name: "grid" },
      link: "/grid",
      icon: "offline_pin",
      onSelected: () => {
        this.router.navigate(["/grid"]);
        this.menuStateAr = "hide";
        this.menuStateEn = "hide";
      },
      navigationExtras: { relativeTo: this.activatedRoute },
    },
    {
      label: "users",
      data: { name: "users" },
      link: "/users",
      icon: "person",
      onSelected: () => {
        this.router.navigate(["/users"]);
        this.menuStateAr = "hide";
        this.menuStateEn = "hide";
      },
      navigationExtras: { relativeTo: this.activatedRoute },
    },
    {
      label: "materialtest",
      data: { name: "materialtest" },
      link: "/materialtest",
      icon: "offline_pin",
      onSelected: () => {
        this.router.navigate(["/materialtest"]);
        this.menuStateAr = "hide";
        this.menuStateEn = "hide";
      },
      navigationExtras: { relativeTo: this.activatedRoute },
    },
    {
      label: "Drag Drop",
      data: { name: "dragdrop" },
      link: "/teststyle",
      icon: "drag_indicator",
      activeIcon: "drag_indicator",
      onSelected: () => {
        this.router.navigate(["/dragdrop"]);
        this.menuStateAr = "hide";
        this.menuStateEn = "hide";
      },
      navigationExtras: { relativeTo: this.activatedRoute },
    },
  ];

  // Get Language On App Startup To Change The Full App Direction
  /** variable the stroe value after get ir from
   *  default language from local storage on app start up */
  defaultLang =
    localStorage.getItem(TranslationKeys.TRANSLATION_KEY) !== null
      ? localStorage.getItem(TranslationKeys.TRANSLATION_KEY).toString()
      : "en";
  menuChangLang: string =
    localStorage.getItem("app-lang") !== null
      ? localStorage.getItem("app-lang").toString()
      : "en";

  constructor(
    private translate: TranslateService,
    @Inject(DOCUMENT) private document: Document,
    private dateAdapter: DateAdapter<Date>,
    private translation: TranslationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translationService: TranslationService
  ) {}

  ngOnInit() {
    this.config = {
      classname: "myclass",
      rtlLayout: false,
      selectedListFontColor: "green",
    };
    this.getTranslateRecursive(this.appRouterData);
    this.translate.setDefaultLang(this.defaultLang);
    this.translate.use(this.defaultLang);

    this.changeLangAndStyle(this.defaultLang);

    // change menu language
    this.translate.onLangChange.subscribe((data) => {
      this.menuChangLang = data["lang"];
      if (data["lang"] === "ar") {
        this.menuStateEn === "show"
          ? (this.menuStateEn = "hide")
          : (this.menuStateEn = "hide");
      } else if (data["lang"] === "en") {
        this.menuStateAr === "show"
          ? (this.menuStateAr = "hide")
          : (this.menuStateAr = "hide");
      }
    });
    /////////
  }
  ngAfterViewInit() {}

  showSideMenu(): void {
    // console.log("default lang: " + this.menuChangLang);

    if (this.menuChangLang === "en") {
      this.menuStateEn = "show";
    }

    if (this.menuChangLang === "ar") {
      this.menuStateAr = "show";
    }
  }

  hideSideMenu(): void {
    // console.log("default lang in hide: " + this.menuChangLang);
    if (this.menuChangLang === "en") {
      this.menuStateEn = "hide";
    }

    if (this.menuChangLang === "ar") {
      this.menuStateAr = "hide";
    }
  }

  // hideAfterSelectItem() {
  //   this.translate.onLangChange.subscribe((lang) => {
  //     if (lang["lang"] === "en") {
  //       this.render.listen(this.menuItem.nativeElement, "click", (e) => {
  //         setTimeout(() => {
  //           this.menuStateEn = "hide";
  //         }, 500);
  //       });
  //     }
  //     if (lang["lang"] === "ar") {
  //       this.render.listen(this.menuItem.nativeElement, "click", (e) => {
  //         setTimeout(() => {
  //           this.menuStateEn = "hide";
  //         }, 500);
  //       });
  //     }
  //   });
  // }

  changeLangAndStyle(lang?: string) {
    // Add the selected language to the Local Storage
    localStorage.setItem(TranslationKeys.TRANSLATION_KEY, lang);
    // localStorage.setItem("app-lang", lang);
    // this.translate.setDefaultLang(lang);
    // this.translate.use(lang);
    ////////////////////////////////////
    ///// << Change the direction of the page >> /////
    if (lang === "ar") {
      this.config = {
        rtlLayout: true,
        highlightOnSelect: false,
      };
      // this.getTranslateRecursive(this.appitems);
      this.translationService.setAppDefaultLang(lang);
      this.dateAdapter.setLocale(lang);
      this.translate.setDefaultLang(lang);
      this.translate.use(lang);
      // this.document.getElementById("theme").setAttribute("href", "assets/bootstrap-rtl/bootstrap-rtl.min.css");
      // this line to change the dire of the index page
      // this.document.getElementById("htmlParent").setAttribute("dir", "rtl");
      // this line to change the language
      // this.document.getElementById("htmlParent").setAttribute("lang", "ar");
    } else {
      this.config = {
        rtlLayout: false,
        highlightOnSelect: false,
      };
      // this.getTranslateRecursive(this.appitems);
      this.translation.setAppDefaultLang(lang);
      this.translate.setDefaultLang(lang);
      this.translate.use(lang);
      this.dateAdapter.setLocale(lang);
      // this.document.getElementById("theme").setAttribute("href","assets/bootstrap/css/bootstrap.min.css");
      // this.document.getElementById("theme").setAttribute("href", "");
      // this line to change the dire of the [index page]
      // this.document.getElementById("htmlParent").setAttribute("dir", "ltr");
      // this line to change the language
      // this.document.getElementById("htmlParent").setAttribute("lang", "en-US");
    }
  }

  getTranslateRecursive(itemObj: MultilevelNodes[]) {
    itemObj.map(async (ele) => {
      let routerLinkObject = new Object(ele);
      if (routerLinkObject.hasOwnProperty("items") && ele.items.length > 0) {
        // << translate the current link >> //
        this.translate.onLangChange.subscribe((lang) => {
          if (lang["lang"] === "ar") {
            ele.label = lang["translations"]["navbar"][ele.data["name"]];
          } else {
            ele.label = lang["translations"]["navbar"][ele.data["name"]];
          }
        });
        // << if there are any nested array of items recall the function >> //
        this.getTranslateRecursive(ele.items);
      } else {
        this.translate.onLangChange.subscribe((lang) => {
          if (lang["lang"] === "ar") {
            ele.label = lang["translations"]["navbar"][ele.data["name"]];
          } else {
            ele.label = lang["translations"]["navbar"][ele.data["name"]];
          }
        });
      }
    });
  }

  onSelectedItem(event) {
    this.menuStateAr = "hide";

    this.menuStateEn = "hide";
  }
}
