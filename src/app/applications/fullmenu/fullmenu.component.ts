import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  AfterContentChecked,
  NgZone,
} from "@angular/core";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { FormBuilder } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { HttpCall } from "src/app/services/HttpCall.service";

import {
  trigger,
  transition,
  style,
  animate,
  query,
} from "@angular/animations";
import { CdkStepper } from "@angular/cdk/stepper";
import { of } from "rxjs";
import { mergeMap, map, tap } from "rxjs/operators";
import { Router } from "@angular/router";

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: "app-fullmenu",
  templateUrl: "./fullmenu.component.html",
  styleUrls: ["./fullmenu.component.scss"],
  animations: [
    trigger("showhide", [
      transition(":enter", [
        style({ opacity: 0 }),
        animate("0.5s 100ms ease"),
        query(".mat-card-header-text", [
          style({ color: "red" }),
          animate("0.8s 50ms ease"),
        ]),
      ]),
      transition(":leave", [
        animate("0.5s ease"),
        style({ opacity: 0, transform: "translateX(100px)" }),
      ]),
    ]),
  ],
})
export class FullmenuComponent implements OnInit, AfterViewInit {
  letters$ = of(1, 2, 3, 4, 5, 6, 7, 8, 9);
  time$ = of(1, 2, 3, 4, 5, 6, 7, 8, 9);
  @ViewChild("cdkStepper") stepper: CdkStepper;
  stepsCount: any;
  lineCount = 0;

  constructor(
    private fb: FormBuilder,
    private translateService: TranslateService,
    private httpCall: HttpCall,
    private ngZone: NgZone,
    private router: Router
  ) {}

  ngOnInit() {
    this.letters$
      .pipe(
        tap((ele) => {
          console.log(`addition of ${ele}`);
        }),
        mergeMap((ele) =>
          this.time$
            .pipe(
              map((x) => {
                let item = `Num: ${ele} * ${x} = ${ele * x}`;
                return item;
              })
            )
            .pipe()
        )
      )
      .subscribe((data) => console.log(data));
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.stepsCount = this.stepper.steps;
      console.log('number of steps: ',this.stepper.steps);
      
      this.lineCount = this.stepper.steps.length - 1;
      console.log("daat set after timer");
    }, 30);
  }

  activeStep(index: number): void {
    this.stepper.selectedIndex = index;
  }
}
