import { DomSanitizer } from "@angular/platform-browser";
import * as blobUtil from "blob-util";

export class ImageUtil {
  constructor(private sanitizer: DomSanitizer) {}

  /**
   * @description `base64ToBlob` method is used to convert the base64 string to blob
   */
  base64ToBlob() {}
  /**
   * @description `imageToBase64` method is used to convert the image to base64 string
   */

  static convertImageToBase64(fileObject:any) {
    let allImagesBase64Array = [];
    let allFiles = fileObject.target.files;
    console.log("number of files: " + allFiles.length);
    Object.keys(allFiles).forEach((itemKey) => {
      console.log("Image Name: " + allFiles[itemKey]["name"]);

      blobUtil
        .blobToDataURL(allFiles[itemKey])
        .then(async (data) => {
          allImagesBase64Array.push(await data);
        })
        .catch((err) => {
          console.log(`an while convert image: ${allFiles[itemKey]["name"]}`);
        });
    });

    return allImagesBase64Array;
  }

  /**
   * @description `base64ToImage` method is used to convert the base64 string to image and you can see it with HTML `img` tag
   * @param `base64String` string
   */
  base64ToImage(base64String: string) {
    return this.sanitizer.bypassSecurityTrustUrl(
      `'data:image/jpg;base64,${base64String}`
    );
  }
}
