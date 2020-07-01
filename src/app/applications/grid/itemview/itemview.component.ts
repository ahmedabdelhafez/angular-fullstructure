import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from "@angular/core";
import { Observable } from "rxjs";

@Component({
  selector: "app-itemview",
  templateUrl: "./itemview.component.html",
  styleUrls: ["./itemview.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemviewComponent implements OnInit {
  @Input("items") itemsArr: Observable<any>;
  items: any = [];
  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.itemsArr.subscribe((data) => {
      this.items = [...this.items, ...data];
      // this.cd.markForCheck();
    });
  }

  refreshList() {
    this.cd.detectChanges();
  }
}
