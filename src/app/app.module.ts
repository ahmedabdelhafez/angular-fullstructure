import { BrowserModule, Title, HammerModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  APP_INITIALIZER,
  Injector,
  DoBootstrap,
} from "@angular/core";
import { AppComponent } from "./app.component";
import { HTTP_INTERCEPTORS, HttpClient } from "@angular/common/http";
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
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { NgxIndexedDBModule, DBConfig } from "ngx-indexed-db";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { LoadingSpinnerService } from "./core/loading-spinner.service";
import { HeaderJwtService } from "./core/security/header-jwt.service";
import { windowFactory } from "./core/token/windowFactory";
import { navigatorFactory } from "./core/token/navigatorFactory";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}
const dbConfig: DBConfig = {
  name: "MyDb",
  version: 1,
  objectStoresMeta: [
    {
      store: "people",
      storeConfig: { keyPath: "id", autoIncrement: true },
      storeSchema: [
        { name: "name", keypath: "name", options: { unique: false } },
        { name: "email", keypath: "email", options: { unique: false } },
      ],
    },
    {
      store: "users",
      storeConfig: { keyPath: "id", autoIncrement: true },
      storeSchema: [
        { name: "token", keypath: "token", options: { unique: false } },
        { name: "username", keypath: "username", options: { unique: false } },
      ],
    },
  ],
};
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
    FormsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production,
    }),
    SideviewerModule,
    LoadingspinnerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    NgxIndexedDBModule.forRoot(dbConfig),
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
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingSpinnerService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderJwtService,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfigurations,
      deps: [ConfigAppService],
      multi: true,
    },
    { provide: "window", useFactory: windowFactory },
    { provide: "navigator", useFactory: navigatorFactory },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  bootstrap: [AppComponent],
})
export class AppModule  {
  constructor() {}

 
}
