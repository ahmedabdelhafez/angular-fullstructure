import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  SimpleChanges,
  OnChanges,
} from "@angular/core";
import Swiper from "swiper";
import { fromEvent } from "rxjs";

@Component({
  selector: "swiper-slider",
  templateUrl: "./swiper-slider.component.html",
  styleUrls: ["./swiper-slider.component.scss"],
})
export class SwiperSliderComponent implements OnInit, AfterViewInit, OnChanges {
  /**@description array of images to disply
   * @type Array
   */
  @Input("ImageList") ImageList = [];
  /**
   * @description uniquer id for the slider
   * @type `String`
   */
  @Input("sliderId") sliderId: string = "";
  @Input("btnNext") btnNext: string = "";
  @Input("btnPrev") btnPrev: string = "";
  @Input("sliderLoop") sliderLoop: true | false = false;

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log("on chnages fire");
    console.log(changes);
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    var mySwiper = new Swiper(`#${this.sliderId}`, {
      // Optional parameters
      direction: "horizontal",
      loop: this.sliderLoop,
      init: true,
      autoplay: false,
      effect: "slide",
      speed: 500,
      setWrapperSize: true,
      spaceBetween: 10,

      // If we need pagination
      pagination: {
        el: ".swiper-pagination",
      },

      // Navigation arrows
      navigation: {
        nextEl: `#${this.btnNext}`,
        prevEl: `#${this.btnPrev}`,
      },

      // And if we need scrollbar
      scrollbar: {
        el: ".swiper-scrollbar",
      },
    });
  }
}
