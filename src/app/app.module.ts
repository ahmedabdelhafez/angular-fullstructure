import { BrowserModule, Title } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  APP_INITIALIZER,
} from "@angular/core";
import { AppComponent } from "./app.component";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ErrorhandlerService } from "./core/error_handler/errorhandler.service";
import { CoreModule } from "./core/core.module";

import { ApplicationsModule } from "./applications/applications.module";
import { DashboardComponent } from "./applications/dashboard/dashboard.component";
import { LoadingspinnerModule } from "./shared/components/loadingspinner/loadingspinner.module";
import { NgxSpinnerModule } from "ngx-spinner";
import { ConfigAppService } from "./services/ConfigApp.service";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { SideviewerModule } from "./shared/components/side-viewer/sideviewer.module";
import { RequestLogService } from "./core/RequestLog.service";

export function loadConfigurations(configAppService: ConfigAppService) {
  return () => configAppService.getConfig();
}

@NgModule({
  declarations: [AppComponent, DashboardComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    ApplicationsModule,
    LoadingspinnerModule,
    NgxSpinnerModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production,
    }),
    SideviewerModule,
    LoadingspinnerModule,
  ],
  providers: [
    // HttpConfigService,
    Title,
    ConfigAppService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorhandlerService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestLogService,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfigurations,
      deps: [ConfigAppService],
      multi: true,
    },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
