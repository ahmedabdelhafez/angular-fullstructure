import { Component, OnInit, AfterViewInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CustomValidation } from "src/app/shared/validator/CustomValidation";
import { Router } from "@angular/router";

import { HttpCall } from "src/app/services/HttpCall.service";
import { AppAlert } from "src/app/shared/util/AppAlert";
import Swal from "sweetalert2";
import * as customAnimation from "../../animations/CustomAnimation";
import { NgxIndexedDBService } from "ngx-indexed-db";
import {
  fadeInOnEnterAnimation,
  fadeOutOnLeaveAnimation,
  slideInLeftOnEnterAnimation,
  slideOutLeftOnLeaveAnimation,
} from "angular-animations";
declare var $: any;

@Component({
  selector: "app-testprint",
  templateUrl: "./testprint.component.html",
  styleUrls: ["./testprint.component.scss"],
  animations: [
    customAnimation.rotateIcon,
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation(),
    slideInLeftOnEnterAnimation({
      anchor: "enter",
      duration: 1000,
      delay: 100,
    }),
    slideOutLeftOnLeaveAnimation({
      anchor: "leave",
      duration: 3000,
      delay: 250,
    }),
  ],
})
export class TestprintComponent implements OnInit, AfterViewInit {
  iconState = "up";
  state22 = true;
  hideItem() {
    if (this.state22 === false) {
      this.state22 = true;
    } else {
      this.state22 = false;
    }
  }
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private httpCall: HttpCall,
    private dbService: NgxIndexedDBService
  ) {}

  rotateIcon() {
    this.iconState === "up"
      ? (this.iconState = "down")
      : (this.iconState = "up");
    console.log(this.iconState);
  }

  async ngOnInit() {
    this.createForm();
    await this.dbService
      .getAll<any[]>("people")
      .then((data) => {
        console.table(data);
        data.forEach((e) => {
          console.log(e["email"]);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  myform: FormGroup;

  createForm() {
    this.myform = this.fb.group({
      userName: [""],
      age: [""],
      salary: [""],
    });
  }

  formdata = new FormData();
  saveForm() {
    this.formdata.append("userName", this.myform.get("userName").value);
    this.formdata.append("age", this.myform.get("age").value);
    this.formdata.append("salary", this.myform.get("salary").value);
    console.log("form after build");
    console.log(JSON.stringify(this.formdata));
  }

  onNameChange(event) {
    console.log("name event");
    console.log(event);
  }
  imageURL;
  // Image Preview
  showPreview(event) {
    const file = (event.target as HTMLInputElement).files[0];
    // this.uploadForm.patchValue({
    //   avatar: file
    // });
    // this.uploadForm.get('avatar').updateValueAndValidity()

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  getAll() {
    this.httpCall.getAll<any>("posts").subscribe((data) => {
      console.log(data);
    });
  }

  async getOne() {
    this.httpCall.getOne<any>("posts", "5").subscribe(async (data) => {
      console.log(data);
      await AppAlert.showToastError("first error", "test with await");
      await AppAlert.showToastInfo("second error");
      await AppAlert.ConfirmALert(
        "هل تريد الخروج",
        "الخروج من النظام",
        "نعم اريد",
        "كلا لا اريد"
      ).then(async (res) => {
        if (res.value) await AppAlert.showToastSuccess("ok bye bye");
        else if (res.dismiss === Swal.DismissReason.cancel)
          await AppAlert.showToastError("noooooooooooo");
      });
    });
  }
  state = "animateMe";
  state2 = "";

  ngAfterViewInit() {}
}
