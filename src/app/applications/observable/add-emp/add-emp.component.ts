import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-add-emp",
  templateUrl: "./add-emp.component.html",
  styleUrls: ["./add-emp.component.css"],
})
export class AddEmpComponent implements OnInit {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {}


  backToObs(){
    this.router.navigate(['/observable']);
  }
}
