import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TeststyleComponent } from "./teststyle/teststyle.component";
import { SharedModule } from "../shared/shared.module";
import { TestprintComponent } from "./testprint/testprint.component";
import { FullmenuComponent } from "./fullmenu/fullmenu.component";
import { MaterialModule } from "../shared/material.module";
import { ObservableComponent } from "./observable/observable.component";
import { ProfileComponent } from "./profile/profile.component";
import { BootstrapngxModule } from "../shared/bootstrapngx.module";
import { GridComponent } from "./grid/grid.component";
import { DargDropComponent } from "./darg-drop/darg-drop.component";
import { DynamicgridModule } from "../shared/dynamicgrid/dynamicgrid.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SwiperSliderModule } from "../shared/components/swiper-slider/swiper-slider.module";
import { HttpcardModule } from "../shared/components/httpcard/httpcard.module";
import { DialogModule } from "../shared/components/dialog/dialog.module";
import { UploaderModule } from "../shared/components/uploader/uploader.module";
import { SearchModule } from "../shared/components/search/search.module";
import { MaterialTestComponent } from "./material-test/material-test.component";
import { ItemviewComponent } from "./grid/itemview/itemview.component";
import { NgxPaginationModule } from "ngx-pagination";
import { EventCalendarModule } from "../shared/components/event-calendar/event-calendar.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { HeaderSectionModule } from "../shared/components/header-section/header-section.module";
import { SliderComponent } from "./slider/slider.component";
import { TableCustomModule } from "../shared/components/table-custom/tablecustom.module";
import { UilibraryModule } from "../shared/ui-library/uilibrary.module";
// const route: Routes = [
//   { path: '', component: TeststyleComponent }
// ]

@NgModule({
  declarations: [
    TeststyleComponent,
    TestprintComponent,
    FullmenuComponent,
    ObservableComponent,
    ProfileComponent,
    GridComponent,
    MaterialTestComponent,
    ItemviewComponent,
    SliderComponent,
    DargDropComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    BootstrapngxModule,
    DynamicgridModule,
    FormsModule,
    ReactiveFormsModule,
    SwiperSliderModule,
    HttpcardModule,
    DialogModule,
    UploaderModule,
    BootstrapngxModule,
    SearchModule,
    NgxPaginationModule,
    EventCalendarModule,
    FlexLayoutModule,
    HeaderSectionModule,
    TableCustomModule,
    UilibraryModule,
  ],
  exports: [
    TeststyleComponent,
    TestprintComponent,
    ProfileComponent,
    GridComponent,
    MaterialTestComponent,
    SliderComponent,
    UilibraryModule,
    DargDropComponent,
  ],
  entryComponents: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ApplicationsModule {}
