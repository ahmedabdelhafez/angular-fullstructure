import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./core/login/login.component";
import { TeststyleComponent } from "./applications/teststyle/teststyle.component";
import { TestprintComponent } from "./applications/testprint/testprint.component";
import { DashboardComponent } from "./applications/dashboard/dashboard.component";
import { AboutusModule } from "./applications/aboutus/aboutus.module";
import { FullmenuComponent } from "./applications/fullmenu/fullmenu.component";
import { ObservableComponent } from "./applications/observable/observable.component";
import { ProfileComponent } from "./applications/profile/profile.component";
import { GridComponent } from "./applications/grid/grid.component";
import { SlidersComponent } from "./applications/sliders/sliders.component";
import { MaterialTestComponent } from "./applications/material-test/material-test.component";
import { CanloadGuard } from "./core/security/guard/canload.guard";
import { MoreaboutComponent } from "./applications/aboutus/moreabout/moreabout.component";
import { AboutEmpComponent } from "./applications/aboutus/about-emp/about-emp.component";

const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
    data: { breadcrumb: "/", title: "login page" },
  },
  {
    path: "login",
    component: LoginComponent,
    data: { breadcrumb: "/login", title: "login page" },
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    data: { breadcrumb: "/dashboard", title: "dashboard page" },
  },
  {
    path: "aboutus",
    loadChildren: () => AboutusModule,
    canLoad: [],
    data: { breadcrumb: "/aboutus", title: "about us" },
  },
  {
    path: "teststyle",
    component: TeststyleComponent,
    data: { breadcrumb: "/teststyle", title: "style" },
  },
  {
    path: "testprint",
    component: TestprintComponent,
    data: { breadcrumb: "/testprint", title: "print" },
  },
  {
    path: "observable",
    component: ObservableComponent,
    data: { breadcrumb: "/observable", title: "observable" },
  },
  {
    path: "fullmenu",
    component: FullmenuComponent,
    data: { breadcrumb: "/fullmenu", title: "Full menu", canupdate: false },
  },
  {
    path: "profile",
    component: ProfileComponent,
    data: { breadcrumb: "/profile", title: "Profile" },
  },
  {
    path: "materialtest",
    component: MaterialTestComponent,
    data: { breadcrumb: "/materialtest", title: "Material Test" },
  },
  {
    path: "grid",
    component: GridComponent,
    data: { breadcrumb: "/grid", title: "grid" },
  },
  {
    path: "sliders",
    component: SlidersComponent,
    data: { breadcrumb: "/sliders", title: "sliders" },
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: "ignore",
      enableTracing: false,
      useHash: false,
      anchorScrolling: "enabled",
      scrollPositionRestoration: "disabled",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
