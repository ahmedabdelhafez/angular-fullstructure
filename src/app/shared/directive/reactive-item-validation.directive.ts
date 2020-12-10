import {
  Directive,
  ElementRef,
  HostListener,
  Renderer2,
  Inject,
  OnInit,
  Self,
  Optional,
  Input,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ConsoleService } from '../util/ConsoleService';

@Directive({
  selector: '[reactiveitemvalidation]',
  // host: {
  //   '(input)': 'onEvent($event)',
  // },
})

/** @decription this directive used to apply validation on items */
export class ReactiveitemvalidationDirective implements OnInit, OnChanges {
  /** this input is used to pass the path form translation to show custom error message */
  @Input('translationPrefix') translationPrefix: string;
  /** field that is used in compare validation */
  @Input('compareField') compareField: string;
  /** value for item that is used in length or range validation such as `minLenght` & 'maxLenght' or `from` */
  @Input('val1') val1: string;
  /** value for item that is used in length or range validation such as `minLenght` & 'maxLenght' or `to` */
  @Input('val2') val2: string;

  /** this input used to target non form group control,
   * it will get item by id and add effect to it such as `border , color , background color`
   *
   */
  @Input('targetInputItem') targetInputItem: string = '';
  errorMsgTag: string;
  errorMsgId: string | any;
  errorMsg: string;

  /**
   * @description this is map data structure of all availabel or added errors in app
   * to speed validation and write less code and allow translation
   * developer must create an objet in `i18n` to add translation for defined erros with pretty and clean names
   * objectName = VALIDATION-MESSAGES
   */
  validationDeafultPrefix: string = 'VALIDATION-MESSAGES.';
  errorMessages: Map<string, string> = new Map<string, string>([
    ['required', 'required'],
    ['maxLength', 'maxLength'],
    ['minLength', 'minLength'],
    ['maxlength', 'maxLength'],
    ['minlength', 'minLength'],
    ['alpha', 'alpha'],
    ['email', 'email'],
    ['numeric', 'numeric'],
    ['contains', 'contains'],
    ['range', 'range'],
    ['compare', 'compare'],
    ['lessthan', 'lessthan'],
    ['greaterthan', 'greaterthan'],
    ['requiredTrue', 'requiredTrue'],
    ['date', 'date'],
    ['notArabic', 'notArabic'],
    ['notEnglish', 'notEnglish'],
    ['notUrl', 'notUrl'],
    ['notMobile', 'notMobile'],
    ['notCurrency', 'notCurrency'],
    ['notNumber', 'notNumber'],
    ['notAlphaArabic', 'notAlphaArabic'],
    ['notAlphaEnglish', 'notAlphaEnglish'],
    ['notEmail', 'notEmail'],
    ['notCreditcard', 'notCreditcard'],
    ['notDate', 'notDate'],
    ['notInRange', 'notInRange'],
    ['password', 'password'],
    ['notPassport', 'notPassport'],
    ['alphaNumeric', 'alphaNumeric'],
    ['url', 'url'],
  ]);
  validationErrorNames = [
    'required',
    'alpha',
    'numeric',
    'email',
    'maxLength',
    'minLength',
    'contains',
    'range',
    'compare',
    'date',
    'notArabic',
    'notEnglish',
    'notUrl',
    'notMobile',
    'notCurrency',
    'notNumber',
    'notAlphaArabic',
    'notAlphaEnglish',
    'notEmail',
    'notCreditcard',
    'notDate',
    'notInRange',
    'password',
    'notPassport',
    'alphaNumeric',
    'url'
  ];

  translationSubscription: Subscription;
  constructor(
    private el: ElementRef<HTMLElement>,
    private render: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    @Self() @Optional() private formControl: NgControl,
    private translate: TranslateService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
  }

  itemSub: Subscription;
  ngOnInit() {
    let itemId = this.el.nativeElement.id;
    // console.log('item id: ' + itemId);
  }

  /** keyup event used to listen to changes when user move his hand from keyboard */

  @HostListener('keyup', ['$event']) onKeyup(event) {
    let ele = this.document.getElementsByName(this.errorMsgId);
    let itemId = this.formControl.name;
    /** check if formControl has any error or invalid */
    if (this.formControl && this.formControl.invalid) {
      /** create error item that will contain the error message */
      this.document.getElementById(this.errorMsgId).innerHTML = '';
      this.document.getElementById(
        this.errorMsgId
      ).innerHTML = this.getMessageFromArray(
        Object.keys(this.formControl.errors)[0]
      );
      /** add red border on error */
      this.render.setStyle(this.el.nativeElement, 'border', '1px solid red');
    } else {
      /** remove error item is there are no errors */
      this.document.getElementById(this.errorMsgId).innerHTML = '';
      /** remove red border if thre is no errors */
      this.render.removeStyle(this.el.nativeElement, 'border');
    }

    // #########################################################################
    // #########################################################################
    ////////// << when language change  >> /////////
    this.translationSubscription = this.translate.onDefaultLangChange.subscribe(
      (data) => {
        if (this.formControl && this.formControl.invalid) {
          /** create error item that will contain the error message */
          this.document.getElementById(this.errorMsgId).innerHTML = '';
          this.document.getElementById(
            this.errorMsgId
          ).innerHTML = this.getMessageFromArray(
            Object.keys(this.formControl.errors)[0]
          );
          /** add red border on error */
          this.render.setStyle(
            this.el.nativeElement,
            'border',
            '1px solid red'
          );
        } else {
          let ele = this.document.getElementsByName(this.errorMsgId);

          if (ele.length !== 0) {
            /** remove error item is there are no errors */
            this.document.getElementById(this.errorMsgId).innerHTML = '';
            /** remove red border if thre is no errors */
            this.render.removeStyle(this.el.nativeElement, 'border');
          }
        }
      }
    );
  }

