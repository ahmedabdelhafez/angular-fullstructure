import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  ElementRef,
  ViewEncapsulation,
} from "@angular/core";
import { environment } from "../../../environments/environment";
import {
  trigger,
  state,
  transition,
  stagger,
  query,
  animate,
  style,
  keyframes,
} from "@angular/animations";
import { of, interval, timer, Subject, BehaviorSubject } from "rxjs";

import { HttpClient } from "@angular/common/http";
import { GlobalService } from "src/app/services/Global.service";
import { SideviewService } from "src/app/services/sideview.service";

import { HttpCall } from "src/app/services/HttpCall.service";

@Component({
  selector: "app-observable",
  templateUrl: "./observable.component.html",
  styleUrls: ["./observable.component.scss"],
  animations: [
    trigger("toggle-search", [
      transition(":enter", [
        style({
          transform: "translateX(-50px)",
          opacity: "1",
        }),
        animate("2s 200ms ease-in"),
      ]),
      transition(":leave", [
        style({
          transform: "translateX(50px)",
          opacity: "0",
        }),
        animate("1s ease-out"),
      ]),
    ]),
    trigger("listAnimation", [
      transition("* => *", [
        query(":enter", style({ opacity: 0 }), { optional: true }),

        query(
          ":enter",
          stagger("400ms", [
            animate(
              "1.5s ease-in-out",
              keyframes([
                style({ opacity: 0, transform: "translateX(-75%)", offset: 0 }),
                style({
                  opacity: 0.5,
                  transform: "translateX(35px)",
                  offset: 0.6,
                }),
                style({ opacity: 1, transform: "translateX(0)", offset: 1 }),
              ])
            ),
          ]),
          { optional: true }
        ),
      ]),
    ]),
    // show hide search item
    trigger("showhide", [
      state(
        "hide",
        style({
          transform: "translateY(-75%)",
          opacity: "0",
          visibility: "hidden",
        })
      ),
      state(
        "show",
        style({
          transform: "translateY(0)",
          opacity: "1",
          visibility: "visible",
        })
      ),
      transition("show => hide", animate("1s 100ms ease-out")),
      transition("hide => show", animate("750ms 100ms ease-in")),
    ]),
  ],
})
export class ObservableComponent implements OnInit, OnDestroy {
  searchText: string = "";
  valEvent = "";
  alldata = [];

  userId;
  userName;

  searchTextChanged: Subject<string> = new Subject<string>();

  constructor(
    private http: HttpClient,
    private httpData: HttpCall,
    private sideView: SideviewService,
    private elem: ElementRef
  ) {}

  public editor;
  public editorContent = `<h3><strong>Type Something...fsfsdfsdfsdfs</strong></h3><h1 class="ql-align-center">fdsfsdfsdfs</h1><blockquote class="ql-align-right">12<sup>2</sup></blockquote>`;
  public editorOptions = {
    theme: "snow",
    modules: {
      toolbar: {
        container: [
          [{ placeholder: ["[GuestName]", "[HotelName]"] }], // my custom dropdown
          ["bold", "italic", "underline", "strike"], // toggled buttons
          ["blockquote", "code-block"],

          [{ header: 1 }, { header: 2 }], // custom button values
          [{ list: "ordered" }, { list: "bullet" }],
          [{ script: "sub" }, { script: "super" }], // superscript/subscript
          [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
          [{ direction: "rtl" }], // text direction

          [{ size: ["small", false, "large", "huge"] }], // custom dropdown
          [{ header: [1, 2, 3, 4, 5, 6, false] }],

          [{ color: [] }, { background: [] }], // dropdown with defaults from theme
          [{ font: [] }],
          [{ align: [] }],

          ["clean"], // remove formatting button
        ],
        handlers: {
          placeholder: function (value) {
            if (value) {
              const cursorPosition = this.quill.getSelection().index;
              this.quill.insertText(cursorPosition, value);
              this.quill.setSelection(cursorPosition + value.length);
            }
          },
        },
      },
    },
  };

  printQuill() {
    console.log(this.editorContent);
  }

  onEditorCreated(quill) {
    this.editor = quill;
    console.log("quill is ready! this is current quill instance object", quill);
  }

  onContentChanged({ quill, html, text }) {
    console.log("quill content is changed!", quill, html, text);
  }
  ngAfterViewInit() {
    // Update your dropdown with labels
    // let placeholderPickerItems = this.elem.nativeElement.querySelectorAll(
    //   ".ql-placeholder .ql-picker-item"
    // );
    // placeholderPickerItems.forEach(
    //   item => (item.textContent = item.dataset.value)
    // );
    // this.elem.nativeElement.querySelector(
    //   ".ql-placeholder .ql-picker-label"
    // ).innerHTML =
    //   "Insert Data Field &nbsp; &nbsp; &nbsp;" +
    //   this.elem.nativeElement.querySelector(".ql-placeholder .ql-picker-label")
    //     .innerHTML;
  }

  ngOnInit() {}

  hideByHand() {
    let items = document.querySelectorAll("item-grid").forEach((e) => {
      console.log("item class");
      console.log(e.classList);
    });
  }

  ngOnDestroy(): void {
    console.log("i will close the side viewer from observable");
    this.sideView.showHideSideViewer("hide", null);
  }
}
