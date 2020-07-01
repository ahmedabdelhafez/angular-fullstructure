import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GridcontainerDirective } from "./gridcontainer.directive";
import { GridcolumnspanDirective } from "./gridcolumnspan.directive";
import { GridrowspanDirective } from "./gridrowspan.directive";

@NgModule({
  declarations: [
    GridcontainerDirective,
    GridcolumnspanDirective,
    GridrowspanDirective
  ],
  imports: [CommonModule],
  exports: [
    GridcontainerDirective,
    GridcolumnspanDirective,
    GridrowspanDirective
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DynamicgridModule {}