  /** this listiner and method used with inputs: [select, radio, checkbox] */
  @HostListener('change', ['$event']) onChange(event) {
    ConsoleService.warning('change event fireing');
    console.log(this.formControl.errors);

    let ele = this.document.getElementsByName(this.errorMsgId);
    // console.log("span element id name: " + this.errorMsgId);
    let itemId = this.formControl.name;
    if (this.formControl && this.formControl.invalid) {
      this.document.getElementById(this.errorMsgId).innerHTML = '';
      this.document.getElementById(
        this.errorMsgId
      ).innerHTML = this.getMessageFromArray(
        Object.keys(this.formControl.errors)[0]
      );
      this.render.setStyle(this.el.nativeElement, 'border', '1px solid red');
      // console.log(
      //   this.getMessageFromArray(Object.keys(this.formControl.errors)[0])
      // );
    } else {
      /** remove error item is there are no errors */
      this.document.getElementById(this.errorMsgId).innerHTML = '';
      this.render.removeStyle(this.el.nativeElement, 'border');
    }

    ////////// << when language change  >> /////////
    this.translationSubscription = this.translate.onDefaultLangChange.subscribe(
      (data) => {
        if (this.formControl && this.formControl.invalid) {
          /** create error item that will contain the error message */
          this.document.getElementById(this.errorMsgId).innerHTML = '';
          this.document.getElementById(
            this.errorMsgId
          ).innerHTML = this.getMessageFromArray(
            Object.keys(this.formControl.errors)[0]
          );
          /** add red border on error */
          this.render.setStyle(
            this.el.nativeElement,
            'border',
            '1px solid red'
          );
        } else {
          let ele = this.document.getElementsByName(this.errorMsgId);

          if (ele.length !== 0) {
            /** remove error item is there are no errors */
            this.document.getElementById(this.errorMsgId).innerHTML = '';
            /** remove red border if thre is no errors */
            this.render.removeStyle(this.el.nativeElement, 'border');
          }
        }
      }
    );
  }
  /** this listiner and method used with inputs: [select, radio, checkbox] */
  @HostListener('click', ['$event']) onClick(event) {
    ConsoleService.warning('click event firing');

    if (this.formControl.invalid) {
      this.document.getElementById(this.errorMsgId).innerHTML = '';
      this.document.getElementById(
        this.errorMsgId
      ).innerHTML = this.getMessageFromArray(
        Object.keys(this.formControl.errors)[0]
      );
      this.render.setStyle(this.el.nativeElement, 'border', '1px solid red');
    } else {
      /** remove error item is there are no errors */
      this.document.getElementById(this.errorMsgId).innerHTML = '';
      this.render.removeStyle(this.el.nativeElement, 'border');
    }

    ////////// << when language change  >> /////////
    this.translationSubscription = this.translate.onDefaultLangChange.subscribe(
      (data) => {
        if (this.formControl && this.formControl.invalid) {
          /** create error item that will contain the error message */
          this.document.getElementById(this.errorMsgId).innerHTML = '';
          this.document.getElementById(
            this.errorMsgId
          ).innerHTML = this.getMessageFromArray(
            Object.keys(this.formControl.errors)[0]
          );
          /** add red border on error */
          this.render.setStyle(
            this.el.nativeElement,
            'border',
            '1px solid red'
          );
        } else {
          let ele = this.document.getElementsByName(this.errorMsgId);

          if (ele.length !== 0) {
            /** remove error item is there are no errors */
            this.document.getElementById(this.errorMsgId).innerHTML = '';
            /** remove red border if thre is no errors */
            this.render.removeStyle(this.el.nativeElement, 'border');
          }
        }
      }
    );
  }

