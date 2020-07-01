import {
  Directive,
  ElementRef,
  Renderer2,
  OnInit,
  Input,
  AfterViewInit,
  OnDestroy
} from "@angular/core";

import { fromEvent, Subscription } from "rxjs";

@Directive({
  selector: "[gridcolumnspan]"
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
  windowResize$ = fromEvent(window, "resize");
  onLoadSize$ = fromEvent(window, "load");
  windowSub: Subscription;
  onLoadSub: Subscription;
  ngOnInit() {}

  ngAfterViewInit(): void {
    this.mediaQueryOnAppRun();
  }

  mediaQueryOnAppRun() {
    if (window.innerWidth <= 599) {
      // in [xs] screen
      this.setGridColumnSize(this.xsSize);
    } else if (window.innerWidth >= 600 && window.innerWidth <= 959) {
      // in [sm] screen
      this.setGridColumnSize(this.smSize);
    } else if (window.innerWidth >= 960 && window.innerWidth <= 1279) {
      // im [md] screen
      this.setGridColumnSize(this.mdSize);
    } else if (window.innerWidth >= 1280 && window.innerWidth <= 1919) {
      // in [lg] screen
      this.setGridColumnSize(this.lgSize);
    } else if (window.innerWidth >= 1920 && window.innerWidth <= 5000) {
      // in [xl] screen
      this.setGridColumnSize(this.xlSize);
    }
    this.applyMediaQuery();
  }

  applyMediaQuery() {
    this.windowSub = this.windowResize$.subscribe(size => {
      let currWidth = size.target["innerWidth"];
      if (currWidth <= 599) {
        // in [xs] screen
        this.setGridColumnSize(this.xsSize);
      } else if (currWidth >= 600 && currWidth <= 959) {
        // in [sm] screen
        this.setGridColumnSize(this.smSize);
      } else if (currWidth >= 960 && currWidth <= 1279) {
        // im [md] screen
        this.setGridColumnSize(this.mdSize);
      } else if (currWidth >= 1280 && currWidth <= 1919) {
        // in [lg] screen
        this.setGridColumnSize(this.lgSize);
      } else if (currWidth >= 1920 && currWidth <= 5000) {
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
