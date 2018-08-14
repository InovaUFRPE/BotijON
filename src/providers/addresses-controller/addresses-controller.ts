import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AddressesControllerProvider {
  private API_REQRES_URL = 'https://botijon.herokuapp.com/api/';
  //private API_REQRES_URL = 'http://localhost:3000/api/';

/*   //URL para solicitar geocode do Google Geocoding API
  private urlServer: any = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
  //Key da Google Geocoding API
  private apiKey: any = '&key=AIzaSyAwvuTwzNljFlBMH0mHbdRjQeHh3nV-608'; */

  constructor(public http: Http) {
    console.log('Hello AddressesControllerProvider Provider');
  }

  createAddress(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.API_REQRES_URL + 'addresses/create', data)
        .subscribe((result: any) => {
          resolve(result.json())
        },
          (error) => {
            reject(error.json())
          });
    });
  }

  getAddressPerAddressCepAndNumber(address: any) {
    return new Promise((resolve, reject) => {
      let url = this.API_REQRES_URL + 'addresses/getid/' + JSON.stringify(address);
      this.http.get(url)
        .subscribe((result: any) => {
          resolve(result.json())
        },
          (error) => {
            reject(error.json())
          });
    });
  }

  getAddressById(id:number) {
    return new Promise((resolve, reject) => {
      let url = this.API_REQRES_URL + 'addresses/' + id;
      this.http.get(url)
        .subscribe((result: any) => {
          resolve(result.json())
        },
          (error) => {
            reject(error.json())
          });
    });
  }

  updateAddress(id: number, address: any) {
    return new Promise((resolve, reject) => {
      this.http.put(this.API_REQRES_URL + 'addresses/update/' + id, address)
        .subscribe((result: any) => {
          resolve(result.json())
        },
          (error) => {
            reject(error);
          });
    });
  }

/*   //Obter coordenadas
  getCoordenates(addressString: any) {
    let urlApi = this.urlServer + addressString + this.apiKey;
    return new Promise((resolve, reject) => {
      this.http.get(urlApi)
        .subscribe((result:any) => {
          resolve(result.json());
        },
        (error) => {
          reject(error);
        });
    });
  }

  //Criando string para usar na função getCoordenates
  stringAddress(addressObject: any) {
    let addressString = addressObject.number + '+' + addressObject.address + '+' + addressObject.neighborhood;
    return addressString;
  } */

}
