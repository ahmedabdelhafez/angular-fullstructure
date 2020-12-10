import { DOCUMENT } from "@angular/common";
import {
  Component,
  ElementRef,
  forwardRef,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "app-input-item",
  templateUrl: "./input-item.component.html",
  styleUrls: ["./input-item.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputItemComponent),
      multi: true,
    },
  ],
})
export class InputItemComponent
  implements OnInit, OnChanges, ControlValueAccessor {
  /** input label */
  @Input("labelText") labelText: string = "";
  /** type f the input `text` or `number` */
  @Input("inputType") inputType: "text" | "number" = "text";
  /** html input name */
  @Input("itemName") itemName: string = "";
  /** html input id */
  @Input("itemId") itemId: string = "";
  /** text if the input dosn't have any data */
  @Input("placeholder") placeholder: string = "";
  /** if true enable edit in item else disable edit or read only */
  @Input("disabled") disabled: boolean;
  @Input("numberhaveSpinner") numberhaveSpinner: boolean = true;
  value: any = "";

  constructor(
    private el: ElementRef<HTMLInputElement>,
    private render: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.numberhaveSpinner) {
      this.document.getElementById(this.itemId).style.webkitAppearance = "none";
    } else {
      this.document.getElementById(this.itemId).style.webkitAppearance = "";
    }
  }

  writeValue(value: any): void {
    if (this.inputType === "number") {
      this.value = value;
    } else if (this.inputType === "text") {
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
