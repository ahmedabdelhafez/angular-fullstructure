export interface MaterialColumn {
  /** specify the column name */
  columnName: string;
  /** determine that is the column visible or not */
  visible: boolean;
  /** make column fixed on left or right based on page dir */
  stickyColumn?: boolean;
  /** specify width for column */
  columnWidth?: string;
  /** column font color */
  fontColor?: string;
  /** column background color */
  bgColor?: string;
}
