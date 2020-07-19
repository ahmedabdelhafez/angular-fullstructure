import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
} from "@angular/core";
import * as UppyCore from "@uppy/core";
import * as Dashboard from "@uppy/dashboard";
import * as XHRUpload from "@uppy/xhr-upload";
import * as Arabic from "@uppy/locales/lib/ar_SA";
import * as ProgressBar from "@uppy/progress-bar";
@Component({
  selector: "app-uploader",
  templateUrl: "./uploader.component.html",
  styleUrls: ["./uploader.component.scss"],
})
export class UploaderComponent implements OnInit, AfterViewInit {
  @Input("files") files: string | string[] = null;
  @Input("endpointUrl") endpointUrl: string =
    "http://localhost:3000/api/files/upload";
  @Input("allowedFormats") allowedFormats: string | string[];
  @Input("minFiles") minFiles: number = 1;
  @Input("maxFiles") maxFiles: number = 1;
  /**
   * @description the files that uploaded successfuly to  backend servers
   */
  @Output("uploadedData") uploadedData = new EventEmitter<any>();
  @Output("errorMessages") errorMessages = new EventEmitter<any>();
  errorFiles = [];
  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.createUploader();
    console.log("Message after all thing done Async");
  }
  uppy;
  createUploader() {
    this.uppy = UppyCore({
      id: "appUploader",
      autoProceed: false,
      locale: Arabic,
      restrictions: {
        minNumberOfFiles: this.minFiles,
        maxNumberOfFiles: this.maxFiles,
        allowedFileTypes: ["image/*", "video/*"],
      },
      allowMultipleUploads: true,
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
          placeholder: "describe what the image is about",
        },
      ],
      browserBackButtonClose: true,
      hideRetryButton: false,
      width: "100%",
      disableStatusBar: false,
    });

    this.uppy.use(XHRUpload, {
      endpoint: this.endpointUrl,
      method: "post",
      formData: true,
      bundle: false,
      fieldName: "imagefile",
      metaFields: "imagefile",
    });

    /// << After Files Added >> ///

    this.uppy.on("file-added", (file) => {
      console.log("file added well");
      console.log(file);
    });

    /**
     * @description this event fire when upload has been success for file
     */
    this.uppy.on("upload-success", (file, response) => {
      console.log("file after upload");
      console.log(file);
      console.log("Full Response:");
      console.log(response);
    });

    /**
     * @description this event fire when an error occured in any file
     */
    this.uppy.on("upload-error", (err) => {
      console.log("an error while upload file");
      this.errorFiles.push(err);
    });

    this.uppy.on("complete", (res) => {
      console.log("all done and complete well ****************");
      console.log(res);
      this.uploadedData.emit(res);
      this.errorMessages.emit(this.errorFiles);
    });
  }
}
