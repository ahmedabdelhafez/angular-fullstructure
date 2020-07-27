import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2,
  AfterViewInit,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CustomValidation } from "src/app/shared/validator/CustomValidation";
import { Router } from "@angular/router";
import {
  trigger,
  state,
  animate,
  style,
  transition,
  query,
  group,
} from "@angular/animations";
import { HttpCall } from "src/app/services/HttpCall.service";
import { AppAlert } from "src/app/shared/util/AppAlert";
import Swal from "sweetalert2";
import * as customAnimation from "../../animations/CustomAnimation";
declare var $: any;

@Component({
  selector: "app-testprint",
  templateUrl: "./testprint.component.html",
  styleUrls: ["./testprint.component.scss"],
  animations: [
    trigger("showhide", [
      transition("* => animateMe", [
        // hide the inner elements
        query("h1 span img", style({ opacity: 0 })),
        group([
          // animate the inner elements in, one by one
          query("h1 span img", animate("1s 100ms ease", style({ opacity: 1 }))),
          query(
            "h1 span img",
            animate(
              "1s ease",
              style({ transform: "rotate(360deg) scale(1.2)" })
            )
          ),
        ]),
        // query(
        //   ".content",
        //   animate(
        //     "2s ease-in-out",
        //     style({ opacity: 1, transform: "rotate(180deg)" })
        //   )
        // )
      ]),
    ]),
    customAnimation.rotateIcon,
  ],
})
export class TestprintComponent implements OnInit, AfterViewInit {
  iconState = "up";
  flexGap = 10;

  @ViewChild("flexContainer", { static: true }) flexContainer: ElementRef<
    HTMLElement
  >;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private httpCall: HttpCall,
    private render: Renderer2
  ) {}

  rotateIcon() {
    this.iconState === "up"
      ? (this.iconState = "down")
      : (this.iconState = "up");
    console.log(this.iconState);
  }

  ngOnInit() {
    this.createForm();
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

  onAnimationDone(event) {
    // console.log(event);
    this.state2 = "animateMe";
    this.state = "";
    setTimeout(() => {
      this.state = "animateMe";
    }, 500);
  }

  ngAfterViewInit() {
    let items = this.flexContainer.nativeElement;
    console.log("flex childerdn count: " + items);
  }
}
