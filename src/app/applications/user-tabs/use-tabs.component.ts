import { Component, OnInit, Inject } from "@angular/core";
import { FormBuilder, FormGroup, FormControl, FormArray } from "@angular/forms";
import { FormOperation } from "src/app/core/model/FormOperation.iterface";
import {
  RxwebValidators,
  NumericValueType,
  RxFormBuilder,
  RxFormGroup,
  ResetFormType,
  RxFormArray,
} from "@rxweb/reactive-form-validators";
import { CanComponentDeactivate } from "../../core/security/guard/candeactivate.guard";
import { Observable, of } from "rxjs";
import {
  UsersForm,
  AddressForm,
  Courses,
} from "../../shared/forms-models/users.class";
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
import * as _lodash from "lodash";
import { MatDialog } from "@angular/material/dialog";
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
    private formBuilder: RxFormBuilder,
    private http: HttpCall,
    private dialog: MatDialog
  ) {}

  openDialog(template: any) {
    this.dialog.open(template, {
      data: {
        title: "custom dialog title",
        template: template,
      },
      minWidth: 500,
      minHeight: 400,
    });
  }

  empForm: RxFormGroup;

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (
      this.empForm.get("username").errors ||
      this.empForm.get("email").errors
    ) {
      return confirm("Your changes are unsaved!! Do you like to exit");
    }
    return true;
  }
  postId = new FormControl("1");
  ngOnInit(): void {
    let userForm = new UsersForm();
    userForm.address = new AddressForm();
    let courses = new Courses();
    userForm.courses = new Array<Courses>();
    //<< this line add at lease one form array item when initial it >> //
    // userForm.courses.push(courses);
    // this.createForm();
    this.empForm = <RxFormGroup>this.formBuilder.formGroup(userForm);

    this.getdataFromServer();
  }

  addCourse() {
    let courses = <RxFormArray>this.empForm.controls.courses;
    courses.push(this.formBuilder.formGroup(Courses));
  }

  removeCourse(idx: number) {
    let hobbies = <RxFormArray>this.empForm.controls.courses;
    hobbies.removeAt(idx);
  }

  patchFormWithData() {
    let x = {
      empid: "1",
      username: "ahmed",
      salary: 15000,
      age: "25",
      email: "ahmed@gmail.com",
      password: "ahmed@1020",
      confirmPassword: "ahmed@1020",
      address: { city: "cairo", zipcode: "12345" },
      courses: [
        { courseId: 1, courseName: "java" },
        { courseId: 2, courseName: "html" },
      ],
    };
    this.empForm.patchValue(x);
    let arr = this.empForm.get("courses") as RxFormArray;

    x.courses.forEach((ele, idx) => {
      arr.push(this.formBuilder.group(ele));
    });
  }

  createForm(): any {
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

  saveForm(): any {
    if (this.empForm.invalid) {
      console.log("please complete the form");
    } else {
      let formdata = (this.empForm as RxFormGroup).toFormData();

      let data = (this.empForm as RxFormGroup).getRawValue();

      console.log(JSON.stringify(data));
    }
  }
  resetForm(formInstance?: FormGroup): any {
    formInstance.reset();
    // this.empForm.resetForm({ resetType: ResetFormType.ControlsOnly });
  }
  updateData(updateObject?: any, id?: any): any {
    let data = {
      empid: "11",
      username: "ahmedfezo",
      salary: "15000",
      email: "ahmed@gmail.com",
      password: "1544#$FM",
      confirmPassword: "1544#$FM",
      address: { city: "cairo#@$%", zipcode: "1541" },
    };
    this.empForm.patchValue(data, { onlySelf: false });
  }
  deleteData(deleteObject: any, id?: any): any {
    throw new Error("Method not implemented.");
  }
  getFormValues(formInstance?: FormGroup): any {
    throw new Error("Method not implemented.");
  }

  bookForm: FormGroup = this.formBuilder.group({
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
          if (_lodash.isArray(data) && data.length === 0) {
            console.log("no data");
          } else {
            console.log(data);
          }
        },
        (err) => {
          console.log("an erro here");
        }
      );
  }
}
