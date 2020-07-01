import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EventCalendarComponent } from "./event-calendar.component";
import { CalendarModule, DateAdapter } from "angular-calendar";
import { adapterFactory } from "angular-calendar/date-adapters/date-fns";
import { MaterialModule } from "../../material.module";

@NgModule({
  imports: [
    CommonModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    MaterialModule,
  ],
  declarations: [EventCalendarComponent],
  exports: [EventCalendarComponent, CalendarModule, MaterialModule],
})
export class EventCalendarModule {}
