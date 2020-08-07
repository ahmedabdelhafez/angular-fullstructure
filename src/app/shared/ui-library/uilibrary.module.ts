import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TimelineComponent } from "./timeline/timeline.component";
import { FlippedCardComponent } from "./flipped-card/flipped-card.component";
import { DetailAccordionListComponent } from "./detail-accordion-list/detail-accordion-list.component";
import { StarItemComponent } from "./star-item/star-item.component";

@NgModule({
  declarations: [
    TimelineComponent,
    FlippedCardComponent,
    DetailAccordionListComponent,
    StarItemComponent,
  ],
  imports: [CommonModule],
  exports: [
    TimelineComponent,
    FlippedCardComponent,
    DetailAccordionListComponent,
    StarItemComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UilibraryModule {}
