import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  Self,
  Optional,
  AfterViewInit,
} from "@angular/core";
import { FormGroup, NgControl } from "@angular/forms";

@Component({
  selector: "app-error-validation",
  templateUrl: "./error-validation.component.html",
  styleUrls: ["./error-validation.component.scss"],
})
export class ErrorValidationComponent
  implements OnInit, OnChanges, AfterViewInit {
  /**
   * @description current used FormGroup instance name
   * @type `FormGroup`
   */
  @Input("formInstance") formInstance: FormGroup;
  /**
   * @description name of the  `formControlName` to validate it
   * @type string
   */
  @Input("controlName") controlName: string;
  /** @description an array of validations that you want to validate such as `required`, `maxlength` @type string[] */
  @Input("validateErrors") validateErrors: string[];
  /** @description `optional` if it provided it is used is the form have nested controls @type string*/
  @Input("nestedGroupName") nestedGroupName: string = null;
  /** @description the path to formControlname translation in `i18n` files  @type 'string' */
  @Input("errorsTranslatePrefix") errorTranslatePrefix: string = null;
  /** an object to pass data to translation if validation type is range
   * `rangeFromTo` must have this signature {val1:'',val2:''}
   *
   */
  @Input("rangeFromTo") rangeFromTo = null;
  /** the input must used with `compare` to pass the control name that compared with selected property or field
   */
  @Input("compareField") compareField: string = null;

  controls: string = "";
  /**
   * @description this is map data structure of all availabel or added errors in app
   * to speed validation and write less code and allow translation
   * developer must create an objet in `i18n` to add translation for defined erros with pretty and clean names
   * objectName = VALIDATION-MESSAGES
   */
  errorMessages: Map<string, string> = new Map<string, string>([
    ["required", "VALIDATION-MESSAGES.required"],
    ["maxlength", "VALIDATION-MESSAGES.maxlength"],
    ["maxLength", "VALIDATION-MESSAGES.maxLength"],
    ["minlength", "VALIDATION-MESSAGES.minlength"],
    ["minLength", "VALIDATION-MESSAGES.minLength"],
    ["alpha", "VALIDATION-MESSAGES.alpha"],
    ["email", "VALIDATION-MESSAGES.email"],
    ["numeric", "VALIDATION-MESSAGES.numeric"],
    ["contains", "VALIDATION-MESSAGES.contains"],
    ["range", "VALIDATION-MESSAGES.range"],
    ["compare", "VALIDATION-MESSAGES.compare"],
    ["password", "VALIDATION-MESSAGES.password"],
  ]);
  allFormValidationErrors = [
    "required",
    "minlength",
    "maxlength",
    "minLength",
    "maxLength",
    "alpha",
    "numeric",
    "email",
    "contains",
    "range",
    "compare",
    "password",
  ];

  constructor(@Self() @Optional() private formControlInstance: NgControl) {}
  firstErrorName;
  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.currFormControl.errors);
    /** append nested group name to the form control id there ara an nested group */
    if (this.nestedGroupName) {
      this.controls = `${this.nestedGroupName}.${this.controlName}`;
      console.log(this.controls);
    } else {
      this.controls = `${this.controlName}`;
    }

    /** append [dot] to error translation variable if it h */
    if (!this.errorTranslatePrefix) {
      this.errorTranslatePrefix = "appcontrols.";
    } else if (!this.errorTranslatePrefix.endsWith(".")) {
      this.errorTranslatePrefix + ".";
    }
  }

  ngOnInit() {
    this.formInstance.get(this.controls).valueChanges.subscribe((data) => {
      if (this.formInstance.get(this.controls).errors) {
        this.firstErrorName = Object.keys(
          this.formInstance.get(this.controls)?.errors
        )[0];
        console.log("first erro only: " + this.firstErrorName);
      }
    });
  }

  ngAfterViewInit(): void {}
}
