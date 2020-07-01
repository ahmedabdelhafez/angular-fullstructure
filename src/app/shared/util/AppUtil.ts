import { TranslateService } from "@ngx-translate/core";
import * as _lodash from "lodash";
import { TranslationService } from "../../core/translation.service";

/**
 * @description this class used to add methods that can be static and used
 * in the application when we need it
 */
export class AppUtil {
  constructor() {}

  static *generatRandomId() {
    let char1 = Math.floor(Math.random() * 26);
    let char2 = Math.floor(Math.random() * 26);
    let char3 = Math.floor(Math.random() * 26);
    while (true) {
      let num = Math.floor(Math.random() * 1e16);
      yield Number.parseInt(
        char1
          .toString()
          .concat(
            char2.toString().concat(char3.toString().concat(num.toString()))
          )
      );
    }
  }

  static scrollTop() {
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo({ behavior: "smooth", left: 0, top: pos - 20 }); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 16);
  }
}
