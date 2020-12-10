import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FilterPipe } from "./filter.pipe";
import { SummryPipe } from "./summry.pipe";
import { TimePipe } from "./time.pipe";

@NgModule({
  imports: [CommonModule],
  declarations: [FilterPipe, SummryPipe, TimePipe],
  exports: [FilterPipe, SummryPipe, TimePipe],
})
export class PipesModule {}
