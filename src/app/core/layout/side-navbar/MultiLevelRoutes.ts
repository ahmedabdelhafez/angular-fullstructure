import { MultilevelNodes } from "ng-material-multilevel-menu";
import { ActivatedRoute, Router } from "@angular/router";
export class MultiLevelMenu {
  constructor(
    private activatedRoute?: ActivatedRoute,
    private router?: Router,
    private menuStateAr?: any,
    private menuStateEn?: any
  ) {
      
  }
  multiLevelRoutes: MultilevelNodes[] = [
    {
      label: "home",
      data: { name: "home" },
      onSelected: () => {
        this.router.navigate(["/"]);
        this.menuStateAr = "hide";
        this.menuStateEn = "hide";
      },
      faIcon: "fa fa-home",
      activeFaIcon: "fa fa-calculator",
      link: "/",
    },
    {
      label: "testprint",
      data: { name: "testprint" },
      icon: "alarm",
      link: "testprint",
      onSelected: () => {
        this.router.navigate(["/testprint"]);
        this.menuStateAr = "hide";
        this.menuStateEn = "hide";
      },
      navigationExtras: { relativeTo: this.activatedRoute },
    },
    {
      label: "teststyle",
      data: { name: "teststyle" },
      link: "/teststyle",
      icon: "offline_pin",
      activeIcon: "pan_tool",
      onSelected: () => {
        this.router.navigate(["/teststyle"]);
        this.menuStateAr = "hide";
        this.menuStateEn = "hide";
      },
      navigationExtras: { relativeTo: this.activatedRoute },
    },
    {
      label: "aboutus",
      data: { name: "aboutus" },
      link: "/aboutus",
      onSelected: () => {
        this.router.navigate(["/aboutus"]);
        this.menuStateAr = "hide";
        this.menuStateEn = "hide";
      },
      navigationExtras: {
        relativeTo: this.activatedRoute,
      },
      icon: "star_rate",
      hidden: false,
      items: [
        {
          label: "more about",
          icon: "home",
          activeIcon: "note",
          onSelected: () => {
            this.menuStateAr = "hide";
            this.menuStateEn = "hide";
          },
          data: { name: "moreabout" },
          items: [
            {
              label: "grid",
              icon: "grid",
              activeIcon: "note",
              data: { name: "grid" },
              onSelected: () => {
                this.menuStateAr = "hide";
                this.menuStateEn = "hide";
              },
            },
          ],
        },
      ],
    },
    {
      label: "fullmenu",
      data: { name: "fullmenu" },
      link: "/fullmenu",
      onSelected: () => {
        this.router.navigate(["/fullmenu"]);
        this.menuStateAr = "hide";
        this.menuStateEn = "hide";
      },
      navigationExtras: {
        relativeTo: this.activatedRoute,
      },
      icon: "star_rate",
      hidden: false,
    },
    {
      label: "observable",
      data: { name: "observable" },

      link: "/observable",
      onSelected: () => {
        this.router.navigate(["/observable"]);
        this.menuStateAr = "hide";
        this.menuStateEn = "hide";
      },
      navigationExtras: {
        relativeTo: this.activatedRoute,
      },
      icon: "star_rate",
      hidden: false,
    },
    {
      label: "grid",
      data: { name: "grid" },
      link: "/grid",
      icon: "offline_pin",
      onSelected: () => {
        this.router.navigate(["/grid"]);
        this.menuStateAr = "hide";
        this.menuStateEn = "hide";
      },
      navigationExtras: { relativeTo: this.activatedRoute },
    },
    {
      label: "materialtest",
      data: { name: "materialtest" },
      link: "/materialtest",
      icon: "offline_pin",
      onSelected: () => {
        this.router.navigate(["/materialtest"]);
        this.menuStateAr = "hide";
        this.menuStateEn = "hide";
      },
      navigationExtras: { relativeTo: this.activatedRoute },
    },
    {
      label: "sliders",
      data: { name: "sliders" },
      link: "/sliders",
      icon: "offline_pin",
      onSelected: () => {
        this.router.navigate(["/sliders"]);
        this.menuStateAr = "hide";
        this.menuStateEn = "hide";
      },
      navigationExtras: { relativeTo: this.activatedRoute },
    },
  ];
}
