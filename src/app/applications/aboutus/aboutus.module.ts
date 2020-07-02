import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AboutusComponent } from "./aboutus.component";
import { Routes, RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { MoreaboutComponent } from "./moreabout/moreabout.component";
import { HttpcardModule } from "src/app/shared/components/httpcard/httpcard.module";
import { CanloadGuard } from "../../core/security/guard/canload.guard";
import { AboutEmpComponent } from "./about-emp/about-emp.component";
import { CanactiveatechildGuard } from "src/app/core/security/guard/canactiveatechild.guard";
import { CanactiveateGuard } from "src/app/core/security/guard/canactiveate.guard";
import {
  TranslateModule,
  TranslateLoader,
  TranslateCompiler,
} from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClient } from "@angular/common/http";

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

const route: Routes = [
  {
    path: "",
    component: AboutusComponent,
    // canActivateChild:[CanactiveatechildGuard],
    children: [
      {
        path: "moreabout",
        component: MoreaboutComponent,
        data: { breadcrumb: "/moreabout", title: "More About" },
      },
      {
        path: "aboutemp",
        component: AboutEmpComponent,
        canActivate: [CanactiveateGuard],
        data: { breadcrumb: "/aboutemp", title: "About Emp" },
      },
    ],
  },
];

@NgModule({
  declarations: [AboutusComponent, MoreaboutComponent, AboutEmpComponent],
  imports: [
    CommonModule,
    SharedModule,
    HttpcardModule,
    RouterModule.forChild(route),
  
  ],
  exports: [RouterModule],
})
export class AboutusModule {}
