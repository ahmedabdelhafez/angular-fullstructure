import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClient } from "@angular/common/http";
import { PrintComponent } from "./print/print.component";
import { TimerComponent } from "./timer/timer.component";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared.module";
import { NgxSpinnerModule } from "ngx-spinner";
import { FilterViewerComponent } from "./filter-viewer/filter-viewer.component";

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    PrintComponent,
    TimerComponent,
    FilterViewerComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgxSpinnerModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
      isolate: true,
    }),
  ],
  exports: [
    TranslateModule,
    NgxSpinnerModule,
    PrintComponent,
    TimerComponent,
  ],
  entryComponents: [],
})
export class ComponentModule {}
