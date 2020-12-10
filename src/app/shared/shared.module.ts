import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "./material.module";
import { BootstrapngxModule } from "./bootstrapngx.module";
import { HttpClientModule } from "@angular/common/http";
import { TranslateModule } from "@ngx-translate/core";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { QuillModule } from "ngx-quill";
import { NgSelectModule } from "@ng-select/ng-select";
import { NgCircleProgressModule } from "ng-circle-progress";
import { NgxPrintModule } from "ngx-print";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import { FilterViewerComponent } from "./components/filter-viewer/filter-viewer.component";
import { TimerComponent } from "./components/timer/timer.component";
import { CustomstepperComponent } from "./components/customstepper/customstepper.component";
import { ErrorValidationComponent } from "./components/error-validation/error-validation.component";
import { RxReactiveFormsModule } from "@rxweb/reactive-form-validators"; // <-- #2 import module
import { NgxProgressModule } from "@kken94/ngx-progress";
import { DragAndDropModule } from "angular-draggable-droppable";
import { DndModule } from "ngx-drag-drop";
import { NgxPageScrollCoreModule } from "ngx-page-scroll-core";
import { NgxPageScrollModule } from "ngx-page-scroll";
import { NgxIntlTelInputModule } from "ngx-intl-tel-input";
import { MaterialChildNavbarComponent } from "./components/material-child-navbar/material-child-navbar.component";
import { DirectivesModule } from "./directive/directives.module";
import { PipesModule } from "./pipes/pipes.module";
import { TimelineComponent } from "./components/timeline/timeline.component";
import { TabGroupComponent } from "./components/tab-group/tab-group.component";
import { GridContainerComponent } from "./components/grid-container/grid-container.component";

@NgModule({
  declarations: [
    FilterViewerComponent,
    TimerComponent,
    CustomstepperComponent,
    ErrorValidationComponent,
    MaterialChildNavbarComponent,
    TimelineComponent,
    TabGroupComponent,
    GridContainerComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    BootstrapngxModule,

    TranslateModule,
    QuillModule.forRoot(),
    NgxMaterialTimepickerModule.setLocale("ar-AE"),
    NgSelectModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
    }),
    NgxPrintModule,
    RxReactiveFormsModule,
    DragAndDropModule,
    DndModule,
    NgxPageScrollCoreModule.forRoot({ duration: 2500 }),
    NgxPageScrollModule,
    NgxIntlTelInputModule,
    RouterModule,
    DirectivesModule,
    PipesModule,
  ],
  exports: [
    MaterialModule,
    HttpClientModule,
    BootstrapngxModule,
    TranslateModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule,
    NgSelectModule,
    NgCircleProgressModule,
    NgxMaterialTimepickerModule,
    FilterViewerComponent,
    TimerComponent,
    CustomstepperComponent,
    ErrorValidationComponent,
    RxReactiveFormsModule,
    DragAndDropModule,
    DndModule,
    NgxPrintModule,
    NgxIntlTelInputModule,
    MaterialChildNavbarComponent,
    NgxPageScrollCoreModule,
    NgxPageScrollModule,
    TimelineComponent,
    DirectivesModule,
    PipesModule,
    TabGroupComponent,
    GridContainerComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
