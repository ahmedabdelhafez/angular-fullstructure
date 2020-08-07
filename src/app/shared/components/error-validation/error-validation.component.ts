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
  @Input("formInstance") formInstance: FormGroup;
  @Input("controlName") controlName: string;
  @Input("validateErrors") validateErrors: string[];
  @Input("nestedGroupName") nestedGroupName: string = null;
  @Input("errorTranslatePrefix") errorTranslatePrefix: string = null;

  controls: string = "";
  /**
   * @description this is map data structure of all availabel or added errors in app
   * to speed validation and write less code and allow translation
   */
  errorMessages: Map<string, string> = new Map<string, string>([
    ["required", "validation.required"],
    ["maxlength", "validation.maxlength"],
    ["alpha", "validation.alpha"],
  ]);

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
