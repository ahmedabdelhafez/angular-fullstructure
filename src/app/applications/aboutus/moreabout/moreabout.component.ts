import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { TranslationService } from "../../../core/translation.service";

@Component({
  selector: "app-moreabout",
  templateUrl: "./moreabout.component.html",
  styleUrls: ["./moreabout.component.scss"],
})
export class MoreaboutComponent implements OnInit {
  userId: number;
  userName: string;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService,
    private appTranslate: TranslationService
  ) {}
  appTranslateSub: Subscription;
  ngOnInit() {
    this.translate.setDefaultLang(localStorage.getItem("app-lang"));
    // change menu language
    this.appTranslateSub = this.appTranslate
      .getDefaultLang()
      .subscribe((data) => {
        if (data === "ar") {
          this.translate.setDefaultLang(data);
          this.translate.use(data);
        } else {
          this.translate.setDefaultLang(data);
          this.translate.use(data);
        }
      });
  }

  backToHome() {
    this.router.navigate(["/aboutus"], { relativeTo: this.activatedRoute });
  }
}
