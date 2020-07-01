import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AppRoutingModule } from "../app-routing.module";
import { LoginComponent } from "./login/login.component";
import { MaterialModule } from "../shared/material.module";
import { LayoutModule } from "./layout/layout.module";
import { HomeComponent } from "./home/home.component";

@NgModule({
  declarations: [LoginComponent, HomeComponent],
  imports: [CommonModule, AppRoutingModule, MaterialModule, LayoutModule],
  exports: [AppRoutingModule, LayoutModule, LoginComponent, HomeComponent],
  providers: []
})
export class CoreModule {}
