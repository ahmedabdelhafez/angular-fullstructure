import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Renderer2,
} from "@angular/core";
import Swiper from "swiper";

import { trigger, transition, useAnimation } from "@angular/animations";

@Component({
  selector: "app-sliders",
  templateUrl: "./sliders.component.html",
  styleUrls: ["./sliders.component.scss"],
  animations: [

  ],
})
export class SlidersComponent implements OnInit, AfterViewInit {
  images = [
    {
      id: 1,
      img: "assets/images/slider/1.jpg",
      title: "my lovely car",
      heading: "some data here",
    },
    {
      id: 3,
      img: "assets/images/slider/3.jpg",
      title: "dont touch my car",
      heading: "some data here",
    },
    {
      id: 4,
      img: "assets/images/slider/4.jpg",
      title: "mercendes s is the best",
      heading: "dummy subtitle",
    },
    {
      id: 5,
      img: "assets/images/slider/5.jpg",
      title: "next amazing one",
      heading: "some data here",
    },
  ];
  images2 = [
    { id: 1, img: "../../../assets/images/slider/1.jpg" },
    { id: 2, img: "../../../assets/images/slider/3.jpg" },
    { id: 3, img: "../../../assets/images/slider/5.jpg" },
  ];
  constructor(private el: ElementRef<HTMLElement>, private render: Renderer2) {}

  @ViewChild("mainMenu") mainMenu: ElementRef<HTMLElement>;
  @ViewChild("st") st: ElementRef<HTMLElement>;
  @ViewChild("h2text") h2text: ElementRef<HTMLElement>;
  @ViewChild("ptext") ptext: ElementRef<HTMLElement>;
  @ViewChild("imgele") imgele: ElementRef<HTMLElement>;

  transitionSpeed = 1000;
  ngOnInit() {}
  hetitle: string = "";
  animateState = false;
  currentSliderIndex: number;
  ngAfterViewInit() {
    this.createSlider();
  }

  createSlider() {
    let slider = new Swiper("#slider1", {
      loop: true,
      coverflowEffect: { slideShadows: true },
      slidesPerView: 1,
      spaceBetween: 0,
      navigation: {
        nextEl: "#nextBtn",
        prevEl: "#prevBtn",
      },
      effect: "slide",
      speed: this.transitionSpeed,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });

    slider.on("imagesReady", () => {
      console.log("slider work");
      this.currentSliderIndex = slider.realIndex;
    });

    slider.on("slideChangeTransitionEnd", () => {
      this.currentSliderIndex = slider.realIndex;
      console.log("current index: " + slider.realIndex);
    });
  }
}
