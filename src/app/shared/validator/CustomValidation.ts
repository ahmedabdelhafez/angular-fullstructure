import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import validator from "validator";
import { DateUtil } from "../util/DateUtil";

export class CustomValidation {
  /**
   * @description `haveSpaces` check if the value have spaces
   * @param `control` string
   * @returns `boolean`
   */
  static haveSpaces(control: AbstractControl): ValidationErrors | null {
    const val = control.value as string;
    const spaceRegex = /\s/;
    if (spaceRegex.test(val)) {
      return { haveSpace: true, message: "this field cannot contain spaces" };
    }
    return null;
  }

  /**
   * @description `isarabiconly` check if the value is valid arabic letter only [أ - ي]
   * @param `control` string
   * @returns `boolean`
   */
  static isArabicOnly(control: AbstractControl): ValidationErrors | null {
    const val: string = control.value as string;
    // const arabicRegex = /[\u0600-\u06FF]/;
    // if (!arabicRegex.test(val)) {
    //   return { notArabic: true };
    // }

    if (!validator.isAlpha(val === null ? "" : val, "ar-EG")) {
      return { notArabic: true };
    }
    return null;
  }
  /**
   * @description `isenglishonly` check if the value is valid english letter only [A-Z]
   * @param `control` string
   * @returns `boolean`
   */
  static isEnglishOnly(control: AbstractControl): ValidationErrors | null {
    const val: string = control.value as string;
    // const englishRegex = new RegExp("[a-zA-Z]+");
    // if (!englishRegex.test(val)) {
    //   return { notEnglish: true };
    // }
    if (!validator.isAlpha(val === null ? "" : val, "en-US")) {
      return { notEnglish: true };
    }
    return null;
  }
  /**
   * @description `isurl` check if the value is valid url on using protocol [http | https]
   * @param `control` string
   * @returns `boolean`
   */
  static isUrl(control: AbstractControl): ValidationErrors | null {
    const val: string = control.value as string;
    if (
      !validator.isURL(val === null ? "" : val, {
        protocols: ["http", "https", "ftp"],
        allow_underscores: true,
      })
    ) {
      return { notUrl: true, message: "please insert a valid URL here" };
    }
    return null;
  }
  /**
   * @description `contains` check if the value contains any of the specified parameter
   * @param `control` string
   * @returns `boolean`
   */
  static contains(searchText: string): ValidationErrors | null {
    return (control: AbstractControl): { [key: string]: any } => {
      const val: string = control.value as string;
      if (validator.contains(val === null ? "" : val, searchText)) {
        return { contain: true, message: { searchText } };
      }
      return null;
    };
  }

  /**
   * @description `ismobilephone` check if the value is a valid mobile used locale is `en-AU` for AUstralia
   * @param `control` string
   * @returns `boolean`
   */
  static ismobilephone(control: AbstractControl): ValidationErrors | null {
    const val: string = control.value as string;
    if (
      !validator.isMobilePhone(val === null ? "" : val, "en-AU", {
        strictMode: false,
      })
    ) {
      return {
        notMobile: true,
        message:
          "please add a valid australian phone code that starts with [0491]",
      };
    }
    return null;
  }
  /**
   * @description `iscurrency` check if the value is a valid currency max number for decimal digit 2
   * and the decimal number is not required if it not wrriten by the user
   * @param `control` string
   * @returns `boolean`
   */
  static iscurrency(control: AbstractControl): ValidationErrors | null {
    const val: string = control.value as string;
    if (
      !validator.isCurrency(val === null ? "" : val, {
        thousands_separator: ",",
        decimal_separator: ".",
        allow_decimal: true,
        require_decimal: false,
        digits_after_decimal: [1, 2],
      })
    ) {
      return { notCurrency: true, message: { decimal: "1:2" } };
    }
    return null;
  }

  /**
   * @description `isnumeric` method checks if the field value is number only [0-9]
   * @param `control` string
   * @returns `boolean`
   */
  static isnumeric(control: AbstractControl): ValidationErrors | null {
    const val = control.value as string;
    const numberReg = new RegExp("^[0-9]+$");
    if (!validator.isNumeric(val === null ? "" : val, { no_symbols: true })) {
      return { notNumber: true };
    }
    return null;
  }
  /**
   * @description `isdecima` method checks if the field value is number only [0-9]
   * @param `control` string
   * @returns `boolean`
   */
  static isdecimal(control: AbstractControl): ValidationErrors | null {
    const val = control.value as string;
    if (!validator.isDecimal(val, { locale: "ar-EG", decimal_digits: "1,2" })) {
      return { notDecimal: true };
    }
    return null;
  }

