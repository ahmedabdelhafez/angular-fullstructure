import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SwitchbuttonComponent } from "./switchbutton.component";
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [SwitchbuttonComponent],
  exports: [SwitchbuttonComponent]
})
export class SwitchbuttonModule {}
