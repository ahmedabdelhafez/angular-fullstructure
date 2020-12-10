import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Injector } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FlippedCardComponent } from "./flipped-card/flipped-card.component";
import { DetailAccordionListComponent } from "./detail-accordion-list/detail-accordion-list.component";
import { StarItemComponent } from "./star-item/star-item.component";
import { CustomFormInputComponent } from "./custom-form-input/custom-form-input.component";
import { HttpButtonComponent } from "./http-button/http-button.component";
import { MaterialModule } from "../material.module";
import { InputFileComponent } from "./input-file/input-file.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InputItemComponent } from "./input-item/input-item.component";
import { DirectivesModule } from "../directive/directives.module";

@NgModule({
  declarations: [
    FlippedCardComponent,
    DetailAccordionListComponent,
    StarItemComponent,
    CustomFormInputComponent,
    HttpButtonComponent,
    InputFileComponent,
    InputItemComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
  ],
  exports: [
    FlippedCardComponent,
    DetailAccordionListComponent,
    StarItemComponent,
    CustomFormInputComponent,
    FormsModule,
    ReactiveFormsModule,
    HttpButtonComponent,
    InputFileComponent,
    InputItemComponent,
  ],
})
export class UilibraryModule {}