  /**
   * @description `isAlphaNumericArabic` method checks if the field have an alpha numberic value digit and chars for arabic
   * @param `control` string
   * @returns `boolean`
   */
  static isAlphaNumericArabic(
    control: AbstractControl
  ): ValidationErrors | null {
    const val: string = control.value as string;
    if (!validator.isAlphanumeric(val === null ? "" : val, "ar-EG")) {
      return { notAlphaArabic: true };
    }
    return null;
  }
  /**
   * @description `isAlphaNumericEnglish` method checks if the field have an alpha numberic value digit and chars
   * @param `control` string
   * @returns `boolean`
   */
  static isAlphaNumericEnglish(
    control: AbstractControl
  ): ValidationErrors | null {
    const val: string = control.value as string;
    if (!validator.isAlphanumeric(val === null ? "" : val, "en-US")) {
      return { notAlphaEnglish: true };
    }
    return null;
  }
  /**
   * @description `isEmail` check emails
   * @param `control` string
   * @returns `boolean`
   */
  static isEmail(control: AbstractControl): ValidationErrors | null {
    const val: string = control.value as string;
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!validator.isEmail(val === null ? "" : val)) {
      return { notEmail: true };
    }
    return null;
  }

  /**
   * @description `isCreditCard` method checks if the field value is a valid credit card
   * @param `control` string
   * @returns `boolean`
   */
  static isCreditCard(control: AbstractControl): ValidationErrors | null {
    const val: string = control.value as string;
    if (!validator.isCreditCard(val)) {
      return { notCreditard: true };
    }
    return null;
  }
  /**
   * @description `isIpV4` method checks if the field value is a valid ipV4
   * @param `control` string
   * @returns `boolean`
   */
  static isIpV4(control: AbstractControl): ValidationErrors | null {
    const val: string = control.value as string;
    if (!validator.isIP(val, "4")) {
      return { notIpV4: true };
    }
    return null;
  }
  /**
   * @description `isIpV6` method checks if the field value is a valid ipV6
   * @param `control` string
   * @returns `boolean`
   */
  static isIpV6(control: AbstractControl): ValidationErrors | null {
    const val: string = control.value as string;
    if (!validator.isIP(val, "6")) {
      return { notIpV6: true };
    }
    return null;
  }
  /**
   * @description `isbase64` method checks if the field value is a valid base64 value
   * @param `base64String` string
   * @returns `boolean`
   */
  static isBase64(control: AbstractControl): ValidationErrors | null {
    if (!validator.isBase64(control.value as string)) {
      return { notBase64: true };
    }
  }

  /**
   * @description `CheckRange` method checks if the field value between min and max
   * @param `min` number, `max` number
   * @returns `boolean`
   */
  static isBetween(min: number, max: number): ValidationErrors | null {
    return (control: AbstractControl): { [key: string]: any } => {
      const val = control.value as number;
      if (!(val >= min && val <= max)) {
        return { notRange: true, message: { min, max } };
      }
      return null;
    };
  }
  /**
     * @description `isDate` method checks if the field value is a valid date
     * and the available date formats 
     * [ "DD-MM-YYYY",
        "DD/MM/YYYY",
        "MM-DD-YYYY",
        "MM/DD/YYYY",
        "YYYY-MM-DD",
        "YYYY/MM/DD"]
     * @param `control` date string
     * @returns `boolean`
     */
  static isDate(control: AbstractControl): ValidationErrors | null {
    const val = control.value as string;
    if (DateUtil.isValidDate(val) === false) {
      return {
        notDate: true,
        msg: `valid formats: "DD-MM-YYYY"
      "DD/MM/YYYY",
      "MM-DD-YYYY"`,
      };
    } else {
      return null;
    }
  }

  static passwordMatchValidator(control: AbstractControl) {
    const password: string = control.get("password").value; // get password from our password form control
    const confirmPassword: string = control.get("confirmPassword").value; // get password from our confirmPassword form control
    // compare is the password math
    if (password !== confirmPassword) {
      // if they don't match, set an error in our confirmPassword form control
      control.get("confirmPassword").setErrors({ NoPassswordMatch: true });
    }
  }
}
