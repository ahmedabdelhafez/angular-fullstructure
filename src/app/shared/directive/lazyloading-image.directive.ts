import { Directive, ElementRef } from "@angular/core";

@Directive({
  selector: "[appLazyloadingImage]",
})
export class LazyloadingImageDirective {
  constructor({ nativeElement }: ElementRef<HTMLImageElement>) {
    const supports = "loading" in HTMLImageElement.prototype;

    if (supports) {
      nativeElement.setAttribute("loading", "lazy");
    }
  }
}
