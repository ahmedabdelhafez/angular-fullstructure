import {
  Directive,
  ElementRef,
  Renderer2,
  OnInit,
  AfterViewInit,
  HostListener,
  Input,
} from "@angular/core";

@Directive({
  selector: "[appRoles]",
})
/**
 * this directive is used to set the roles for any part of application and check `JWT`
 * after decoding it and extract roles from it and compare it with `rolesData` Input to check if
 * the user have access or allowed to see this part of UI
 */
export class RolesDirective implements OnInit, AfterViewInit {
  @Input("rolesData") rolesData: string | string[];
  
  constructor(private el: ElementRef, private render: Renderer2) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {}
}
