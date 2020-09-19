import { Component, OnInit } from "@angular/core";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";
import { DragAndDropModule } from 'angular-draggable-droppable';


@Component({
  selector: "app-darg-drop",
  templateUrl: "./darg-drop.component.html",
  styleUrls: ["./darg-drop.component.scss"],
})
export class DargDropComponent implements OnInit {
  public simpleList = [
    [
      { name: "John", type: "male" },
      { name: "Smith", type: "male" },
      { name: "George", type: "male" },
    ],
    [
      { name: "Jennifer", type: "female" },
      { name: "Laura", type: "female" },
      { name: "Georgina", type: "female" },
    ],
  ];

  constructor() {}

  ngOnInit() {}

  todoList: string[] = [
    "play football",
    "study data",
    "buy things",
    "go to sleep",
    "go eating",
  ];

  doneList: string[] = ["go eating"];
  droppedData: string;

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
