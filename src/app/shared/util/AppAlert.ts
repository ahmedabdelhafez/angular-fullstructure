import Swal from "sweetalert2";

export class AppAlert {
  /**
   * `showToastError` show an error toaster
   * @param `msg` String param for message text
   * @param `title` optional: title for toaster
   * @param `timeOut` optional: the amount of time to close the toaster @default 1500 ms
   *  @returns void
   */
  static showToastError(msg: string, title?: string, timeOut?: number) {
    return Swal.fire({
      title: title,
      html: msg,
      toast: true,
      position: "center",
      showCancelButton: false,
      showConfirmButton: false,
      timer: timeOut ? timeOut : 1500,
      icon: "error",
      showClass: { popup: "animated fadeIn fast" },
    });
  }

  static showToastInfo(msg: string, title?: string, timeOut?: number) {
    return Swal.fire({
      title: title,
      html: msg,
      toast: true,
      position: "center",
      showConfirmButton: false,
      timer: timeOut ? timeOut : 1500,
      icon: "info",
      showClass: { popup: "animated fadeIn fast" },
    });
  }

  static showToastSuccess(msg: string, title?: string, timeOut?: number) {
    return Swal.fire({
      title: title,
      background: "seagreen",
      html: msg,
      toast: true,
      position: "center",
      showConfirmButton: false,
      timer: timeOut ? timeOut : 1500,
      icon: "success",
      showClass: { popup: "animated fadeIn fast" },
    });
  }

  static showToastWarning(msg: string, title?: string, timeOut?: number) {
    return Swal.fire({
      title: title,
      background: "#ffa36c",
      html: `<span style="color:#799351; padding:0px 5px;">${msg}</span>`,
      toast: true,
      position: "center",
      showConfirmButton: false,
      timer: timeOut ? timeOut : 1500,
      icon: "warning",
      showClass: { popup: "animated fadeIn fast" },
    });
  }

  static showToastQuestion(msg: string, title?: string, timeOut?: number) {
    return Swal.fire({
      title: title,
      html: msg,
      toast: true,
      position: "center",
      showConfirmButton: false,
      timer: timeOut ? timeOut : 1500,
      icon: "question",
      showClass: { popup: "animated fadeIn fast" },
    });
  }

  ////////// << show dialog alerts >> //////////
  //############################################
  static showError(msg: string, title?: string, timeOut?: number) {
    return Swal.fire({
      title: title,
      html: msg,
      toast: false,
      position: "center",
      showConfirmButton: false,
      icon: "error",
      timer: timeOut ? timeOut : 1500,
    });
  }

  static showSuccess(msg: string, title?: string, timeOut?: number) {
    return Swal.fire({
      title: title,
      html: msg,
      toast: false,
      position: "center",
      showConfirmButton: false,
      icon: "success",
      timer: timeOut ? timeOut : 1500,
    });
  }

  static showInfo(msg: string, title?: string, timeOut?: number) {
    return Swal.fire({
      title: title,
      html: msg,
      toast: false,
      position: "center",
      showConfirmButton: false,
      icon: "info",
      timer: timeOut ? timeOut : 1500,
    });
  }

  static showWarning(msg: string, title?: string, timeOut?: number) {
    return Swal.fire({
      title: title,
      html: msg,
      toast: false,
      position: "center",
      showConfirmButton: false,
      icon: "warning",
      timer: timeOut ? timeOut : 1500,
    });
  }

  static showQuestion(msg: string, title?: string, timeOut?: number) {
    return Swal.fire({
      html: msg,
      title: title,
      toast: false,
      position: "center",
      showConfirmButton: false,
      icon: "question",
      timer: timeOut ? timeOut : 1500,
    });
  }

  ///////////////////// << Confirm Alert & Dialogs >>
  static ConfirmALert(
    msg: string,
    title?: string,
    // timeOut?: number,
    confirmButtonText?: string,
    cancelButtonText?: string
  ) {
    return Swal.fire({
      html: msg,
      title: title,
      position: "center",
      // timer: timeOut ? timeOut : 1500,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: confirmButtonText ? confirmButtonText : "Yes",
      cancelButtonText: cancelButtonText ? cancelButtonText : "No",
    });
  }
  ///////////////////// << Confirm Alert & Dialogs >>
  static messageWithImage(
    msg: string,
    image: string,
    title?: string,
    // timeOut?: number,
    confirmButtonText?: string,
    cancelButtonText?: string
  ) {
    return Swal.fire({
      // text: '<pre class="alertclass">' + msg + "</pre>",
      html: `<span style="color:red">${msg}</span>`,
      title: title,
      position: "center",
      // timer: timeOut ? timeOut : 1500,
      showConfirmButton: true,
      showCancelButton: true,
      imageUrl: image,
      imageAlt: "alert image",
      confirmButtonText: confirmButtonText ? confirmButtonText : "Yes",
      cancelButtonText: cancelButtonText ? cancelButtonText : "No",
    });
  }
}
