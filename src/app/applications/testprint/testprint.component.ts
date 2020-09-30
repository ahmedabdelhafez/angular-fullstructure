import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
} from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { tap, debounceTime } from "rxjs/operators";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "src/app/shared/components/dialog/dialog.component";
import { HttpClient } from "@angular/common/http";
import {
  parsePhoneNumberFromString,
  PhoneNumber,
  parsePhoneNumber,
  CountryCallingCode,
} from "libphonenumber-js";

@Component({
  selector: "app-testprint",
  templateUrl: "./testprint.component.html",
  styleUrls: ["./testprint.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class TestprintComponent implements OnInit, AfterViewInit {
  myForm: FormGroup;
  // phoneNumber: string;
  phoneForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private http: HttpClient
  ) {}
  async ngOnInit() {
    this.myForm = this.fb.group({
      username: ["", [Validators.required]],
      salary: [100],
    });
    //////////
    this.phoneForm = this.fb.group({
      phoneNumber: [""],
    });
  }

  ngAfterViewInit() {}

  ParsePhone() {
    const phoneNumber = parsePhoneNumberFromString(
      this.phoneForm.get("phoneNumber").value
    );
    console.log(phoneNumber);

    if (phoneNumber) {
      console.log("=--=-==--- Phone After parsing -=-=-=--=-");
      console.log("is valid phone: ", phoneNumber.isValid());
      console.log("is possible phone: ", phoneNumber.isPossible());
      console.log("Number: ", phoneNumber.number);
      console.log("national number: ", phoneNumber.nationalNumber);
      console.log("Phone URI: ", phoneNumber.getURI);
      console.log("Phone EXt: ", phoneNumber.ext);
      console.log("Country: ", phoneNumber.country);
      console.log("Country Calling: ", phoneNumber.countryCallingCode);
      console.log(phoneNumber);
    } else {
      console.log("not a valid phone");
    }
  }

  validatePhone() {
    let phonVal = this.phoneForm.get("phoneNumber").value;
    const phoneNumber = parsePhoneNumberFromString(phonVal);
    if (phoneNumber) {
      if (!phoneNumber.isValid()) {
        console.log("not a valida phone");

        this.phoneForm.get("phoneNumber").setErrors({ notPhone: true });
      } else {
        this.phoneForm.get("phoneNumber").setErrors(null);
        this.phoneForm
          .get("phoneNumber")
          .updateValueAndValidity({ onlySelf: true, emitEvent: true });
      }
    } else {
      console.log("not a valida phone");

      this.phoneForm.get("phoneNumber").setErrors({ notPhone: true });
      // this.phoneForm.get("phoneNumber").updateValueAndValidity();
    }
  }

  openModal(template: any) {
    this.dialog.open(DialogComponent, {
      id: "d1",
      width: "300px",
      disableClose: false,
      closeOnNavigation: true,
      hasBackdrop: true,
      data: {
        title: "hello ahmed",
        template: template,
      },
    });
  }

  saveForm() {
    console.log(this.myForm.value);
  }
}
