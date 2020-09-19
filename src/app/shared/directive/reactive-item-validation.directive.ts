import {
  Directive,
  ElementRef,
  HostListener,
  Renderer2,
  Inject,
  OnInit,
  Self,
  Optional,
} from "@angular/core";
import { NgControl } from "@angular/forms";
import { DOCUMENT } from "@angular/common";
import { Subscription } from "rxjs";
import { TranslateService } from "@ngx-translate/core";

@Directive({
  selector: "[reactiveitemvalidation]",
  // host: {
  //   '(input)': 'onEvent($event)',
  // },
})
export class ReactiveitemvalidationDirective implements OnInit {
  errorMsgTag: string;
  errorMsgId: string | any;
  errorMsg: string;

  /**
   * @description this is map data structure of all availabel or added errors in app
   * to speed validation and write less code and allow translation
   * developer must create an objet in `i18n` to add translation for defined erros with pretty and clean names
   * objectName = VALIDATION-MESSAGES
   */
  errorMessages: Map<string, string> = new Map<string, string>([
    ["required", "VALIDATION-MESSAGES.required"],
    ["maxLength", "VALIDATION-MESSAGES.maxLength"],
    ["minLength", "VALIDATION-MESSAGES.minLength"],
    ["maxlength", "VALIDATION-MESSAGES.maxLength"],
    ["minlength", "VALIDATION-MESSAGES.minLength"],
    ["alpha", "VALIDATION-MESSAGES.alpha"],
    ["email", "VALIDATION-MESSAGES.email"],
    ["numeric", "VALIDATION-MESSAGES.numeric"],
    ["contains", "VALIDATION-MESSAGES.contains"],
    ["range", "VALIDATION-MESSAGES.range"],
    ["compare", "VALIDATION-MESSAGES.compare"],
    ["lessthan", "VALIDATION-MESSAGES.lessthan"],
    ["greaterthan", "VALIDATION-MESSAGES.greaterthan"],
  ]);
  validationErrorNames = [
    "required",
    "alpha",
    "numeric",
    "email",
    "maxLength",
    "minLength",
    "contains",
    "range",
    "compare",
  ];

  constructor(
    private el: ElementRef<HTMLElement>,
    private render: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    @Self() @Optional() private formControl: NgControl,
    private translate: TranslateService
  ) {}

  itemSub: Subscription;
  ngOnInit() {
    let itemId = this.el.nativeElement.id;
    console.log("item id: " + itemId);
  }

  @HostListener("keyup", ["$event"]) onKeyup(event) {
    let ele = this.document.getElementsByName(this.errorMsgId);
    // console.log("span element id name: " + this.errorMsgId);
    let itemId = this.formControl.name;
    if (
      this.formControl.invalid &&
      (this.formControl.touched || this.formControl.dirty)
    ) {
      this.document.getElementById(this.errorMsgId).innerHTML = "";
      this.document.getElementById(
        this.errorMsgId
      ).innerHTML = this.getMessageFromArray(
        Object.keys(this.formControl.errors)[0]
      );
      // console.log(
      //   this.getMessageFromArray(Object.keys(this.formControl.errors)[0])
      // );
    } else {
      /** remove error item is there are no errors */
      this.document.getElementById(this.errorMsgId).innerHTML = "";
    }
    // let parent = this.document
    //   .getElementById(itemId)
    //   .closest("div") as HTMLElement;
    // let firstErrorKey = null;
    // if (this.formControl.errors) {
    //   // get first error from object array keys
    //   firstErrorKey = Object.keys(this.formControl?.errors)[0];
    //   console.log("furst erro key: " + firstErrorKey);
    // }
  }

  /** this listiner and method used with inputs: [select, radio, checkbox] */
  @HostListener("change", ["$event"]) onChange(event) {
    let ele = this.document.getElementsByName(this.errorMsgId);
    // console.log("span element id name: " + this.errorMsgId);
    let itemId = this.formControl.name;
    if (
      this.formControl.invalid &&
      (this.formControl.touched || this.formControl.dirty)
    ) {
      this.document.getElementById(this.errorMsgId).innerHTML = "";
      this.document.getElementById(
        this.errorMsgId
      ).innerHTML = this.getMessageFromArray(
        Object.keys(this.formControl.errors)[0]
      );
      // console.log(
      //   this.getMessageFromArray(Object.keys(this.formControl.errors)[0])
      // );
    } else {
      /** remove error item is there are no errors */
      this.document.getElementById(this.errorMsgId).innerHTML = "";
    }
    // let parent = this.document
    //   .getElementById(itemId)
    //   .closest("div") as HTMLElement;
    // let firstErrorKey = null;
    // if (this.formControl.errors) {
    //   // get first error from object array keys
    //   firstErrorKey = Object.keys(this.formControl?.errors)[0];
    //   console.log("furst erro key: " + firstErrorKey);
    // }
  }

  @HostListener("focusin", ["$event"]) onFocusIn(event) {
    let itemName = this.formControl.name;
    this.errorMsgId = "errorMsg_" + this.formControl.name;
    // console.log("Current span element id: " + this.errorMsgId);

    /** chec if error message element is found or not */
    if (!this.document.getElementById(this.errorMsgId)) {
      this.el.nativeElement.insertAdjacentHTML(
        "afterend",
        `<mat-error class="error-text-item"  id="${this.errorMsgId}"></mat-error>`
      );
    }
  }

  @HostListener("focusout", ["$event"]) onFocusOut(event) {
    console.log("error msg id: " + this.errorMsgId);

    if (
      this.formControl.invalid &&
      (this.formControl.touched || this.formControl.dirty)
    ) {
      console.log("item still have errors");
    } else {
      this.document.getElementById(this.errorMsgId).remove();
    }
    let ele = this.document.getElementsByName(this.errorMsgId);
    // console.log("element i value: " + ele);

    if (this.itemSub) this.itemSub.unsubscribe();
    // console.log("on focus  out event");
    // console.log(this.formControl);
  }

  ////////////// << methods >> //

  getMessageFromArray(errorName: string) {
    let errorWithTrans = this.translate.instant(
      this.errorMessages.get(errorName),
      { itemName: this.formControl.name }
    );
    // console.log(errorName);
    // console.log("errorName is: " + errorWithTrans);
    return errorWithTrans;
  }

  addOrRemoceClass(parent: HTMLElement) {
    if (this.formControl.errors) {
      parent.classList.add("error-border");
    } else {
      parent.classList.remove("error-border");
    }
  }
}
