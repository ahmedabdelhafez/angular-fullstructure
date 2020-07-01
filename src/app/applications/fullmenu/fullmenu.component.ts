import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  PLATFORM_ID,
} from "@angular/core";

import { ActivatedRoute, Router } from "@angular/router";
import { NgxIndexedDBService } from "ngx-indexed-db";
import { HttpClient } from "@angular/common/http";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { AppAlert } from "src/app/shared/util/AppAlert";
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from "@angular/forms";
import { debounceTime, delay, map, distinctUntilChanged } from "rxjs/operators";
import { Observable, fromEvent } from "rxjs";
import { PostService } from "src/app/services/post.service";
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
// import * as $ from "jquery";
declare var $: any;

@Component({
  selector: "app-fullmenu",
  templateUrl: "./fullmenu.component.html",
  styleUrls: ["./fullmenu.component.scss"],
})
export class FullmenuComponent implements OnInit, AfterViewInit {
  imgItems = [
    "assets/images/slider/1.jpg",
    "assets/images/slider/2.jpg",
    "assets/images/slider/3.jpg",
    "assets/images/slider/4.jpg",
    "assets/images/slider/5.jpg",
  ];

  @ViewChild("screen", { static: true }) screen: ElementRef<HTMLElement>;
  @ViewChild("imgItem", { static: true }) imgItem: ElementRef<HTMLElement>;
  date;
  windowEvent$ = fromEvent(window, "scroll");

  items = [
    { cityId: 1, cityName: "cairo", countryName: "egypt" },
    { cityId: 2, cityName: "giza", countryName: "egypt" },
    { cityId: 3, cityName: "suez", countryName: "egypt" },
    { cityId: 4, cityName: "roma", countryName: "italy" },
    { cityId: 5, cityName: "milan", countryName: "italy" },
    { cityId: 6, cityName: "verona", countryName: "italy" },
  ];

  import;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder,
    private postService: PostService
  ) {}
  allCity: any = [];
  arrLenght = 0;
  myform: FormGroup;
  imgFile = "../../../assets/images/slider/1.jpg";

  images = [
    {
      id: 1,
      img: "assets/images/slider/1.jpg",
      title: "my lovely car",
      heading: "some data here",
    },
    {
      id: 3,
      img: "assets/images/slider/3.jpg",
      title: "dont touch my car",
      heading: "some data here",
    },
    {
      id: 4,
      img: "assets/images/slider/4.jpg",
      title: "mercendes s is the best",
      heading: "dummy subtitle",
    },
    {
      id: 5,
      img: "assets/images/slider/5.jpg",
      title: "next amazing one",
      heading: "some data here",
    },
  ];
  images2 = [
    { id: 1, img: "../../../assets/images/slider/1.jpg" },
    { id: 2, img: "../../../assets/images/slider/3.jpg" },
    { id: 3, img: "../../../assets/images/slider/5.jpg" },
  ];

  ngOnInit() {
    this.myform = this.fb.group({
      cityId: [null, [Validators.required], [this.cityAsyncValidation()]],
      cityName: [null, [Validators.required]],
    });

    this.postService.getCitys().subscribe((data) => {
      this.allCity = data;
    });
  }

  ngAfterViewInit() {
    this.arrLenght = this.allCity.length;
    let slickElement = $(".my-slider");
  }

  onSave() {
    console.log(this.myform.value);
  }

  cityAsyncValidation(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      let val = control.value as string;
      return this.http
        .get(`http://localhost:3000/api/city/findcity/${val}`)
        .pipe(
          delay(500),
          distinctUntilChanged(),
          map((ele) => {
            return ele ? { cityUsed: true } : null;
          })
        );
    };
  }
}
