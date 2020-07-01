import { Directive, ElementRef, Renderer2, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { TranslationService } from '../../core/translation.service';

@Directive({
  selector: "[appRtl]"
})
export class RtlDirective implements OnInit {
  constructor(
    private el: ElementRef,
    private render: Renderer2,
    private translateService: TranslateService,
    private appTranslation:TranslationService
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
