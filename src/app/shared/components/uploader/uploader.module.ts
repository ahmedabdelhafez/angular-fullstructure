import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UploaderComponent } from "./uploader.component";

@NgModule({
  imports: [CommonModule],
  declarations: [UploaderComponent],
  exports: [UploaderComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UploaderModule {}
