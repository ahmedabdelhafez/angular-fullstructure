import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DialogComponent } from "./dialog.component";
import { MaterialModule } from "../../material.module";
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
  declarations: [DialogComponent],
  imports: [CommonModule, MaterialModule, FlexLayoutModule],
  exports: [DialogComponent],
  entryComponents: [DialogComponent],
})
export class DialogModule {}
