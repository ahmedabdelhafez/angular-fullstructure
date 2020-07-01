import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SideViewerComponent } from "./side-viewer.component";
import { SharedModule } from "../../shared.module";

@NgModule({
  declarations: [SideViewerComponent],
  imports: [CommonModule],
  exports: [SideViewerComponent],
})
export class SideviewerModule {}
