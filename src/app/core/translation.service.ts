import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TranslationService {
  defaultLang =
    localStorage.getItem("lang") !== null
      ? localStorage.getItem("lang").toString()
      : "en";
  myLang: BehaviorSubject<string> = new BehaviorSubject<string>(
    this.defaultLang
  );

  setAppDefaultLang(lang: string) {
    this.myLang.next(lang);
  }

  getDefaultLang() {
    return this.myLang.asObservable();
  }

  myTrans: any = "";
  constructor(private translateService: TranslateService) {}

  getTranslation(word: string | string[]) {
    // return this.translateService.instant(word);
    return this.translateService.get(word).toPromise();
  }
}
