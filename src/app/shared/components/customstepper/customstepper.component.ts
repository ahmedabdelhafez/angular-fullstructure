import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ElementRef,
  Renderer2,
  Input,
} from "@angular/core";
import { CdkStepper } from "@angular/cdk/stepper";
import { Directionality } from "@angular/cdk/bidi";

@Component({
  selector: "app-customstepper",
  templateUrl: "./customstepper.component.html",
  styleUrls: ["./customstepper.component.scss"],
  providers: [{ provide: CdkStepper, useExisting: CustomstepperComponent }],
})
export class CustomstepperComponent extends CdkStepper {
  @Input() userIcons: any[];
  constructor(dir: Directionality, changeDetectorRef: ChangeDetectorRef) {
    super(dir, changeDetectorRef);
  }

  /**
   * @description `selectedIndex`  this variable is owned by the cdkStepper and it's protected
   * @returns `void`
   */
  activeCurrentStep(index: number): void {
    this.selectedIndex = index;
  }
}
