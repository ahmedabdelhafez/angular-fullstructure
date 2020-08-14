import { Component, OnInit, Inject } from "@angular/core";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { FormOperation } from "src/app/core/model/FormOperation.iterface";
import {
  RxwebValidators,
  NumericValueType,
  RxFormBuilder,
  RxFormGroup,
  ResetFormType,
} from "@rxweb/reactive-form-validators";
import { CanComponentDeactivate } from "../../core/security/guard/candeactivate.guard";
import { Observable, of } from "rxjs";
import { UsersForm, AddressForm } from "../../shared/forms-models/users.class";
import { HttpCall } from "src/app/services/HttpCall.service";
import {
  distinctUntilChanged,
  debounceTime,
  switchMap,
  tap,
  concatMap,
  mergeMap,
  exhaustMap,
  mergeAll,
} from "rxjs/operators";
import { isArray } from 'jquery';
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

  constructor(
    private fb: FormBuilder,
    private formBuilder: RxFormBuilder,
    private http: HttpCall
  ) {}

  empForm: FormGroup;

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (
      this.empForm.get("username").errors ||
      this.empForm.get("email").errors
    ) {
      return confirm("Your changes are unsaved!! Do you like to exit");
    }
    return true;
  }
  postId = new FormControl('1');
  ngOnInit(): void {
    let userForm = new UsersForm();
    userForm.address = new AddressForm();
    // this.createForm();
    this.empForm = this.formBuilder.formGroup(userForm);

    this.getdataFromServer();
  }

  createForm() {
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

      console.log(data);
    }
  }
  resetForm<T>(formInstance?: FormGroup) {
    formInstance.reset();
    // this.empForm.resetForm({ resetType: ResetFormType.ControlsOnly });
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

  bookForm: FormGroup = this.fb.group({
    postId: this.postId,
  });
  getdataFromServer() {
    this.postId.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        concatMap((postid) => {
          if (!postid) {
            return of([]);
          } else {
            console.log("changes id: ", postid);

            return this.http.getOne("/posts", postid);
          }
        })
      )
      .subscribe(
        (data) => {
          if (isArray(data) && data.length === 0) {
            console.log("no data");
          }else{
            console.log(data);
          }
        },
        (err) => {
          console.log("an erro here");
        }
      );
  }
}
