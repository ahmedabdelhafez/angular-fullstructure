import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DialogComponent } from "./dialog.component";
import { MaterialModule } from "../../material.module";

@NgModule({
  declarations: [DialogComponent],
  imports: [CommonModule, MaterialModule],
  exports: [DialogComponent],
  entryComponents: [DialogComponent]
})
export class DialogModule {}
