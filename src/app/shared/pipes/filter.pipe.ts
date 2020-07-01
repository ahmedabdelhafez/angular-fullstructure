import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filter",
})
export class FilterPipe implements PipeTransform {
  transform(value: any[], itemName?: string): any {
    if (!value) {
      return [];
    }

    return value.filter((ele) => {
      if (itemName) {
        return ele.name.toLowerCase().includes(itemName.toLowerCase());
      }
      return false;
    });
  }
}
