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
import { PreloadStartegyService } from "./core/preload-startegy.service";

const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
    data: { breadcrumb: "/", title: "login page", state: "home" },
  },
  {
    path: "login",
    component: LoginComponent,
    data: { breadcrumb: "/login", title: "login page", state: "login" },
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    data: {
      breadcrumb: "/dashboard",
      title: "dashboard page",
      state: "dashboard",
    },
  },
  {
    path: "aboutus",
    loadChildren: () =>
      import("./applications/aboutus/aboutus.module").then(
        (m) => m.AboutusModule
      ),
    canLoad: [],
    data: { breadcrumb: "/aboutus", title: "about us", state: "aboutus" },
  },
  {
    path: "users",
    loadChildren: () =>
      import("./applications/user-tabs/user-tabs.module").then(
        (m) => m.UserTabsModule
      ),
    canLoad: [],
    data: { breadcrumb: "/users", title: "Users", state: "users" },
  },
  {
    path: "teststyle",
    component: TeststyleComponent,
    data: { breadcrumb: "/teststyle", title: "style", state: "teststyle" },
  },
  {
    path: "testprint",
    component: TestprintComponent,
    data: { breadcrumb: "/testprint", title: "print", state: "testprint" },
  },
  {
    path: "observable",
    component: ObservableComponent,
    data: {
      breadcrumb: "/observable",
      title: "observable",
      state: "observable",
    },
  },
  {
    path: "fullmenu",
    component: FullmenuComponent,
    data: {
      breadcrumb: "/fullmenu",
      title: "Full menu",
      canupdate: false,
      state: "fullmenu",
    },
  },
  {
    path: "profile",
    component: ProfileComponent,
    data: { breadcrumb: "/profile", title: "Profile", state: "profile" },
  },
  {
    path: "materialtest",
    component: MaterialTestComponent,
    data: {
      breadcrumb: "/materialtest",
      title: "Material Test",
      state: "materialtest",
    },
  },
  {
    path: "grid",
    component: GridComponent,
    data: { breadcrumb: "/grid", title: "grid", state: "grid" },
  },
  {
    path: "sliders",
    component: SlidersComponent,
    data: { breadcrumb: "/sliders", title: "sliders", state: "sliders" },
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
      preloadingStrategy: PreloadStartegyService,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
