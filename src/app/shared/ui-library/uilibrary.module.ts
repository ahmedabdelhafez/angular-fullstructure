import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Injector } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TimelineComponent } from "./timeline/timeline.component";
import { FlippedCardComponent } from "./flipped-card/flipped-card.component";
import { DetailAccordionListComponent } from "./detail-accordion-list/detail-accordion-list.component";
import { StarItemComponent } from "./star-item/star-item.component";
import { PhoneInputComponent } from "./phone-input/phone-input.component";
import { CustomFormInputComponent } from "./custom-form-input/custom-form-input.component";
import { HttpButtonComponent } from "./http-button/http-button.component";
import { MaterialModule } from "../material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
@NgModule({
  declarations: [
    TimelineComponent,
    FlippedCardComponent,
    DetailAccordionListComponent,
    StarItemComponent,
    PhoneInputComponent,
    CustomFormInputComponent,
    HttpButtonComponent,
  ],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [
    TimelineComponent,
    FlippedCardComponent,
    DetailAccordionListComponent,
    StarItemComponent,
    PhoneInputComponent,
    CustomFormInputComponent,
    FormsModule,
    ReactiveFormsModule,
    HttpButtonComponent,
  ],
})
export class UilibraryModule {}
