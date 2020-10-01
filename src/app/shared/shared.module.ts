import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "./material.module";
import { BootstrapngxModule } from "./bootstrapngx.module";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { ItemvalidationDirective } from "./directive/itemvalidation.directive";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ArabicOnlyDirective } from "./directive/arabic-only.directive";
import { LatinOnlyDirective } from "./directive/latin-only.directive";
import { LatinwithnumberDirective } from "./directive/latinwithnumber.directive";
import { SummryPipe } from "./pipes/summry.pipe";
import { CurrencyIconDirective } from "./directive/currency-icon.directive";
import { RolesDirective } from "../core/security/roles_directive/roles.directive";
import { CustomPopoverDirective } from "./directive/custom-popover.directive";
import { RtlDirective } from "./directive/rtl.directive";
import { QuillModule } from "ngx-quill";
import { NgSelectModule } from "@ng-select/ng-select";
import { NgCircleProgressModule } from "ng-circle-progress";
import { FilterPipe } from "./pipes/filter.pipe";
import { NgxPrintModule } from "ngx-print";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import { StaticNavbarDirective } from "./directive/static-navbar.directive";
import { FilterViewerComponent } from "./components/filter-viewer/filter-viewer.component";
import { TimerComponent } from "./components/timer/timer.component";
import { CustomstepperComponent } from "./components/customstepper/customstepper.component";
import { ErrorValidationComponent } from "./components/error-validation/error-validation.component";
import { RxReactiveFormsModule } from "@rxweb/reactive-form-validators"; // <-- #2 import module
import { NgxProgressModule } from "@kken94/ngx-progress";
import { DragAndDropModule } from "angular-draggable-droppable";
import { DndModule } from "ngx-drag-drop";
import { LazyloadingImageDirective } from "./directive/lazyloading-image.directive";
import { NgxPageScrollCoreModule } from "ngx-page-scroll-core";
import { NgxIntlTelInputModule } from "ngx-intl-tel-input";
import { ReactiveitemvalidationDirective } from "./directive/reactive-item-validation.directive";
// export function createTranslateLoader(http: HttpClient) {
//   return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
// }
@NgModule({
  declarations: [
    ItemvalidationDirective,
    ArabicOnlyDirective,
    LatinOnlyDirective,
    LatinwithnumberDirective,
    SummryPipe,
    CurrencyIconDirective,
    RolesDirective,
    CustomPopoverDirective,
    RtlDirective,
    FilterPipe,
    StaticNavbarDirective,
    FilterViewerComponent,
    TimerComponent,
    CustomstepperComponent,
    ErrorValidationComponent,
    ItemvalidationDirective,
    ReactiveitemvalidationDirective,
    LazyloadingImageDirective,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    BootstrapngxModule,
    HttpClientModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
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
    NgxIntlTelInputModule,
  ],
  exports: [
    MaterialModule,
    HttpClientModule,
    BootstrapngxModule,
    TranslateModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ItemvalidationDirective,
    ArabicOnlyDirective,
    LatinOnlyDirective,
    LatinwithnumberDirective,
    SummryPipe,
    CurrencyIconDirective,
    RolesDirective,
    CustomPopoverDirective,
    RtlDirective,
    QuillModule,
    NgSelectModule,
    NgCircleProgressModule,
    FilterPipe,
    NgxMaterialTimepickerModule,
    StaticNavbarDirective,
    FilterViewerComponent,
    TimerComponent,
    CustomstepperComponent,
    ErrorValidationComponent,
    RxReactiveFormsModule,
    ItemvalidationDirective,
    ReactiveitemvalidationDirective,
    DragAndDropModule,
    DndModule,
    NgxPrintModule,
    NgxIntlTelInputModule,
    LazyloadingImageDirective,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
