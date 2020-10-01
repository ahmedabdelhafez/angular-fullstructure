import { Component, OnInit, AfterViewInit, Inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import Swiper from "swiper";
import {
  fadeInOnEnterAnimation,
  fadeOutOnLeaveAnimation,
  slideInUpOnEnterAnimation,
  slideOutUpOnLeaveAnimation,
  tadaOnEnterAnimation,
  slideInDownOnEnterAnimation,
  flipInXOnEnterAnimation,
  flipOutXOnLeaveAnimation,
  slideInRightOnEnterAnimation,
  slideInLeftOnEnterAnimation,
} from "angular-animations";
import { DOCUMENT } from "@angular/common";
import { ConsoleService } from "src/app/shared/util/ConsoleService";
import { duration } from "moment";
@Component({
  selector: "app-slider",
  templateUrl: "./slider.component.html",
  styleUrls: ["./slider.component.scss"],
  animations: [
    fadeInOnEnterAnimation({ delay: 200, duration: 1000 }),
    fadeOutOnLeaveAnimation({ delay: 175, duration: 100 }),
    slideInUpOnEnterAnimation({ delay: 150, duration: 1000 }),
    slideInDownOnEnterAnimation({ delay: 150, duration: 1000 }),
    slideOutUpOnLeaveAnimation({ delay: 170, duration: 1000 }),
    flipInXOnEnterAnimation({ delay: 100, duration: 600 }),
    slideInRightOnEnterAnimation({ delay: 100, duration: 650 }),
    slideInLeftOnEnterAnimation({ delay: 150, duration: 700 }),
  ],
})
export class SliderComponent implements OnInit, AfterViewInit {
  constructor(
    private activetedRoute: ActivatedRoute,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {}
  slideAnimationState: boolean = false;

  ngAfterViewInit() {
    this.slider1();
  }

  slider1() {
    const swipper = new Swiper("#slider1", {
      direction: "horizontal",
      autoHeight: false,
      loop: true,

      pagination: {
        el: ".swiper-pagination",
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      effect: "slide",
    });

    // events

    swipper.on("slideChange", () => {
      ConsoleService.error("slider changs");
      this.slideAnimationState = true;
    });
    swipper.on("transitionStart", () => {
      ConsoleService.warning("transiotn start man");
      this.slideAnimationState = false;
      console.log("variable state: ", this.slideAnimationState);
    });
    swipper.on("transitionEnd", () => {
      ConsoleService.info("transition end");
    });
    swipper.on("slideNextTransitionStart", () => {
      ConsoleService.info("slide to right start");
    });
    swipper.on("slideNextTransitionEnd", () => {
      console.log("slide to right end");
      this.slideAnimationState = true;
      console.log("variable state: ", this.slideAnimationState);
    });
    swipper.on("slidePrevTransitionEnd", () => {
      console.log("slide to right end");
      this.slideAnimationState = true;
      console.log("variable state: ", this.slideAnimationState);
    });
    swipper.on("slidePrevTransitionEnd", () => {
      console.log("sldie previou transition end");
    });
  }
}
