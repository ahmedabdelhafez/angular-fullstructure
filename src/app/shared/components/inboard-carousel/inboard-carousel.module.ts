import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InboardCarouselComponent } from './inboard-carousel.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [InboardCarouselComponent],
  exports:[InboardCarouselComponent]
})
export class InboardCarouselModule { }
