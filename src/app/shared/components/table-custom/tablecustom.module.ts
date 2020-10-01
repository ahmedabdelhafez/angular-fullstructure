import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TableCustomComponent } from "./table-custom.component";
import { MatTableExporterModule } from "mat-table-exporter";
import { MaterialModule } from "../../material.module";

@NgModule({
  imports: [CommonModule, MatTableExporterModule, MaterialModule],
  declarations: [TableCustomComponent],
  exports: [TableCustomComponent, MatTableExporterModule],
})
export class TableCustomModule {}
