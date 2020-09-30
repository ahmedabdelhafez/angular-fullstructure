import { PaginationPosition } from "./PaginationPosition.interface";
import { ActionsButton } from "./ActionsButton.interface";
import { ActionsNames } from "./ActionsNames.enum";
export interface TableOptions {
  /** path in the `i18n` file to translate table data */
  translationPrefix?: string;
  /** show and hide pagination item */
  showPagination?: boolean;
  /** this option allow user to see the export buttons allow exports `PDF - EXCEL - CSV - TXT` */
  showExportButtons?: boolean;
  /** exported file name */
  exportFileName?: string;
  /** show expanded detail row  */
  showDetailRow?: boolean;
  /** paginator position option have three options `CENTER`,`LEFT`, 'RIGHT' */
  paginationPosition: PaginationPosition;
  /** pagination paging size that allow user to paginate the values */
  paginationPageSize: number[];
  /** initial page size for pagination */
  pageSize?: number;
  /** show or hide filter row item */
  showFilter?: boolean;
  /** if no data in datasource array this message will appear  */
  notDataMessage: string;
  /** if table have actions such as `edit row` , `delete row` */
  haveActions: boolean;
  /** if table have actions this object must be added to bind method to buttons */
  actionsButtonsMethods?: {
    [key in ActionsNames]: ActionsButton;
  };
  /** action method buttons template can contain all buttons with it's actions */
  buttonTemplate?: any;

  /** styles for pagination to apply immediaty when app start */
  paginationStyle?: {
    width?: string | number;
    height?: string | number;
    /** paginator container background color */
    bgColor?: string;
    /** paginator font color */
    color?: string;
    /** align paginator in the main box allow 3 values `flex-start`, `flex-end`, `center` */
    alignFlexSlef?: string;
  };
  /** */
  paginatorLabels?: {
    nextPageLabel?: string;
    previousPageLabel?: string;
    firstpageLabel?: string;
    lastPageLabel?: string;
    itemsPerpageLabels?: string;
  };
  /** table options such as background color , font color , width and height */
  tableStyle?: {
    /** full table background color */
    bgColor?: string;
    minWidth?: string | number;
    minHeight?: string | number;
  };
  /** header cell style the style will be applied for all header cells only */
  headerCellStyle?: {
    /** header cll background color prefer color e.x `#ffffff` */
    bgColor?: string;
    /** font text color */
    color?: string;
    /** text align */
    alignText?: "center" | "right" | "left";
    /** header text font size */
    fontSize?: string;
  };
  /**  rows cells style for every rows expect headers */
  rowsCellStyle?: {
    /** row cll background color prefer color e.x `#ffffff` */
    bgColor?: string;
    /** font text color */
    color?: string;
    /** text align */
    alignText?: "center" | "right" | "left";
    /** rows text font size */
    fontSize?: string;
  };
}
