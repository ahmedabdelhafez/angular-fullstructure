import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-material-child-navbar",
  templateUrl: "./material-child-navbar.component.html",
  styleUrls: ["./material-child-navbar.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class MaterialChildNavbarComponent implements OnInit, OnChanges {
  @Input("navigationLinks") navigationLinks: any;
  @Input("activeLinkStyle") activeLinkStyle: string;
  @Input("translationPrefix") translationPrefix: string = "";
  @Input("parentRouter") parentRouter: ActivatedRoute;
  constructor(private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
  }

  navigateRouterLink(routerLink: string) {
    this.router.navigate([routerLink], { relativeTo: this.parentRouter });
  }
  ngOnInit() {}
}
