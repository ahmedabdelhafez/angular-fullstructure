import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Renderer2,
} from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { DOCUMENT } from "@angular/common";
import { DateAdapter } from "@angular/material";
import { PostService } from "src/app/services/post.service";
import { ConfigAppService } from "src/app/services/ConfigApp.service";
import { fromEvent } from "rxjs";
import { map } from "rxjs/operators";
import {
  trigger,
  style,
  state,
  transition,
  animate,
} from "@angular/animations";
import { TranslationService } from "../../translation.service";

declare var $: any;
@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
  animations: [
    trigger("showhide", [
      state("show", style({})),
      state("hide", style({})),
      transition("show => hide", animate("1s")),
      transition("hide => show", animate("1s")),
    ]),
  ],
})
export class NavbarComponent implements OnInit {
  @ViewChild("sideMenu", { static: true }) sideMenu: ElementRef<HTMLElement>;

  navRoles = false;
  sidenavState: string = "open";
  defaultLang =
    localStorage.getItem("lang") !== null
      ? localStorage.getItem("lang").toString()
      : "en";

  constructor(
    private translate: TranslateService,
    @Inject(DOCUMENT) private document,
    private dateAdapter: DateAdapter<Date>,
    private translation: TranslationService,
    private postService: PostService,
    private configAppService: ConfigAppService,
    private render: Renderer2
  ) {}
  appConfig: any;
  windowSize$ = fromEvent(window, "resize");
  @ViewChild("navbar", { static: true }) navbar: ElementRef<HTMLElement>;

  ngOnInit() {
    this.translate.setDefaultLang(this.defaultLang);
    this.translate.use(this.defaultLang);

    this.changeLang(this.defaultLang);
    ////////////////////////////////////////////////////////////////////////////
    this.configAppService
      .getConfig()
      .then((data) => {
        this.appConfig = data;
      })
      .catch((error) => {
        console.log(error);
      });

    /// << get the width of the screen >> //

    this.windowSize$
      .pipe(map((e) => e.target["innerWidth"]))
      .subscribe((data) => {
        if (data >= 600) {
          this.render.setStyle(this.sideMenu.nativeElement, "display", "flex");
          this.render.setStyle(
            this.sideMenu.nativeElement,
            "transition",
            "0.4s ease-in-out"
          );
        } else {
          this.render.setStyle(this.sideMenu.nativeElement, "display", "none");
        }
      });
  }

  changeLang(lang?: string) {
    // Add the selected language to the Local Storage
    localStorage.setItem("lang", lang);
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);
    ////////////////////////////////////
    ///// << Change the direction of the page >> /////
    if (lang === "ar") {
      this.translation.setAppDefaultLang(lang);
      this.dateAdapter.setLocale("ar");
      this.translate.setDefaultLang(lang);
      this.translate.use(lang);
      this.document
        .getElementById("theme")
        .setAttribute("href", "assets/bootstrap-rtl/bootstrap-rtl.min.css");
      // this line to change the dire of the index page
      this.document.getElementById("htmlParent").setAttribute("dir", "rtl");
      // this line to change the language
      this.document.getElementById("htmlParent").setAttribute("lang", "ar");
      console.log("Used lang ar: " + this.translate.getDefaultLang());
    } else {
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

  shoeHideSIdeMenu() {
    if (this.sideMenu.nativeElement.style.display === "flex") {
      console.log("mneu become flex and will open");

      this.render.setStyle(this.sideMenu.nativeElement, "display", "none");
      this.render.setStyle(
        this.sideMenu.nativeElement,
        "transition",
        "0.5s ease-in-out"
      );
    } else {
      console.log("menu will close now");

      this.render.setStyle(this.sideMenu.nativeElement, "display", "flex");
    }
  }

  openSidenav() {
    console.log("send open action");

    this.postService.toggleNav("open");
  }

  toggleMenu() {
    if (this.navbar.nativeElement.classList.contains("open")) {
      this.render.removeClass(this.navbar.nativeElement, "open");
    } else {
      this.render.addClass(this.navbar.nativeElement, "open");
    }
  /////////////
    if (this.sideMenu.nativeElement.style.display === "flex") {
      console.log("mneu become flex and will open");

      this.render.setStyle(this.sideMenu.nativeElement, "display", "none");
      this.render.setStyle(
        this.sideMenu.nativeElement,
        "transition",
        "0.5s ease-in-out"
      );
    } else {
      console.log("menu will close now");

      this.render.setStyle(this.sideMenu.nativeElement, "display", "flex");
    }
  }


}
