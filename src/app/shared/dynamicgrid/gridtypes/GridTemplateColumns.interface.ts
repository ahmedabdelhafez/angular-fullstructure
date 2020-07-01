import { FallSize } from "./FallSize.enum";

export interface GridTemplateColumns {
  /**
   * @description `initialSize` property is used to specify the initial size for every column in the grid container
   * if the `grid_column_option` is `RESPONSIVE`
   */
  initialSize: number;
  /**
   * @description `columnCount` property is used for specify the initial grid columns in grid container
   * if the `grid_column_option` is `FIXED`
   */
  columnCount: number;
  /**
   * @description 'fallSize' used to make all Grid column Responsive
   * @default '1fr' or `auto`
   */
  fallSize?: FallSize;
}
