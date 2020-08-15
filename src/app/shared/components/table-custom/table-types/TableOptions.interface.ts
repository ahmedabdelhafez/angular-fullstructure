import { PaginationPosition } from "./PaginationPosition.interface";
import { ActionsButton } from "./ActionsButton.interface";
export interface TableOptions {
  /** show and hide pagination item */
  showPagination: boolean;
  /** show expanded detail row  */
  showDetailRow: boolean;
  /** paginator position option have three options `CENTER`,`LEFT`, 'RIGHT' */
  paginationPosition: PaginationPosition;
  /** pagination paging size that allow user to paginate the values */
  paginationPageSize: number[];
  //** initial page size in pagination */
  pageSize?: number;
  /** show or hide filter row item */
  showFilter?: boolean;
  /** if no data in datasource array this message will appear  */
  notDataMessage: string;
  /** if table have actions such as `edit row` , `delete row` */
  haveActions: boolean;
  /** */
  actionsButtons?: ActionsButton;
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
    bgColor?: string;
    minWidth?: string | number;
    minHeight?: string | number;
  };
  /** cells style */
  headerCellStyle?: {
    bgColor: string;
    color: string;
    alignText: "center" | "right" | "left";
  };
  /**  rows style */
  rowsCellStyle?: {
    bgColor: string;
    color: string;
    alignText: "center" | "right" | "left";
  };
}
