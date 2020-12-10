import { Directive, ElementRef, Input, Renderer2 } from "@angular/core";

@Directive({
  selector: "[appBoxOverflow]",
})

/** @description this directive is used to add overflow to a box an developer can customize it to add overflow for
 * `x-axis` or `y-axis` or `both`
 */
export class BoxOverflowDirective {
  @Input('overflowX') overflowX:boolean = true;
  @Input('overflowY') overflowY:boolean = true;
  
  constructor(private el: ElementRef<HTMLElement>, private render: Renderer2) {}
}
