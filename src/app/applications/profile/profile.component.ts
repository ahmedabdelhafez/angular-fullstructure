import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  RxFormBuilder,
  RxFormGroup,
  RxwebValidators,
} from "@rxweb/reactive-form-validators";
import { AppAlert } from "src/app/shared/util/AppAlert";
import { CustomValidation } from "../../shared/validator/CustomValidation";
@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
  encapsulation: ViewEncapsulation.None,
  animations: [],
})
export class ProfileComponent implements OnInit {
  empsForm: FormGroup;
  countrysList = [
    { id: 1, name: "egypt" },
    { id: 2, name: "italy" },
    { id: 3, name: "france" },
    { id: 4, name: "turky" },
    { id: 5, name: "germany" },
  ];
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.empsForm = this.fb.group({
      userId: ["", [Validators.required]],
      fullnameAr: [
        "",
        [
          Validators.required,
          CustomValidation.isArabicOnly,
          Validators.maxLength(20),
        ],
      ],
      fullnameEn: [
        "",
        [
          Validators.required,
          CustomValidation.isEnglishWithSpace,
          RxwebValidators.maxLength({ value: 20 }),
        ],
      ],
    });
  }

  saveForm() {
    if (this.empsForm.invalid) {
      AppAlert.showError("please complete all form data", null, 1500);
    } else {
      console.log(this.empsForm.getRawValue());
    }
  }

  errorSummry() {
    // console.log(this.empsForm.getErrorSummary(true));
  }
}
