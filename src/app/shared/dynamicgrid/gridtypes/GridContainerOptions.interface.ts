import { GridGap } from "./GridGap.interface";
import { GridFlowOption } from "./GridFlowOptions.enum";
import { GridTemplateColumns } from "./GridTemplateColumns.interface";
import { GridTemplateRows } from "./GridTemplateRows.interface";
import { GridColumnOptions } from "./GridColumnOptions.enum";

export interface GridContainerOptions {
  gridColumnOptions: GridColumnOptions;
  /**
   * @description this property is used to specifiy the initial column size options
   */
  gridTemplateColumn: GridTemplateColumns;
  /**
   * @description this property is usd to specify the intial rows size options
   */
  gridTemplateRow: GridTemplateRows;
  /**
   * @description this property is used to specift the space between column and rows
   */
  gridGap: GridGap;
  gridFlowOption: GridFlowOption;
  gridAutoRows?: any;
  gridAutoColumns?: any;
  /**
   * @description when the `grid-auto-flow` is column we apply this options to the grid container
   * to allow the user to navigate to the end of the columns
   */
  gridOverflowColumn?: any;
}
