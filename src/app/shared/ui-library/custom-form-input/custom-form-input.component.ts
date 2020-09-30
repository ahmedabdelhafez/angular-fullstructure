import {
  Component,
  OnInit,
  forwardRef,
  OnChanges,
  SimpleChanges,
  HostListener,
  Input,
  Self,
  Optional,
} from "@angular/core";
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  NgControl,
} from "@angular/forms";
import { Subject } from "rxjs";

@Component({
  selector: "app-custom-form-input",
  templateUrl: "./custom-form-input.component.html",
  styleUrls: ["./custom-form-input.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomFormInputComponent),
      multi: true,
    },
  ],
  
})
export class CustomFormInputComponent implements OnInit, ControlValueAccessor {
  constructor() {}

  /** placeholder text for our custom input */
  @Input("placeholder") placeholder: string = "";
  @Input("disable") disabled: boolean;
  @Input("label") label: string;
  /** value for html `id` property */
  @Input("id") id: string;
  /** value for html `name` property */
  @Input("name") name: string;
  /** type of input avilable types are `txt, email, password` */
  @Input() type: "text" | "email" | "password" | "number" = "text";

  value: any = "";
  ngOnInit() {}

  /////////////////////////

  writeValue(value: any): void {
    if (this.type === "number") {
      this.value = value;
    } else if (this.type === "text") {
      this.value = value as string;
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  //////////
  onChange(e?) {}
  onTouched() {}
}
