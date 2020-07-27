/** city interface equal to city model in the database or income API */
export interface City {
  cityId: number;
  cityName: string;
  country: Country;
}

/** country interface equal to country model in the database or income API */
export interface Country {
  countryId: number;
  countryName: string;
}
