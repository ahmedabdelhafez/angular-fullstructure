import {
  Component,
  forwardRef,
  Input,
  OnInit,
  Optional,
  Self,
} from "@angular/core";
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  NgControl,
} from "@angular/forms";

@Component({
  selector: "app-input-file",
  templateUrl: "./input-file.component.html",
  styleUrls: ["./input-file.component.scss"],
})
export class InputFileComponent implements ControlValueAccessor, OnInit {
  /** placeholder text for our custom input */
  @Input("placeholder") placeholder: string = "";
  @Input("disable") disabled: boolean;
  @Input("label") label: string;
  /** value for html `id` property */
  // @Input("id") id: string;
  /** value for html `name` property */
  // @Input("name") name: string;
  /** type of input avilable types are `txt, email, password` */
  @Input() type: "text" = "text";
  // @Input("formControl") formControl: string;

  value: any = "";
  currentControl: NgControl;
  constructor(
    @Self()
    @Optional()
    private ngControl: NgControl
  ) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
      this.currentControl = this.ngControl;
    }
  }
  ngOnInit(): void {
    console.log("current form control name");
    console.log(this.ngControl.name);
    console.log(this.ngControl);
  }

  writeValue(value: any): void {
    this.value = value;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  //////////
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onChange() {}
  onTouched() {}
}
