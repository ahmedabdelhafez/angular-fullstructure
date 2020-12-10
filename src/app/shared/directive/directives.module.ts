import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LazyloadingImageDirective } from "./lazyloading-image.directive";
import { BoxOverflowDirective } from "./box-overflow.directive";
import { ArabicOnlyDirective } from "./arabic-only.directive";
import { LatinOnlyDirective } from "./latin-only.directive";
import { LatinwithnumberDirective } from "./latinwithnumber.directive";
import { CurrencyIconDirective } from "./currency-icon.directive";
import { CustomPopoverDirective } from "./custom-popover.directive";
import { RtlDirective } from "./rtl.directive";
import { StaticNavbarDirective } from "./static-navbar.directive";
import { ReactiveitemvalidationDirective } from "./reactive-item-validation.directive";
import { ItemvalidationDirective } from "./itemvalidation.directive";

@NgModule({
  imports: [CommonModule],
  declarations: [
    LazyloadingImageDirective,
    BoxOverflowDirective,
    ArabicOnlyDirective,
    LatinOnlyDirective,
    LatinwithnumberDirective,
    CurrencyIconDirective,
    CustomPopoverDirective,
    RtlDirective,
    StaticNavbarDirective,
    ReactiveitemvalidationDirective,
    ItemvalidationDirective,
  ],
  exports: [
    LazyloadingImageDirective,
    BoxOverflowDirective,
    ArabicOnlyDirective,
    LatinOnlyDirective,
    LatinwithnumberDirective,
    CurrencyIconDirective,
    CustomPopoverDirective,
    RtlDirective,
    StaticNavbarDirective,
    ReactiveitemvalidationDirective,
    ItemvalidationDirective,
  ],
})
export class DirectivesModule {}
