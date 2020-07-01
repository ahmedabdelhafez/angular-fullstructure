import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpcardComponent } from "./httpcard.component";
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [HttpcardComponent],
  imports: [CommonModule, NgxSpinnerModule],
  exports: [HttpcardComponent]
})
export class HttpcardModule {}
