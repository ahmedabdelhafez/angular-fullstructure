import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, NgControl } from "@angular/forms";
import { MatFormFieldControl } from "@angular/material/form-field";
import { Observable } from "rxjs";

interface CustomerName {
  firstName: string;
  lastName: string;
}

@Component({
  selector: "app-phone-input",
  templateUrl: "./phone-input.component.html",
  styleUrls: ["./phone-input.component.scss"],
  providers: [
    { provide: MatFormFieldControl, useExisting: PhoneInputComponent },
  ],
})
export class PhoneInputComponent implements MatFormFieldControl<CustomerName> {
  customerForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.customerForm = this.fb.group({
      firstName: [""],
      lastName: [""],
    });
  }
  value: CustomerName;
  stateChanges: Observable<void>;
  id: string;
  placeholder: string;
  ngControl: NgControl;
  focused: boolean;
  empty: boolean;
  shouldLabelFloat: boolean;
  required: boolean;
  disabled: boolean;
  errorState: boolean;
  controlType?: string;
  autofilled?: boolean;
  setDescribedByIds(ids: string[]): void {
    throw new Error("Method not implemented.");
  }
  onContainerClick(event: MouseEvent): void {
    throw new Error("Method not implemented.");
  }
}
