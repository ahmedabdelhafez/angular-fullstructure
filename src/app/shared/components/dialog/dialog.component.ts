import {
  Component,
  OnInit,
  TemplateRef,
  Input,
  Inject,
  Output
} from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-dialog",
  templateUrl: "./dialog.component.html",
  styleUrls: ["./dialog.component.scss"]
})
export class DialogComponent implements OnInit {
  @Output("userAction") userAction: any;
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData
  ) {}

  ngOnInit() {}

  /*
  onNoClick(): void {
    this.dialogRef.close(this.dialogData.closeObject);
  }
  */
}
