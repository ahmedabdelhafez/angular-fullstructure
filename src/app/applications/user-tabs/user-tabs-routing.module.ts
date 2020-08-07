import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UseTabsComponent } from "./use-tabs.component";
import { CreateComponent } from "./create/create.component";
import { EditComponent } from "./edit/edit.component";
import { ListComponent } from "./list/list.component";
import { CandeactivateGuard } from "../../core/security/guard/candeactivate.guard";
const routes: Routes = [
  {
    path: "",
    component: UseTabsComponent,
    canDeactivate: [CandeactivateGuard],
    children: [
      {
        path: "create",
        component: CreateComponent,
        data: { breadcrumb: "/create", title: "Create user", state: "create" },
      },
      {
        path: "edit",
        component: EditComponent,
        data: { breadcrumb: "/edit", title: "Edit user", state: "edit" },
      },
      {
        path: "list",
        component: ListComponent,
        data: { breadcrumb: "/list", title: "List users", state: "list" },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserTabsRoutingModule {}
