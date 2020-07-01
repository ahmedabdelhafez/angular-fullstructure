import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SelectlistComponent } from "./selectlist.component";

@NgModule({
  imports: [CommonModule],
  declarations: [SelectlistComponent],
  exports: [SelectlistComponent]
})
export class SelectlistModule {}
