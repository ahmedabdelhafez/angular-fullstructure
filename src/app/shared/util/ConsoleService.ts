export class ConsoleService {
  static info(message: any | string) {
    console.log(
      "%c%s",
      "background: #07038C; color: #858BF2; font-size:14px",
      message
    );
  }

  static warning(message: any | string) {
    console.log(
      "%c%s",
      "background:#ff7315; color:#232020; font-size:14px",
      message
    );
  }

  static error(message: any | string) {
    console.log(
      "%c%s",
      "background:#ff0000; color:#252525; font-size:14px",
      message
    );
  }
}
