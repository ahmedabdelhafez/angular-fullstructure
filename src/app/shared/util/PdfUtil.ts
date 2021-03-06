import html2canvas from "html2canvas";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
export class PdfUtil {
  constructor() {}

  printPdf() {
    html2canvas(document.getElementById("mytable"), {
      useCORS: true,
      allowTaint: true,
      // width: 300,
      // height: 300,
    }).then(async (data) => {
      let doc = {
        content: [
          {
            image: await data.toDataURL(),
            width: 500,
            // absolutePosition: { x: 0, y: 0 },
          },
          { text: "how are you man", relativePosition: { x: 0, y: 20 } },
        ],
      };
      pdfMake.createPdf(doc).download("tablefile");
    });
  }
}
