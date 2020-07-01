import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { City } from "../../model/CityDataSource.interface";

@Injectable({
  providedIn: "root"
})
export class CityService {
  constructor(private http: HttpClient) {}

  getCity(
    cityId: number,
    filter = "",
    sortOrder = "asc",
    pageNumber = 0,
    pageSize = 3
  ) {
    return this.http.get("http://localhost:3000/api/city/citypage", {
      params: new HttpParams()
        .set("cityid", cityId.toString())
        .set("filter", filter)
        .set("sortprder", sortOrder)
        .set("pagenumber", pageNumber.toString())
        .set("pagesize", pageSize.toString())
    });
  }

  getAlCity() {
    return this.http.get<any>("http://localhost:3000/api/city/findall");
  }

  getCityPage(page: number = 0, limit: number = 5) {
    return this.http.get<City[]>("http://localhost:3000/api/city/citypagination", {
      params: new HttpParams()
        .set("page", page.toString())
        .set("limit", limit.toString())
    });
  }
}
