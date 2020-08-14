import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { CityService } from "../../../services/datasource_service/City.service";
import { BehaviorSubject, Subject, of } from "rxjs";
import { catchError, finalize, delay } from "rxjs/operators";
import { City } from "src/app/core/model/CityDataSource.interface";

export class CityDataSource extends DataSource<any> {
  dataSourceType: any;
  constructor(private cityService: CityService) {
    super();
  }

  private cityData = new BehaviorSubject<City[]>([]);
  // to show the total number of records
  private countSubject = new BehaviorSubject<number>(0);
  public counter$ = this.countSubject.asObservable();
  private isLoading = new BehaviorSubject<boolean>(false);
  public loading$ = this.isLoading.asObservable();

  getCityData(
    pageIndex: number,
    pageSize: number,
    sortColumnName: string,
    sortDirection: string
  ) {
    this.isLoading.next(true);
    this.cityService
      .getCityPage(pageIndex, pageSize, sortColumnName,sortDirection)
      .pipe(finalize(() => this.isLoading.next(false)))
      .subscribe((data) => {
        this.cityData.next(data["data"]);
        this.countSubject.next(data["total"]); // get total rcords
      });
  }

  connect(
    collectionViewer: CollectionViewer
  ): import("rxjs").Observable<City[] | readonly any[]> {
    return this.cityData.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.cityData.complete();
    this.countSubject.complete();
    this.isLoading.complete();
  }
}
