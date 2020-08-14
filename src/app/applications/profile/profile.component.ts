import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CustomValidation } from "src/app/shared/validator/CustomValidation";
import { trigger, transition, useAnimation } from "@angular/animations";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
  animations: [],
})
export class ProfileComponent implements OnInit {
  fadeInAnimation: any;
  slideInLeftAnim: any;
  myform: FormGroup;
  city: string[] = ["Egypt", "Italy", "France", "Germany", "Canada"];

  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.myform = this.fb.group({
      fname: ["", [Validators.required, Validators.minLength(5)]],
      lname: ["", [Validators.required, Validators.minLength(5)]],
      salary: ["", [Validators.required]],
      comm: [null],
      status: [],
      city: [],
      age: ["", [CustomValidation.isBetween(18, 50)]],
    });
  }

  saveForm() {
    let salary: number = this.myform.get("salary").value as number;
    let comm = this.myform.get("comm").value;
    console.log("Comm Value: " + comm);

    if (comm === null || comm === 0) {
      // this.myform.get('comm').patchValue(50);
      this.myform.get("comm").setValidators(Validators.required);
      this.myform.get("comm").updateValueAndValidity({ onlySelf: true });
      return;
    } else {
      this.myform.get("comm").clearValidators();
      this.myform.get("comm").updateValueAndValidity({ onlySelf: true });
    }
    console.log(this.myform.value);
  }

  removeValidation() {
    this.myform.clearValidators();
  }

  onkeyAction(event) {
    console.log(event);
  }
}
