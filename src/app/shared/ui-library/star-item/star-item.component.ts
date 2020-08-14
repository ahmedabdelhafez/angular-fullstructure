import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";

@Component({
  selector: "app-star-item",
  templateUrl: "./star-item.component.html",
  styleUrls: ["./star-item.component.scss"],
})
export class StarItemComponent implements OnInit, OnChanges {
  @Input("starColor") starColor: string = "gold";
  @Input("numberOfStars") numberOfStars: number = 1;
  staricon = "fa fa-star";
  starArray = [];
  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    for (let index = 0; index < this.numberOfStars; index++) {
      this.starArray.push(this.staricon);
    }
  }

  ngOnInit(): void {}
}
