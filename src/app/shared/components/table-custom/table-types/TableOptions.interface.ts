import { PaginationPosition } from "./PaginationPosition.interface";
export interface TableOptions {
  /**  show and hide pagination ite */
  showPagination: boolean;
  paginationPosition: PaginationPosition;
  paginationPageSize: number[];
  showFilter: boolean;
  notDataMessage: string;
}
