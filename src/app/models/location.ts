export class Location {
  locationName: String;
  address: String;
  streetNumber: String;
  postalCode: Number;
  country: String;
  city: String;
  lat: number;
  lng: number;
  formatedAddress: String;

  constructor() {
    this.locationName = '';
    this.address = '';
    this.streetNumber = '';
    this.postalCode = null;
    this.country = '';
    this.city = '';
    this.lat = null;
    this.lng = null;
    this.formatedAddress = '';
  }
}
