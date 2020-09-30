import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LazyloadingImageDirective } from "./lazyloading-image.directive";

@NgModule({
  imports: [CommonModule],
  declarations: [LazyloadingImageDirective],
  exports: [LazyloadingImageDirective],
})
export class DirectivesModule {}
