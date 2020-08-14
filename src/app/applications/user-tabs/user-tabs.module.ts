import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UserTabsRoutingModule } from "./user-tabs-routing.module";
import { UseTabsComponent } from "./use-tabs.component";
import { CreateComponent } from "./create/create.component";
import { ListComponent } from "./list/list.component";
import { EditComponent } from "./edit/edit.component";
import { MaterialModule } from "../../shared/material.module";
import { HttpcardModule } from "src/app/shared/components/httpcard/httpcard.module";
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    UseTabsComponent,
    CreateComponent,
    ListComponent,
    EditComponent,
  ],
  imports: [
    CommonModule,
    UserTabsRoutingModule,
    MaterialModule,
    HttpcardModule,
    SharedModule
  ],
  exports: [],
})
export class UserTabsModule {}
