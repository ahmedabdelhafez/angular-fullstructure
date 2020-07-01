import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  AfterViewInit
} from "@angular/core";
import * as UppyCore from "@uppy/core";
import * as Dashboard from "@uppy/dashboard";
import * as XHRUpload from "@uppy/xhr-upload";
import * as Arabic from "@uppy/locales/lib/ar_SA";
import * as ProgressBar from "@uppy/progress-bar";
@Component({
  selector: "app-uploader",
  templateUrl: "./uploader.component.html",
  styleUrls: ["./uploader.component.scss"]
})
export class UploaderComponent implements OnInit, AfterViewInit {
  @Input("files") files: string | string[] = null;
  @Input("allowedFormats") allowedFormats: string | string[];
  /**
   * @description the files that uploaded successfuly to  backend servers
   */
  @Output("uploadedData") uploadedData = new EventEmitter<any>();
  @Output("errorMessages") errorMessages = new EventEmitter<any>();
  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.createUploader();
    console.log("Message after all thing done Async");
  }
  uppy;
  createUploader() {
    this.uppy = UppyCore({
      autoProceed: false,
      locale: Arabic,
      restrictions: {
        minNumberOfFiles: 2,
        maxNumberOfFiles: 4,
        allowedFileTypes: ["image/*", "video/*"]
      },
      allowMultipleUploads: true
    });

    this.uppy.use(Dashboard, {
      target: "#drag-drop-area",
      id: "up1",
      inline: true,
      note: `اقل عدد للملفات هو: ${2} و اقصي عدد هو: ${(this, 4)}`,
      showSelectedFiles: true,
      showProgressDetails: true,
      animateOpenClose: true,
      showLinkToFileUploadResult: true,
      proudlyDisplayPoweredByUppy: false,
      disableInformer: false,
      metaFields: [
        { id: "imagefile", name: "imagefile", placeholder: "file name" },
        {
          id: "caption",
          name: "Caption",
          placeholder: "describe what the image is about"
        }
      ],
      browserBackButtonClose: true,
      hideRetryButton: false,
      width: "100%",
      disableStatusBar: false
    });

    this.uppy.use(XHRUpload, {
      endpoint: "http://localhost:3000/api/files/upload",
      method: "post",
      formData: true,
      bundle: false,
      fieldName: "imagefile",
      metaFields: "imagefile"
    });

    /// << After Files Uploaded >> ///

    this.uppy.on("file-added", file => {
      console.log("file added well");
      console.log(file);
    });

    this.uppy.on("upload-success", (file, response) => {
      console.log("file after upload");
      console.log(file);
      console.log("Full Response:");
      console.log(response);
    });

    this.uppy.on("upload-error", err => {
      console.log("an error while upload file");
    });

    this.uppy.on("complete", res => {
      console.log("all done and complete well ****************");
      console.log(res);
      this.uploadedData.emit(res);
    });
  }
}
