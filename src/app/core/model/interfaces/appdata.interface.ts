export interface City {
  cityId?: number;
  cityname?: string;
  country?: Country;
  getCityName(): string;
  setCityName(cityName: string);
}

export interface Country {
  countryId: number;
  countryName: string;
}
