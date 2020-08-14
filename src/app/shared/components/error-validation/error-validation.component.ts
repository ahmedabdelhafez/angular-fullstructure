import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-error-validation",
  templateUrl: "./error-validation.component.html",
  styleUrls: ["./error-validation.component.scss"],
})
export class ErrorValidationComponent implements OnInit, OnChanges {
  /**@description current used FormGroup instance name
   * @type `FormGroup`
   *
   */
  @Input("formInstance") formInstance: FormGroup;
  /** @description name of the  `formControlName` to validate it
   * @type string
   *
   */
  @Input("controlName") controlName: string;
  /** @description an array of validations that you want to validate such as `required`, `maxlength` @type string[] */
  @Input("validateErrors") validateErrors: string[];
  /** @description `optional` if it provided it is used is the form have nested controls @type string*/
  @Input("nestedGroupName") nestedGroupName: string = null;
  /** @description the path to formControlname translation in `i18n` files  @type 'string' */
  @Input("errorsTranslatePrefix") errorTranslatePrefix: string = null;
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
    ["alpha", "VALIDATION-MESSAGES.alpha"],
    ["email", "VALIDATION-MESSAGES.email"],
    ["numeric", "VALIDATION-MESSAGES.numeric"],
    ["contains", "VALIDATION-MESSAGES.contains"],
  ]);
  validationErrorNames = ["required", "alpha", "numeric"];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.nestedGroupName) {
      this.controls = `${this.nestedGroupName}.${this.controlName}`;
      console.log(this.controls);
    } else {
      this.controls = `${this.controlName}`;
    }

    //

    if (!this.errorTranslatePrefix) {
      this.errorTranslatePrefix = "appcontrols.";
    } else if (!this.errorTranslatePrefix.endsWith(".")) {
      this.errorTranslatePrefix + ".";
    }
  }

  ngOnInit() {}
}
