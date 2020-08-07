import {
  Component,
  OnInit,
  TemplateRef,
  AfterViewInit,
  ViewChild,
  ApplicationRef,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import {
  CalendarView,
  CalendarEventAction,
  CalendarEvent,
  CalendarEventTimesChangedEvent,
} from "angular-calendar";
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from "date-fns";
import { Subject } from "rxjs";
import { DialogComponent } from "../dialog/dialog.component";
import { ScrollStrategyOptions } from "@angular/cdk/overlay";
import { TranslateService } from "@ngx-translate/core";

const colors: any = {
  red: {
    primary: "#ad2121",
    secondary: "#FAE3E3",
  },
  blue: {
    primary: "#1e90ff",
    secondary: "#D1E8FF",
  },
  yellow: {
    primary: "#e3bc08",
    secondary: "#FDF1BA",
  },
};

@Component({
  selector: "app-event-calendar",
  templateUrl: "./event-calendar.component.html",
  styleUrls: ["./event-calendar.component.scss"],
})
export class EventCalendarComponent implements OnInit, AfterViewInit {
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  CalendarView = CalendarView;
  activeDayIsOpen: boolean = true;
  modalDirection = "ltr";
  labelDirection = "ltr";
  constructor(
    public dialog: MatDialog,
    private translation: TranslateService,
    private appRef: ApplicationRef
  ) {}

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: "Edit",
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent("Edited", event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: "Delete",
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent("Deleted", event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: "A 3 day event",
      color: colors.red,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      start: startOfDay(new Date()),
      title: "An event with no end date",
      color: colors.yellow,
      actions: this.actions,
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: "A long event that spans 2 months",
      color: colors.blue,
      allDay: true,
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: addHours(new Date(), 2),
      title: "A draggable and resizable event",
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
  ];

  ngOnInit() {
    this.iteDefaultLang();
    /////////
    this.translation.onLangChange.subscribe((lang) => {
      if (lang["lang"] === "ar") {
        this.modalDirection = "rtl";
        this.labelDirection = "rtl";
        this.appRef.tick();
      } else {
        this.modalDirection = "ltr";
        this.labelDirection = "ltr";
        this.appRef.tick();
      }
    });
  }

  iteDefaultLang() {
    if (this.translation.getDefaultLang() === "ar") {
      this.modalDirection = "rtl";
      this.labelDirection = "rtl";
    } else {
      this.modalDirection = "ltr";
      this.labelDirection = "ltr";
    }
  }

  ngAfterViewInit() {}

  changeCalendarView(view: CalendarView) {
    this.view = view;
  }

  toggleButtonChange(event) {
    console.log(event["value"]);
  }

  daysButtonChange(event) {
    console.log(event["value"]);
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent("Dropped or resized", event);
  }

  handleEvent(action: string, event: CalendarEvent): void {}

  onDayClicked(event) {
    console.log("day clicked event");
    console.log(event);
  }

  addEvent(template: TemplateRef<any>) {
    this.dialog.open(DialogComponent, {
      minWidth: "400px",
      width: "800px",
      height: "400px",
      hasBackdrop: true,
      direction: this.modalDirection === "ltr" ? "ltr" : "rtl",

      data: {
        title: "add new event",
        template: template,
      },
    });
  }
}
