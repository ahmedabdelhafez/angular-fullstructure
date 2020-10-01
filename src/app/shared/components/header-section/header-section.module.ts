import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderSectionComponent } from "./header-section.component";

@NgModule({
  imports: [CommonModule],
  declarations: [HeaderSectionComponent],
  exports: [HeaderSectionComponent],
})
export class HeaderSectionModule {}
