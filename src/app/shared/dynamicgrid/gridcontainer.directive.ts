import {
  Directive,
  ElementRef,
  Renderer2,
  OnInit,
  AfterViewInit,
  Input
} from "@angular/core";
import { GridFlowOption } from "./gridtypes/GridFlowOptions.enum";
import { GridColumnOptions } from "./gridtypes/GridColumnOptions.enum";

@Directive({
  selector: "[gridcontainer]",
  inputs: ["gridTemplateColumn", "gridTemplateRow"]
})
export class GridcontainerDirective implements OnInit, AfterViewInit {
  constructor(private el: ElementRef<HTMLElement>, private render: Renderer2) {}

  /**
   * @description this property is used to detect the type of the grid container
   * if `gridColumnOptions` is `fixed` it's apply the 'columnCount' and apply property with the default 12 column `grid-auto-flow` to `[dense]`
   * if `gridColumnOptions` is 'dynamic' it's apply the 'initColumnSize' with default value 200px you can change it
   */
  @Input("gridColumnOptions") gridColumnOptions: GridColumnOptions =
    GridColumnOptions.FIXED;
  @Input("columnCount") columnCount: number = 12;
  @Input("initColumnSize") initColumnSize: number = 200; //value in pixel
  @Input("initRowSize") initRowSize: number = 100; // value in pixel
  @Input("initAutoFlow") initAutoFlow: GridFlowOption = GridFlowOption.ROW;
  // << optional for gap >> ///
  @Input("columnGap") columnGap: number = 0;
  @Input("rowGap") rowGap: number = 0;

  ngOnInit(): void {
    // this.buildResponsiveGridUi();
  }

  ngAfterViewInit() {
    this.buildResponsiveGridUi();
  }

  /// << grid ui builder >> //
  buildResponsiveGridUi() {
    if (this.gridColumnOptions === "fixed") {
      this.render.setStyle(this.el.nativeElement, "width", "100%");
      this.fixedColumnBuider();
    } else if (this.gridColumnOptions === "dynamic") {
      this.render.setStyle(this.el.nativeElement, "width", "100%");
      this.responsiveColumnBuilder();
    }
  }
  // ###################################################################################
  /// << create the builder functions >> ///
  // ###################################################################################
  fixedColumnBuider() {
    // this.render.setStyle(this.el.nativeElement, "width", "100% !important");
    // make layout grid
    this.render.setStyle(this.el.nativeElement, "display", "grid");
    // make grid by default 12 column
    this.render.setStyle(
      this.el.nativeElement,
      "gridTemplateColumns",
      `repeat(${this.columnCount},1fr)`
    );
    // initial the row sizes for grid container
    this.render.setStyle(
      this.el.nativeElement,
      "gridTemplateRows",
      `minmax(${this.initRowSize}px,1fr)`
    );
    // << create the flow >> //
    this.render.setStyle(this.el.nativeElement, "gridAutoFlow", "dense");
    // << set gaps between column and rows >> //
    this.render.setStyle(
      this.el.nativeElement,
      "columnGap",
      `${this.columnGap}px`
    );
    this.render.setStyle(this.el.nativeElement, "rowGap", `${this.rowGap}px`);
  }

  /**
   * @description this method apply responsive to design if peoperty `gridColumnOptions` have value `dynamic`
   */
  responsiveColumnBuilder() {
    // this.render.setStyle(this.el.nativeElement, "width", "100% !important");
    // make layout grid
    this.render.setStyle(this.el.nativeElement, "display", "grid");
    // make grid responsive
    this.render.setStyle(
      this.el.nativeElement,
      "gridTemplateColumns",
      `repeat(auto-fit,minmax(${this.initColumnSize}px,1fr))`
    );
    // apply values to grid flow
    if (this.initAutoFlow === "row") {
      this.render.setStyle(
        this.el.nativeElement,
        "gridAutoFlow",
        this.initAutoFlow
      );
      this.render.setStyle(
        this.el.nativeElement,
        "gridAutoRows",
        `minmax(${this.initRowSize}px,auto)`
      );
    } else if (this.initAutoFlow === "column") {
      this.render.setStyle(this.el.nativeElement, "", this.initAutoFlow);
      this.render.setStyle(
        this.el.nativeElement,
        "gridAutoColumns",
        `minmax(${this.initColumnSize}px,1fr)`
      );
    }
    // << set gaps between column and rows >> //
    this.render.setStyle(
      this.el.nativeElement,
      "columnGap",
      `${this.columnGap}px`
    );
    this.render.setStyle(this.el.nativeElement, "rowGap", `${this.rowGap}px`);
  }
}
