import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AddressesControllerProvider {
  private API_REQRES_URL = 'https://botijon.herokuapp.com/api/';

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

}
