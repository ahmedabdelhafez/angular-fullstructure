import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewChild,
  ElementRef,
} from "@angular/core";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { AppAlert } from "src/app/shared/util/AppAlert";
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { HttpCall } from "src/app/services/HttpCall.service";
import { delay } from "rxjs/operators";
import {
  RxFormBuilder,
  RxwebValidators,
} from "@rxweb/reactive-form-validators";

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: "app-fullmenu",
  templateUrl: "./fullmenu.component.html",
  styleUrls: ["./fullmenu.component.scss"],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class FullmenuComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private translateService: TranslateService,
    private httpCall: HttpCall,
    private cdr: ChangeDetectorRef
  ) {}
  allCity: any = [];
  arrLenght = 0;
  employeeForm: FormGroup;
  imgFile = "../../../assets/images/slider/1.jpg";

  ngOnInit() {
    this.createForm();
    this.employeeForm.valueChanges.subscribe((data) => {
      // this.validateForm();
    });

    this.translateService.onLangChange.subscribe((data) => {
      this.employeeForm.reset({});
    });
  }

  createForm() {
    this.employeeForm = this.fb.group({
      empId: ["", [Validators.required, Validators.maxLength(8)]],
      empName: ["", [Validators.required]],
      salary: ["", [Validators.required]],
      empImage: [""],
    });
  }

  formErrors = {
    empId: "",
    empName: "",
    salary: "",
    address: {
      city: "",
      town: "",
    },
  };

  async saveForm() {
    if (this.employeeForm.invalid) {
      alert("please complete the form");
    } else {
      let val = this.employeeForm.value;
      console.log(val);
    }
  }

  uploadFile(event, formInstance: FormGroup, fileName: string = "avatar") {
    const file = (event.target as HTMLInputElement).files[0];

    // formInstance.patchValue({
    //   avatar: file,
    // });
    // formInstance.get("avatar").updateValueAndValidity();
    let obj = Object.create({});
    obj[fileName] = file;
    formInstance.get(fileName).patchValue(obj);
    formInstance.get(fileName).updateValueAndValidity();
  }

  disableFOrm() {
    if (this.employeeForm.disabled) {
      this.employeeForm.enable();
    } else {
      this.employeeForm.disable();
    }
  }

  validateForm() {
    // for (let field in this.formErrors) {
    //   console.log(field);

    // }
    Object.entries(this.formErrors).forEach((field) => {
      let objField = field[0];
      let objVal = field[1];

      this.formErrors[objField] = "";
      if (typeof objVal === "object") {
        this.validateNestedForm(objField);
      }

      /// get current input
      let formInput = this.employeeForm.get(objField);
      if (formInput.invalid || formInput.dirty) {
        for (let error in formInput.errors) {
          this.formErrors[objField] = this.translateService.instant(
            `validation.${error}`,
            {
              value: field,
            }
          );
          // console.log(trans);
          // this.formErrors[objField] = trans;
        }
      }
    });
  }

  validateNestedForm(nestedFormName: string) {
    console.log("in nested form " + nestedFormName);

    for (let nestedField in this.formErrors[nestedFormName]) {
      console.log("nested form field in object: " + nestedFormName);
      console.log(nestedField);

      this.formErrors[nestedFormName][nestedField] = "";

      /// get current input
      let input = this.employeeForm.get(nestedFormName).get(nestedField);
      console.log(input);

      if (input.invalid || input.dirty) {
        for (const error in input.errors) {
          let trans = this.translateService.instant(`validation.${error}`, {
            value: nestedField,
          });
          console.log(trans);
          this.formErrors[nestedFormName][nestedField] = trans;
        }
      }
    }
  }

  ///////
  postsData = [];
  getAllPosts() {
    this.httpCall
      .getAll<any>("/posts")
      .pipe(delay(3000))
      .subscribe((data) => {
        this.postsData = data;
        this.cdr.detectChanges();
        console.log(this.postsData);
      });
  }

  // cityAsyncValidation(): AsyncValidatorFn {
  //   return (control: AbstractControl): Observable<ValidationErrors | null> => {
  //     let val = control.value as string;
  //     return this.http
  //       .get(`http://localhost:3000/api/city/findcity/${val}`)
  //       .pipe(
  //         delay(500),
  //         distinctUntilChanged(),
  //         map((ele) => {
  //           return ele ? { cityUsed: true } : null;
  //         })
  //       );
  //   };
  // }
}
