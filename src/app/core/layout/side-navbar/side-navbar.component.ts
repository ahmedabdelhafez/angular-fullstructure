import {
  Component,
  OnInit,
  Inject,
  Renderer2,
  ViewChild,
  ElementRef,
  AfterViewInit,
  TemplateRef,
} from "@angular/core";
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from "@angular/animations";
import { TranslateService } from "@ngx-translate/core";
import { DOCUMENT, Location } from "@angular/common";
import { TranslationService } from "../../translation.service";
import { ConfigAppService } from "../../../services/ConfigApp.service";
import { fromEvent, timer } from "rxjs";
import { Configuration, MultilevelNodes } from "ng-material-multilevel-menu";
import { Router, ActivatedRoute } from "@angular/router";
import { DateAdapter } from "@angular/material/core";
@Component({
  selector: "app-side-navbar",
  templateUrl: "./side-navbar.component.html",
  styleUrls: ["./side-navbar.component.scss"],
  animations: [
    trigger("showhideEn", [
      state("show", style({ marginLeft: "0px", opacity: "1" })),
      state("hide", style({ marginLeft: "-275px", opacity: "0" })),
      transition("show => hide", animate("0.4s 30ms ease-out")),
      transition("hide => show", animate("0.4s 15ms ease-in-out")),
    ]),
    trigger("showhideAr", [
      state("show", style({ marginRight: "0px", opacity: "1" })),
      state("hide", style({ marginRight: "-275px", opacity: "0" })),
      transition("show => hide", animate("0.4s 40ms ease-out")),
      transition("hide => show", animate("0.4s 10ms ease-in-out")),
    ]),
  ],
})
export class SideNavbarComponent implements OnInit, AfterViewInit {
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
      label: "sliders",
      data: { name: "sliders" },
      link: "/sliders",
      icon: "offline_pin",
      onSelected: () => {
        this.router.navigate(["/sliders"]);
        this.menuStateAr = "hide";
        this.menuStateEn = "hide";
      },
      navigationExtras: { relativeTo: this.activatedRoute },
    },
  ];
  appConfig: any;
  windowSize$ = fromEvent(window, "scroll");

  // Get Language On App Startup To Change The Full App Direction
  defaultLang =
    localStorage.getItem("app-lang") !== null
      ? localStorage.getItem("app-lang").toString()
      : "en";
  menuChangLang: string =
    localStorage.getItem("app-lang") !== null
      ? localStorage.getItem("app-lang").toString()
      : "en";
  @ViewChild("menuItem", { static: true }) menuItem: ElementRef<any>;
  @ViewChild("nestedMenuItem", { static: true }) nestedMenuItem: ElementRef<
    HTMLElement
  >;

  timer$ = timer(1000);
  constructor(
    private translate: TranslateService,
    @Inject(DOCUMENT) private document: Document,
    private dateAdapter: DateAdapter<Date>,
    private translation: TranslationService,
    private configAppService: ConfigAppService,
    private render: Renderer2,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  defaultTheme;

  ngOnInit() {
    this.config = {
      classname: "myclass",
      rtlLayout: false,
      fontColor: "rgb(255, 165, 0)",
      backgroundColor: "rgb(0, 128, 0)",
      selectedListFontColor:'oranged'
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
    this.defaultTheme = this.materialTheme[0].name;
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

  hideAfterSelectItem() {
    this.translate.onLangChange.subscribe((lang) => {
      if (lang["lang"] === "en") {
        this.render.listen(this.menuItem.nativeElement, "click", (e) => {
          setTimeout(() => {
            this.menuStateEn = "hide";
          }, 500);
        });
      }
      if (lang["lang"] === "ar") {
        this.render.listen(this.menuItem.nativeElement, "click", (e) => {
          setTimeout(() => {
            this.menuStateEn = "hide";
          }, 500);
        });
      }
    });
  }
  materialTheme = [
    { name: "purble", path: "assets/scss/themes/purple-green.css" },
    { name: "pink", path: "assets/scss/themes/pink-bluegrey.css" },
    { name: "indego", path: "assets/scss/themes/indigo-pink.css" },
  ];

  changeLangAndStyle(lang?: string) {
    // Add the selected language to the Local Storage
    localStorage.setItem("app-lang", lang);
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);
    ////////////////////////////////////
    ///// << Change the direction of the page >> /////
    if (lang === "ar") {
      this.config = {
        rtlLayout: true,
        highlightOnSelect: false,
      };
      // this.getTranslateRecursive(this.appitems);
      this.translation.setAppDefaultLang(lang);
      this.dateAdapter.setLocale("ar");
      this.translate.setDefaultLang(lang);
      this.translate.use(lang);
      // this.document.getElementById("theme").setAttribute("href", "assets/bootstrap-rtl/bootstrap-rtl.min.css");
      // this line to change the dire of the index page
      this.document.getElementById("htmlParent").setAttribute("dir", "rtl");
      // this line to change the language
      this.document.getElementById("htmlParent").setAttribute("lang", "ar");
    } else {
      this.config = {
        rtlLayout: false,
        highlightOnSelect: false,
      };
      // this.getTranslateRecursive(this.appitems);
      this.translation.setAppDefaultLang(lang);
      this.translate.setDefaultLang(lang);
      this.translate.use(lang);
      this.dateAdapter.setLocale("en");
      // this.document.getElementById("theme").setAttribute("href","assets/bootstrap/css/bootstrap.min.css");
      this.document.getElementById("theme").setAttribute("href", "");
      // this line to change the dire of the [index page]
      this.document.getElementById("htmlParent").setAttribute("dir", "ltr");
      // this line to change the language
      this.document.getElementById("htmlParent").setAttribute("lang", "en-US");
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
