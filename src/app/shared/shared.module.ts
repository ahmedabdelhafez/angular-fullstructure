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
import { Ng2FlatpickrModule } from "ng2-flatpickr";
import { NgCircleProgressModule } from "ng-circle-progress";
import { FilterPipe } from "./pipes/filter.pipe";
import { NgxPrintModule } from "ngx-print";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}
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
    Ng2FlatpickrModule,
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
    Ng2FlatpickrModule,
    NgCircleProgressModule,
    FilterPipe,
    NgxMaterialTimepickerModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
