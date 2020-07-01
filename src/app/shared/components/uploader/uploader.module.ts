import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UploaderComponent } from "./uploader.component";

@NgModule({
  imports: [CommonModule],
  declarations: [UploaderComponent],
  exports: [UploaderComponent]
})
export class UploaderModule {}
