import {
  Component,
  OnInit,
  ChangeDetectorRef,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
  Output,
  EventEmitter,
  AfterContentInit,
} from "@angular/core";
import { CdkStepper } from "@angular/cdk/stepper";
import { Directionality } from "@angular/cdk/bidi";

@Component({
  selector: "app-customstepper",
  templateUrl: "./customstepper.component.html",
  styleUrls: ["./customstepper.component.scss"],
  providers: [
    { provide: CdkStepper, useExisting: CustomstepperComponent, multi: true },
  ],
})
export class CustomstepperComponent extends CdkStepper
  implements OnInit, OnChanges {
  constructor(dir: Directionality, changeDetectorRef: ChangeDetectorRef) {
    super(dir, changeDetectorRef);
  }

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {}

  /**
   * @description `selectedIndex`  this variable is owned by the cdkStepper and it's protected
   * @returns `void`
   */
  activeCurrentStep(index: number): void {
    this.selectedIndex = index;
  }
}
