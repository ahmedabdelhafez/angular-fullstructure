import { Directive, ElementRef, Renderer2, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { TranslationService } from "../../core/translation.service";

@Directive({
  selector: "[appRtl]",
})
/**
 * right to left directive is used to change apperance of the element based on the language direction
 * like `arabic , farsi` languages and add css class `rtl-item` to host element this class
 * allow developer to catch it and add additional style in arabic language
 * if language nt arabic it remove the class
 */
export class RtlDirective implements OnInit {
  constructor(
    private el: ElementRef,
    private render: Renderer2,
    private translateService: TranslateService,
    private appTranslation: TranslationService
  ) {}

  ngOnInit(): void {
    // this.translateService.onLangChange.subscribe(data => {
    //   if (data.lang === "ar") {
    //     this.render.addClass(this.el.nativeElement, "rtl-item");
    //   } else {
    //     this.render.removeClass(this.el.nativeElement, "rtl-item");
    //   }
    // });

    this.appTranslation.getDefaultLang().subscribe((lang) => {
      if (lang === "ar") {
        this.render.addClass(this.el.nativeElement, "rtl-item");
      } else {
        this.render.removeClass(this.el.nativeElement, "rtl-item");
      }
    });
  }
}
