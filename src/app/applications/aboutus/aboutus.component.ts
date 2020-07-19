import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from "@angular/core";
import Typed from "typed.js/src/typed.js";
import { Router, ActivatedRoute } from "@angular/router";
import { ViewportScroller } from "@angular/common";
import { from, fromEvent } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { AppAlert } from "src/app/shared/util/AppAlert";
@Component({
  selector: "app-aboutus",
  templateUrl: "./aboutus.component.html",
  styleUrls: ["./aboutus.component.scss"],
})
export class AboutusComponent implements OnInit, AfterViewInit {
  @ViewChild("toppage", { static: true }) toppage: ElementRef<HTMLElement>;
  imgLink = "../../../assets/icons/navbar-icons/calendar-outline.png";
  imgLink2 = "../../../assets/icons/navbar-icons/camera-outline.png";
  options = {
    strings: [
      "أفضل عمالة ماهرة في مصر",
      "أفضل خبرات",
      "مؤهلات عالية و خبرة في كافة المجالات",
      "نتطرق للأفضل",
    ],
    typeSpeed: 100,
    backSpeed: 40,
    showCursor: false,
    cursorChar: "|",
    loop: true,
  };

  fragemntItems = [
    { sectionId: "section1", sectionName: "Section 1" },
    { sectionId: "section2", sectionName: "Section 2" },
    { sectionId: "section3", sectionName: "Section 3" },
    { sectionId: "section4", sectionName: "Section 4" },
    { sectionId: "section5", sectionName: "Section 5" },
  ];

  postItem = [1, 2, 3, 4, 5];

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private viewScroll: ViewportScroller,
    private translateService: TranslateService
  ) {}

  moreAbout() {
    this.router.navigate(["moreabout"], { relativeTo: this.activeRoute });
  }

  async ngOnInit() {
    let x = await AppAlert.showError(
      "an error here ya amr",
      "error title",
      2000
    );
    if (x) {
      console.log("ok alert work fine");
    }
    // const typed = new Typed('.typed-element', this.options);
    this.translateService.get("hello").subscribe((data) => {
      console.log("from about translation");
      console.log(data);
    });
  }

  ngAfterViewInit() {
    this.activeRoute.fragment.subscribe((frag) => {
      if (frag) {
        this.viewScroll.scrollToAnchor(frag.toString());
      }
    });
  }

  scrolltoSec(sectionId) {
    this.viewScroll.scrollToAnchor(sectionId);
  }

  scrollTop() {
    // this.viewScroll.scrollToPosition([0, 0]);

    this.toppage.nativeElement.scrollIntoView({
      behavior: "smooth",
    });
  }
}
