/** city interface equal to city model inthe database or income API */
export interface City {
  cityId: number;
  cityName: string;
  country: Country;
}

/** country interface equal to country model inthe database or income API */
export interface Country {
  countryId: number;
  countryName: string;
}