  /**
   * focus in event used to listen to changes when user focus into item
   * and show message or do any action
   */
  @HostListener('focusin', ['$event']) onFocusIn(event) {
    ConsoleService.warning('focusin event firing');
    this.errorMsgId = 'errorMsg_' + this.formControl.name;

    /** check if error message element is found or not */
    if (!this.document.getElementById(this.errorMsgId)) {
      this.el.nativeElement.insertAdjacentHTML(
        'afterend',
        `<span class="app-global-text-error"  id="${this.errorMsgId}"></span>`
      );
    }

    if (this.formControl && this.formControl.invalid) {
      this.document.getElementById(this.errorMsgId).innerHTML = '';
      if (this.formControl.errors) {
        this.document.getElementById(
          this.errorMsgId
        ).innerHTML = this.getMessageFromArray(
          Object.keys(this.formControl.errors)[0]
        );
      }
      this.render.setStyle(this.el.nativeElement, 'border', '1px solid red');
    } else {
      /** remove error item is there are no errors */
      this.document.getElementById(this.errorMsgId).innerHTML = '';
      this.render.removeStyle(this.el.nativeElement, 'border');
    }

    ////////// << when language change  >> /////////
    this.translationSubscription = this.translate.onDefaultLangChange.subscribe(
      (data) => {
        let ele = this.document.getElementsByName(this.errorMsgId);

        if (this.formControl && this.formControl.invalid) {
          /** create error item that will contain the error message */
          if (this.document.getElementById(this.errorMsgId)) {
            this.document.getElementById(this.errorMsgId).innerHTML = '';
            this.document.getElementById(
              this.errorMsgId
            ).innerHTML = this.getMessageFromArray(
              Object.keys(this.formControl.errors)[0]
            );
          }

          /** add red border on error */
          this.render.setStyle(
            this.el.nativeElement,
            'border',
            '1px solid red'
          );
        } else {
          let ele = this.document.getElementsByName(this.errorMsgId);

          if (ele.length !== 0) {
            /** remove error item is there are no errors */
            this.document.getElementById(this.errorMsgId).innerHTML = '';
            /** remove red border if thre is no errors */
            this.render.removeStyle(this.el.nativeElement, 'border');
          }
        }
      }
    );
  }

  @HostListener('focusout', ['$event']) onFocusOut(event) {
    console.log('error msg id: ' + this.errorMsgId);
    ConsoleService.warning('focusout event firing');
    if (
      this.formControl &&
      this.formControl.invalid &&
      (this.formControl.touched || this.formControl.dirty)
    ) {
      this.render.setStyle(this.el.nativeElement, 'border', '1px solid red');
      console.log('item still have errors');
    } else {
      this.document.getElementById(this.errorMsgId).remove();
      this.render.removeStyle(this.el.nativeElement, 'border');
    }
    let ele = this.document.getElementsByName(this.errorMsgId);
    // console.log("element i value: " + ele);

    if (this.itemSub) this.itemSub.unsubscribe();
    if (this.translationSubscription)
      this.translationSubscription.unsubscribe();
    // console.log("on focus  out event");
    // console.log(this.formControl);
  }

  ////////////// << methods >> //
  errorWithTrans;
  getMessageFromArray(errorName: string) {
    /** pass error name with item name as a parameter */
    // console.log(this.formControl.errors);
    let error = this.formControl?.errors;
    let translationPath = `${this.translationPrefix}${this.formControl.name}.${errorName}`;

    /** if user add the translation prefix path  */
    if (this.translationPrefix) {
      this.errorWithTrans = this.translate.instant(translationPath, {
        itemName: this.formControl.name,
        compareField: this.compareField ? this.compareField : null,
        val1: this.val1 ? this.val1 : null,
        val2: this.val2 ? this.val2 : null,
      });

      /** change translation message language when langiage change */
      this.translate.onLangChange.subscribe((data) => {
        this.errorWithTrans = '';
        let errorWithTrans = this.translate.instant(translationPath, {
          itemName: this.formControl.name,
          compareField: this.compareField ? this.compareField : null,
          val1: this.val1 ? this.val1 : null,
          val2: this.val2 ? this.val2 : null,
        });
      });
    } else {
      let translationPath = this.validationDeafultPrefix + errorName;

      this.errorWithTrans = this.translate.instant(translationPath, {
        itemName: this.formControl.name,
        compareField: this.compareField ? this.compareField : null,
        val1: this.val1 ? this.val1 : null,
        val2: this.val2 ? this.val2 : null,
      });

      /** change translation message language when langiage change */
      this.translate.onLangChange.subscribe((data) => {
        this.errorWithTrans = '';
        let errorWithTrans = this.translate.instant(translationPath, {
          itemName: this.formControl.name,
          compareField: this.compareField ? this.compareField : null,
          val1: this.val1 ? this.val1 : null,
          val2: this.val2 ? this.val2 : null,
        });
      });
    }

    return this.errorWithTrans;
  }

  addOrRemoceClass(parent: HTMLElement) {
    if (this.formControl.errors) {
      parent.classList.add('error-border');
    } else {
      parent.classList.remove('error-border');
    }
  }

  ///////////////////////

  validationWithTranslationPrefix(translationPrefix: string) {
    /** if developer or user pass value to translation prefix Input */
    let controlName = this.formControl.name;
    /** get first error if found in the errors object */
    let errorName = this.formControl?.errors[0];
    if (translationPrefix) {
    }
  }
}
