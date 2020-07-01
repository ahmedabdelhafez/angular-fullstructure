import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AboutusComponent } from "./aboutus.component";
import { Routes, RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { MoreaboutComponent } from "./moreabout/moreabout.component";
import { HttpcardModule } from "src/app/shared/components/httpcard/httpcard.module";
import { CanloadGuard } from "../../core/security/guard/canload.guard";
import { AboutEmpComponent } from "./about-emp/about-emp.component";

const route: Routes = [
  {
    path: "",
    component: AboutusComponent,
    children: [
      {
        path: "moreabout",
        component: MoreaboutComponent,
        data: { breadcrumb: "/moreabout", title: "More About" },
      },
      {
        path: "aboutemp",
        component: AboutEmpComponent,
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
