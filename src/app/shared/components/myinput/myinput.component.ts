import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
  EventEmitter,
  ElementRef,
  HostBinding,
  Optional,
  Self,
} from "@angular/core";
import {
  FormGroup,
  NgControl,
  FormBuilder,
  ControlValueAccessor,
  Validators,
} from "@angular/forms";
import { myInput } from "./MyInput.class";
import { MatFormFieldControl } from "@angular/material";
import { Observable, Subject } from "rxjs";
import { FocusMonitor } from "@angular/cdk/a11y";
import { coerceBooleanProperty } from "@angular/cdk/coercion";

@Component({
  selector: "app-myinput",
  templateUrl: "./myinput.component.html",
  styleUrls: ["./myinput.component.scss"],
  providers: [{ provide: MatFormFieldControl, useExisting: MyinputComponent }],
  host: {
    "[class.example-floating]": "shouldLabelFloat",
    "[id]": "id",
    "[attr.aria-describedby]": "describedBy",
  },
})
export class MyinputComponent
  implements
    OnInit,
    OnDestroy,
    MatFormFieldControl<myInput>,
    ControlValueAccessor {
  @Input() value: myInput | null;
  constructor(
    private fm: FocusMonitor,
    private elRef: ElementRef<HTMLElement>,
    @Optional() @Self() public ngControl: NgControl
  ) {
    fm.monitor(elRef.nativeElement, true).subscribe((origin) => {
      this.focused = !!origin;
      this.stateChanges.next();
    });
    ////////////////////////////////////////////////////////////////
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }
  static nextId = 0;
  writeValue(tel: myInput | null): void {
    this.value = tel;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  onChange = (_: any) => {};
  onTouched = () => {};
  stateChanges = new Subject<void>();
  id: string;
  // ngControl: NgControl = null;
  focused: boolean = false;
  // empty: boolean;
  shouldLabelFloat: boolean;
  // @Input() required: boolean = false;
  // disabled: boolean;
  errorState: boolean = false;
  controlType?: string = "my input";
  autofilled?: boolean;

  _required = false;

  @HostBinding("attr.aria-describedby") describedBy = "";

  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(" ");
  }
  onContainerClick(event: MouseEvent) {
    if ((event.target as Element).tagName.toLowerCase() != "input") {
      this.elRef.nativeElement.querySelector("input").focus();
    }
  }

  @Input()
  get required() {
    return this._required;
  }
  set required(req) {
    this._required = coerceBooleanProperty(req);
    this.stateChanges.next();
  }

  set stateChange(value) {
    this.stateChanges.next(value);
  }

  get empty() {
    let n = this.value;
    return !n;
  }

  @HostBinding("class.floating")
  get shouldLabelFloated() {
    return this.focused || !this.empty;
  }

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    // this._disabled ? this.parts.disable() : this.parts.enable();
    this.stateChanges.next();
  }
  private _disabled = false;

  @Input()
  get placeholder(): string {
    return this._placeholder;
  }
  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }
  private _placeholder: string;

  ngOnInit() {}

  ngOnDestroy() {
    this.fm.stopMonitoring(this.elRef.nativeElement);
    this.stateChanges.complete();
  }
}
