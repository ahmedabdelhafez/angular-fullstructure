import {
  Directive,
  ElementRef,
  Renderer2,
  OnInit,
  Input,
  AfterViewInit,
  OnDestroy,
} from "@angular/core";

import { fromEvent, Subscription } from "rxjs";

@Directive({
  selector: "[gridcolumnspan]",
})
export class GridcolumnspanDirective
  implements OnInit, AfterViewInit, OnDestroy {
  constructor(private el: ElementRef<HTMLElement>, private render: Renderer2) {}
  /**
   * @description input to span current column
   * @param 'Number'
   * @default 0
 
   */
  // @Input("columnSpanCount") columnSpanCount: number = 12;
  columnSpanCount: number = 12;
  @Input("xlSize") xlSize: number;
  @Input("lgSize") lgSize: number;
  @Input("mdSize") mdSize: number;
  @Input("smSize") smSize: number;
  @Input("xsSize") xsSize: number;
  screenSizes = {
    xs: 599,
    sm: { min: 600, max: 959 },
    md: { min: 960, max: 1279 },
    lg: { min: 1280, max: 1919 },
    xl: { min: 1920, max: 5000 },
  };
  windowResize$ = fromEvent(window, "resize");
  onLoadSize$ = fromEvent(window, "load");
  windowSub: Subscription;
  onLoadSub: Subscription;
  ngOnInit() {}

  ngAfterViewInit(): void {
    this.mediaQueryOnAppRun();
  }

  mediaQueryOnAppRun() {
    if (window.innerWidth <= this.screenSizes.xs) {
      // in [xs] screen
      this.setGridColumnSize(this.xsSize);
    } else if (
      window.innerWidth >= this.screenSizes.sm.min &&
      window.innerWidth <= this.screenSizes.sm.max
    ) {
      // in [sm] screen
      this.setGridColumnSize(this.smSize);
    } else if (
      window.innerWidth >= this.screenSizes.md.min &&
      window.innerWidth <= this.screenSizes.md.max
    ) {
      // im [md] screen
      this.setGridColumnSize(this.mdSize);
    } else if (
      window.innerWidth >= this.screenSizes.lg.min &&
      window.innerWidth <= this.screenSizes.lg.max
    ) {
      // in [lg] screen
      this.setGridColumnSize(this.lgSize);
    } else if (
      window.innerWidth >= this.screenSizes.xl.min &&
      window.innerWidth <= this.screenSizes.xl.max
    ) {
      // in [xl] screen
      this.setGridColumnSize(this.xlSize);
    }
    this.applyMediaQuery();
  }

  applyMediaQuery() {
    this.windowSub = this.windowResize$.subscribe((size) => {
      let currWidth = size.target["innerWidth"];
      if (currWidth <= this.screenSizes.xs) {
        // in [xs] screen
        this.setGridColumnSize(this.xsSize);
      } else if (
        currWidth >= this.screenSizes.sm.min &&
        currWidth <= this.screenSizes.sm.max
      ) {
        // in [sm] screen
        this.setGridColumnSize(this.smSize);
      } else if (
        currWidth >= this.screenSizes.md.min &&
        currWidth <= this.screenSizes.md.max
      ) {
        // im [md] screen
        this.setGridColumnSize(this.mdSize);
      } else if (
        currWidth >= this.screenSizes.lg.min &&
        currWidth <= this.screenSizes.lg.max
      ) {
        // in [lg] screen
        this.setGridColumnSize(this.lgSize);
      } else if (
        currWidth >= this.screenSizes.xl.min &&
        currWidth <= this.screenSizes.xl.max
      ) {
        // in [xl] screen
        this.setGridColumnSize(this.xlSize);
      }
    });
  }

  setGridColumnSize(colCount?: number) {
    this.render.setStyle(
      this.el.nativeElement,
      "gridColumn",
      `span ${colCount}`
    );
  }

  ngOnDestroy(): void {
    if (this.windowSub) this.windowSub.unsubscribe();
  }
}
