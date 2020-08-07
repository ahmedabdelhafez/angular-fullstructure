import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpcardComponent } from "./httpcard.component";
import { NgxSpinnerModule } from "ngx-spinner";
import { MaterialModule } from "../../material.module";

@NgModule({
  declarations: [HttpcardComponent],
  imports: [CommonModule, NgxSpinnerModule, MaterialModule],
  exports: [HttpcardComponent],
})
export class HttpcardModule {}
