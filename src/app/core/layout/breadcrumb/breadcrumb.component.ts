import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { isNullOrUndefined } from 'util';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  currentUrl: string | string[] = '';
  urlArr: string[] = [];
  translateUrlArr: any[] = [];
  incomeUrl: string;
  fullChildUrl: string = '';
  url = 'home';

  /** ge ttranslationArray length */
  trandlsateArrLenght: number = this.translateUrlArr.length - 1;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private translateService: TranslateService
  ) {}

  static readonly ROUTE_DATA_BREADCRUMB = 'breadcrumb';
  // readonly home = { icon: "fa fa-home", url: "home" };
  menuItems = [];

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(
        () =>
          (this.menuItems = this.createBreadcrumbs(this.activatedRoute.root))
      );
    this.menuItems = this.createBreadcrumbs(this.activatedRoute.root);

    this.translateService.onLangChange.subscribe((data) => {
      this.createBreadcrumbs(this.activatedRoute.root);
    });
  }

  private createBreadcrumbs(
    route: ActivatedRoute,
    url: string = 'home',
    breadcrumbs: any[] = []
  ): any[] {
    const children: ActivatedRoute[] = route.children;

    // if there is no children
    if (children.length === 0) {
      // console.log("all breadcrumbs");
      // console.log(breadcrumbs.shift());
      return breadcrumbs.shift();
    }

    // << if the current router has at least one child  >> //

    for (const child of children) {
      console.log('current child route');
      console.log(child);

      if (!child.snapshot.url) {
        return;
      }
      const routeURL: string = child.snapshot?.url
        ? child.snapshot?.url[0]?.path
        : '';
      // .map((segment) => {
      //   console.log('current url segment');
      //   console.log(segment);

      //   return segment.path;
      // })
      // .join('/');
      if (routeURL !== '' && routeURL) {
        url += `/${routeURL}`;
      }

      const label = child.snapshot.data[
        BreadcrumbComponent.ROUTE_DATA_BREADCRUMB
      ];
      if (label !== null || label !== undefined) {
    

        // breadcrumbs.push(url);
        breadcrumbs.push(this.getUrlTranslation(url));
      }
      this.fullChildUrl = url;

      return this.createBreadcrumbs(child, url, breadcrumbs);
    }
  }

  /** get translation for url */
  getUrlTranslation(url: string): string {
    let currUrl: any;
    if (url === 'home') {
      this.urlArr = ['/'];
      // console.log("in the home page");

      // this.urlArr.push("home");
    } else {
      this.urlArr = [];
      this.urlArr = url.split('/');
      // console.log("url arr: " + this.urlArr);
      // remove this first element from the array [Home] element
      // this.urlArr.shift();
    }
    this.translateUrlArr = this.urlArr.map((ele) => {
      // console.log('current elemnt: ' + ele);
      if (ele === 'home' || ele === null || ele === '/') {
        let urlTranslated = this.translateService.instant('URL-TRANSLATE.home');
        return { urlTranslated: urlTranslated, realUrl: '/', icon: 'home' };
      } else {
        // << get the url before the query parameter (?) >> //
        let urlTranslated = this.translateService.instant(
          'URL-TRANSLATE.' +
            ele.substring(
              0,
              ele.indexOf('?', 1) !== -1 ? ele.indexOf('?', 1) : ele.length
            )
        );
        // console.log(urlTranslated);

        return { urlTranslated: urlTranslated, realUrl: ele, icon: 'add' };
      }
      // console.log(this.translate.getTranslation('URL-TRANSLATE.' + ele));
      //return this.translate.getTranslation('URL-TRANSLATE.' + ele);
    });
    // console.log('translation url');

    // console.log(this.translateUrlArr);
    if (this.translateUrlArr.length === 1) {
      // currUrl = this.translateUrlArr[0];
      currUrl = this.translateUrlArr;
    } else {
      // currUrl = this.translateUrlArr.join(" = ");
      currUrl = this.translateUrlArr;
    }
    // console.log('Final URL: ' + currUrl);
    this.currentUrl = currUrl;
    return currUrl;
  }

  goLink(item) {
    this.router.navigateByUrl(item, {
      relativeTo: this.activatedRoute,
    });
  }
}
