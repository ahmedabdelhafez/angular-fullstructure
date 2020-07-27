import {
  Component,
  OnInit,
  Renderer2,
  ViewChild,
  ElementRef,
  AfterViewInit,
  TemplateRef,
} from "@angular/core";
import { MediaObserver } from "@angular/flex-layout";
import {
  trigger,
  state,
  style,
  transition,
  animate,
  group,
  keyframes,
  query,
  stagger,
} from "@angular/animations";
import { QUILL_CONFIG_TOKEN } from "ngx-quill";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CdkStepper } from "@angular/cdk/stepper";

@Component({
  selector: "app-material-test",
  templateUrl: "./material-test.component.html",
  styleUrls: ["./material-test.component.scss"],
  animations: [
    // trigger("addremove", [
    //   transition(":enter", [
    //     style({ transform: "translateY(-100px) ", opacity: 1 }),
    //     animate("0.6s 0.40ms ease-in"),
    //   ]),
    //   transition(":leave", [
    //     animate(
    //       "1s 0.2s ease-out",
    //       keyframes([
    //         style({ transform: "translateX(100px)", offset: 0.6 }),
    //         style({ transform: "translateY(-500px)", offset: 0.8 }),
    //       ])
    //     ),
    //     // style({
    //     //   transform: "translateY(-500px)",
    //     //   opacity: 0,
    //     // }),
    //   ]),
    // ]),
    trigger("listAnimation", [
      transition("* <=> *", [
        // each time the binding value changes
        query(
          ":leave",
          [
            animate(
              "1s 0.1s ease-in-out",
              keyframes([
                style({
                  transform: "scale(1.3)",

                  offset: 0.3,
                }),
                style({
                  transform: "translateX(100px) scale(0.8)",
                  opacity: 0.6,
                  offset: 0.6,
                }),
                style({
                  transform: "translateX(-500px) scale(0.5)",
                  opacity: 0.2,
                  offset: 0.8,
                }),
              ])
            ),
            // stagger(100, [animate("0.5s", style({ opacity: 0 }))])
          ],
          { optional: true }
        ),
        query(
          ":enter",
          [
            style({ opacity: 0, transform: "scale(0)" }), // start with this styles
            stagger("0.2s", [
              animate("0.5s", style({ opacity: 1, transform: "scale(1)" })),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class MaterialTestComponent implements OnInit, AfterViewInit {
  @ViewChild("cdkStepper", { static: true }) cdkStepper: CdkStepper;

  constructor(private media: MediaObserver, private fb: FormBuilder) {}
  myform: FormGroup;
  dataElement = ["Football", "Courses", "Games", "Database", "Design"];

  userIcon = [
    { id: 0, icon: "home" },
    { id: 1, icon: "add" },
    { id: 2, icon: "remove" },
  ];

  ngOnInit() {
    this.media.media$.subscribe((data) => {
      console.log("media beakpoints");
      console.log(data);
    });
  }

  nextItem() {
    this.cdkStepper.next();
    console.log("step number ", this.cdkStepper.selectedIndex);
  }
  prevItem() {
    this.cdkStepper.previous();
    console.log("step number ", this.cdkStepper.selectedIndex);
  }

  ngAfterViewInit() {}
}
