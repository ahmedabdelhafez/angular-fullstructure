import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CountdownComponent } from "./countdown.component";

@NgModule({
  imports: [CommonModule],
  declarations: [CountdownComponent],
  exports: [CountdownComponent]
})
export class CountdownModule {}
