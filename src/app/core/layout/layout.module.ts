import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavbarComponent } from "../layout/navbar/navbar.component";

import { FooterComponent } from "./footer/footer.component";
import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";
import { SideNavbarComponent } from "./side-navbar/side-navbar.component";
import { SharedModule } from "../../shared/shared.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MaterialNavbarComponent } from "./material-navbar/material-navbar.component";
import { NgMaterialMultilevelMenuModule } from "ng-material-multilevel-menu";

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    BreadcrumbComponent,
    SideNavbarComponent,
    MaterialNavbarComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FlexLayoutModule,
    NgMaterialMultilevelMenuModule,
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    BreadcrumbComponent,
    SideNavbarComponent,
    MaterialNavbarComponent,
  ],
})
export class LayoutModule {}
