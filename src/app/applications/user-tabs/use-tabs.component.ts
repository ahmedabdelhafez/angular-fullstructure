import { Component, OnInit, Inject } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { FormOperation } from "src/app/core/model/FormOperation.iterface";
import {
  RxwebValidators,
  NumericValueType,
  RxFormBuilder,
  RxFormGroup,
  ResetFormType,
} from "@rxweb/reactive-form-validators";
import { CanComponentDeactivate } from "../../core/security/guard/candeactivate.guard";
import { Observable } from "rxjs";
import { UsersForm } from "../../shared/forms-models/users.class";
@Component({
  selector: "app-use-tabs",
  templateUrl: "./use-tabs.component.html",
  styleUrls: ["./use-tabs.component.scss"],
})
export class UseTabsComponent
  implements OnInit, FormOperation, CanComponentDeactivate {
  userTranslatePrifix = "";
  userInputTranslate = "PAGES.PAGE-INPUTS.";
  navLinks = [
    {
      label: "Add",
      link: "./create",
      index: 0,
    },
    {
      label: "Edit",
      link: "./edit",
      index: 1,
    },
    {
      label: "List",
      link: "./list",
      index: 2,
    },
  ];

  constructor(private fb: FormBuilder, private formBuilder: RxFormBuilder) {}
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (
      this.empForm.get("username").invalid ||
      this.empForm.get("email").invalid
    ) {
      return confirm("Your changes are unsaved!! Do you like to exit");
    }
    return true;
  }
  ngOnInit(): void {
    // this.createForm();
    this.empForm = <RxFormGroup>this.formBuilder.formGroup(UsersForm);
  }

  createForm<T>() {
    // this.empForm = this.fb.group({
    //   empid: [
    //     "",
    //     [
    //       RxwebValidators.required({
    //         messageKey: "required",
    //         message: "this field is required",
    //       }),
    //       RxwebValidators.numeric({
    //         allowDecimal: false,
    //         message: "this field must be contain number only",
    //       }),
    //     ],
    //   ],
    //   username: [
    //     "",
    //     [
    //       RxwebValidators.alpha({
    //         message: "this fiels mst be arabic",
    //       }),
    //       RxwebValidators.required({
    //         message: "this field is required",
    //         messageKey: "required",
    //       }),
    //     ],
    //   ],
    //   salary: [
    //     "",
    //     RxwebValidators.numeric({
    //       allowDecimal: true,
    //       acceptValue: NumericValueType.PositiveNumber,
    //       message: "salary must be Numeric only",
    //     }),
    //   ],
    //   email: [
    //     "",
    //     [
    //       RxwebValidators.email({
    //         disableExpression: (x) => (x.salary as number) > 2000,
    //       }),
    //     ],
    //   ],
    //   password: [""],
    //   confirmPassword: [
    //     "",
    //     [
    //       RxwebValidators.compare({
    //         fieldName: "password",
    //         message: "password not matched",
    //       }),
    //     ],
    //   ],
    // });
  }

  saveForm<T>(formInstance?: FormGroup) {
    if (formInstance.invalid) {
      console.log("please complete the form");
    } else {
      let data = formInstance.getRawValue();

      let formdata = this.empForm.toFormData();
      console.log(formdata);

      console.log(data);
    }
  }
  resetForm<T>(formInstance?: FormGroup) {
    formInstance.reset();
    this.empForm.resetForm({ resetType: ResetFormType.ControlsOnly });
  }
  updateData<T>(updateObject: T, id?: T) {
    throw new Error("Method not implemented.");
  }
  deleteData<T>(deleteObject: T, id?: T) {
    throw new Error("Method not implemented.");
  }
  getFormValues<T>(formInstance?: FormGroup) {
    throw new Error("Method not implemented.");
  }
  empForm: RxFormGroup;
}
