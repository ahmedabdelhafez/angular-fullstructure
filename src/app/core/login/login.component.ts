import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgxIndexedDBService } from "ngx-indexed-db";
import {
  slideInLeftAnimation,
  slideInLeftOnEnterAnimation,
  fadeOutRightAnimation,
  fadeOutRightOnLeaveAnimation,
} from "angular-animations";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  animations: [],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private dbService: NgxIndexedDBService) {}

  ngOnInit() {}

  goHome() {
    this.router.navigate(["/testprint"]);
    this.dbService
      .add("people", { name: "ahmed fezo", email: "messi10010@gmail.com" })
      .then(
        () => {
          // Do something after the value was added
          console.log("data added well");
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
