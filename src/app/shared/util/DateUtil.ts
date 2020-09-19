import * as moment from "moment";
import * as humanDateTime from "humanize-duration";
import { AppAlert } from "./AppAlert";

export enum DateLocale {
  AR = "ar",
  En = "en",
  FR = "fr",
  IT = "it",
}
export class DateUtil {
  constructor() {}

  /**
   * @description check if the parsed date is a valid date
   */
  static isValidDate(date) {
    let checkDate = moment(
      date,
      [
        "DD-MM-YYYY",
        "DD/MM/YYYY",
        "MM-DD-YYYY",
        "MM/DD/YYYY",
        "YYYY-MM-DD",
        "YYYY/MM/DD",
      ],
      true
    ).isValid();
    return checkDate;
  }
  /**
   * @description check if the parsed full time in format `hh:mm:ss a | HH:mm:ss a`  is valid
   */

  static isValidFullTime(time) {
    let checkTime = moment(time, ["hh:mm:ss a", "HH:mm:ss a"], true).isValid();
    return checkTime;
  }

  /**
   * check if the parsed time is valid
   */
  static isValidTime(time) {
    let checkTime = moment(
      time,
      ["hh:mm:ss", "HH:mm:ss", "hh:mm", "HH:mm"],
      true
    ).isValid();
    return checkTime;
  }

  /**
   * @description `isDateTime` Method Check if the value is a valida date time with `AM` or `PM` Just 
   * pass it at the end of the date time 
   * @param dateTimeVal 
   * @default formats 
   *    "DD-MM-YYYY hh:mm:ss",
        "DD/MM/YYYY hh:mm:ss",
        "MM-DD-YYYY hh:mm:ss",
        "MM/DD/YYYY hh:mm:ss",
        "YYYY-MM-DD hh:mm:ss",
        "YYYY/MM/DD hh:mm:ss a",
        "DD-MM-YYYY hh:mm:ss a",
        "DD/MM/YYYY hh:mm:ss a",
        "MM-DD-YYYY hh:mm:ss a",
        "MM/DD/YYYY hh:mm:ss a",
        "YYYY-MM-DD hh:mm:ss a",
        "YYYY/MM/DD hh:mm:ss a"
        @returns `boolean`
   */
  static isDateTime(dateTimeVal): boolean {
    return moment(dateTimeVal, [
      "DD-MM-YYYY hh:mm:ss",
      "DD/MM/YYYY hh:mm:ss",
      "MM-DD-YYYY hh:mm:ss",
      "MM/DD/YYYY hh:mm:ss",
      "YYYY-MM-DD hh:mm:ss",
      "YYYY/MM/DD hh:mm:ss a",
      "DD-MM-YYYY hh:mm:ss a",
      "DD/MM/YYYY hh:mm:ss a",
      "MM-DD-YYYY hh:mm:ss a",
      "MM/DD/YYYY hh:mm:ss a",
      "YYYY-MM-DD hh:mm:ss a",
      "YYYY/MM/DD hh:mm:ss a",
    ]).isValid();
  }

  /**
   * @description `formatDate` Metho is used to format date with multile supported formats 
   * but it first check is the dat is valid or no
   * @default default check formats ar "DD-MM-YYYY",
        "DD/MM/YYYY",
        "MM-DD-YYYY",
        "MM/DD/YYYY",
        "YYYY-MM-DD",
        "YYYY/MM/DD"
   */
  static formatDate(dateValue, format = "DD/MM/YYYY") {
    let dateFormat = "";
    if (DateUtil.isValidDate(dateValue)) {
      dateFormat = moment(dateValue, [
        "DD-MM-YYYY",
        "DD/MM/YYYY",
        "MM-DD-YYYY",
        "MM/DD/YYYY",
        "YYYY-MM-DD",
        "YYYY/MM/DD",
      ]).format(format);
    }
    return dateFormat;
  }
  /**
   * @description `getWeekDays` Method return with an array of week days names based on locale
   * @param locale  the locale for the user
   * @default 'ar'
   */
  static getWeekDays(locale: DateLocale) {
    moment.locale(locale);
    return moment.weekdays();
  }
  /**
   * @description `getYearMonths` Method return with an array of year months names based on locale
   * @param locale  the locale for the user
   * @default 'ar'
   */
  static getYearMonths(locale = "en") {
    moment.locale(locale);
    return moment.weekdays();
  }
  /**
   * @description return the day number in year such as `05 of january` is the 5t day in the year
   */
  getDayNumberInYear(date: string) {
    return moment(
      date,
      [
        "DD-MM-YYYY",
        "DD/MM/YYYY",
        "MM-DD-YYYY",
        "MM/DD/YYYY",
        "YYYY-MM-DD",
        "YYYY/MM/DD",
      ],
      true
    ).dayOfYear();
  }

  /**
   *@description this method is used for subtract months from date and then return the months names
   * @param workDate the date t work with
   * @param SubtractDuration the duration to subtract from the income date
   * @param locale the locale for language that array will return with
   * @returns `string[]` array of months
   */
  static getMonthsNamesBetweenDates(
    workDate: string,
    SubtractDuration: number = 0,
    locale: string = "ar"
  ) {
    moment.locale(locale);
    let months = [];
    let date1 = moment(workDate, "DD/MM/YYYY", true);

    if (!date1.isValid()) {
      throw Error("invalid date or format date must in format [DD/MM/YYYY]");
    }
    if (isNaN(SubtractDuration)) {
      throw Error("duration must be a number");
    }
    for (let index = 0; index < SubtractDuration; index++) {
      months.push(date1.subtract(1, "months").format("MMMM"));
    }
    return months;
  }

