import {
  Directive,
  OnInit,
  ElementRef,
  Renderer2,
  Input,
  AfterViewInit
} from "@angular/core";

@Directive({
  selector: "[gridrowspan]"
})
export class GridrowspanDirective implements OnInit, AfterViewInit {
  constructor(private el: ElementRef<HTMLElement>, private render: Renderer2) {}
  /**
   * @description input to span current row
   * @param 'Number'
   * @default 0
   */
  @Input("rowSpanCount") rowSpanCount: number = 0;
  ngOnInit() {}

  ngAfterViewInit(): void {
    this.render.setStyle(
      this.el.nativeElement,
      "gridRow",
      `span ${this.rowSpanCount}`
    );
  }
}