  static getDiffernceBetweenDates(
    dateStart: string,
    dateEnd: string,
    locale: DateLocale = DateLocale.En
  ) {
    if (!DateUtil.isValidDate(dateStart) && !DateUtil.isValidDate(dateEnd)) {
      AppAlert.showToastError(
        `please enter a valida date in any of this format [
        "DD-MM-YYYY",
        "DD/MM/YYYY",
        "MM-DD-YYYY",
        "MM/DD/YYYY",
        "YYYY-MM-DD",
        "YYYY/MM/DD"
      ]`,
        "",
        3000
      );
    }
    let vStarteDate = moment(
      dateStart,
      [
        "DD-MM-YYYY",
        "DD/MM/YYYY",
        "MM-DD-YYYY",
        "MM/DD/YYYY",
        "YYYY-MM-DD",
        "YYYY/MM/DD",
      ],
      true
    );
    let vEndDate = moment(
      dateEnd,
      [
        "DD-MM-YYYY",
        "DD/MM/YYYY",
        "MM-DD-YYYY",
        "MM/DD/YYYY",
        "YYYY-MM-DD",
        "YYYY/MM/DD",
      ],
      true
    );
    let duration = moment.duration(vStarteDate.diff(vEndDate));
    return humanDateTime(duration.asMilliseconds(), {
      language: locale,
      fallbacks: ["en"],
      conjunction: locale === DateLocale.AR ? " و " : " and ",
    }).toString();
  }

  /**
   * @description get differnce between full two date and time
   */
  static getDiffernceBetweenDateTime(
    dateTime1,
    dateTime2,
    locale: DateLocale = DateLocale.En
  ) {
    if (!DateUtil.isDateTime(dateTime1) || !DateUtil.isDateTime(dateTime2)) {
      AppAlert.showToastError(
        `please enter a valida date in any of this format [
          "DD-MM-YYYY hh:mm:ss",
          "DD/MM/YYYY hh:mm:ss",
          "MM-DD-YYYY hh:mm:ss",
          "MM/DD/YYYY hh:mm:ss",
          "YYYY-MM-DD hh:mm:ss",
          "YYYY/MM/DD hh:mm:ss a",
          "DD-MM-YYYY hh:mm:ss a",
          "DD/MM/YYYY hh:mm:ss a",
          "MM-DD-YYYY hh:mm:ss a",
          "MM/DD/YYYY hh:mm:ss a",
          "YYYY-MM-DD hh:mm:ss a",
          "YYYY/MM/DD hh:mm:ss a"
      ]`,
        "",
        3000
      );
    }
    let starteDate = moment(
      dateTime1,
      [
        "DD-MM-YYYY hh:mm:ss",
        "DD/MM/YYYY hh:mm:ss",
        "MM-DD-YYYY hh:mm:ss",
        "MM/DD/YYYY hh:mm:ss",
        "YYYY-MM-DD hh:mm:ss",
        "YYYY/MM/DD hh:mm:ss a",
        "DD-MM-YYYY hh:mm:ss a",
        "DD/MM/YYYY hh:mm:ss a",
        "MM-DD-YYYY hh:mm:ss a",
        "MM/DD/YYYY hh:mm:ss a",
        "YYYY-MM-DD hh:mm:ss a",
        "YYYY/MM/DD hh:mm:ss a",
      ],
      true
    );
    let endDate = moment(
      dateTime2,
      [
        "DD-MM-YYYY hh:mm:ss",
        "DD/MM/YYYY hh:mm:ss",
        "MM-DD-YYYY hh:mm:ss",
        "MM/DD/YYYY hh:mm:ss",
        "YYYY-MM-DD hh:mm:ss",
        "YYYY/MM/DD hh:mm:ss a",
        "DD-MM-YYYY hh:mm:ss a",
        "DD/MM/YYYY hh:mm:ss a",
        "MM-DD-YYYY hh:mm:ss a",
        "MM/DD/YYYY hh:mm:ss a",
        "YYYY-MM-DD hh:mm:ss a",
        "YYYY/MM/DD hh:mm:ss a",
      ],
      true
    );
    let duration = moment.duration(starteDate.diff(endDate));
    return humanDateTime(duration.asMilliseconds(), {
      language: locale,
      fallbacks: ["en"],
      conjunction: locale === DateLocale.AR ? " و " : " and ",
    }).toString();
  }

  static getDiffernceBetweenTime(
    time1,
    time2,
    locale: DateLocale = DateLocale.En
  ): string {
    let startTime = moment(time1, "HH:mm:ss a");
    let endTime = moment(time2, "HH:mm:ss a");
    let duration = moment.duration(endTime.diff(startTime));
    if (!DateUtil.isValidTime(time1) && !DateUtil.isValidTime(time2)) {
      AppAlert.showToastError(
        "please enter a valid time in format [hh:mm or HH:mm]",
        "Time Error",
        2500
      );
      return;
    }

    return humanDateTime(duration.asMilliseconds(), {
      language: locale,
      fallbacks: ["en"],
      conjunction: locale === DateLocale.AR ? " و " : " and ",
    }).toString();
  }
}
