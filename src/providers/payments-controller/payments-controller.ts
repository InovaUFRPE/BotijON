import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class PaymentsControllerProvider {
  private API_REQRES_URL = 'https://botijon.herokuapp.com/api/';

  constructor(public http: Http) {
    console.log('Hello PaymentsControllerProvider Provider');
  }

  createPayment(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.API_REQRES_URL + 'payments/create', data)
        .subscribe((result: any) => {
          resolve(result.json())
        },
          (error) => {
            reject(error.json())
          });
    });
  }

  getPaymenttById(id: number) {
    return new Promise((resolve, reject) => {
      let url = this.API_REQRES_URL + 'payments/' + id;
      this.http.get(url)
        .subscribe((result: any) => {
          resolve(result.json())
        },
          (error) => {
            reject(error.json())
          });
    });
  }

  getPaymentsPerTypeAndStatus(payment: any) {
    return new Promise((resolve, reject) => {
      let url = this.API_REQRES_URL + 'payments/typestatus/' + JSON.stringify(payment);
      this.http.get(url)
        .subscribe((result: any) => {
          resolve(result.json())
        },
          (error) => {
            reject(error.json())
          });
    });
  }

  changePaymentValue(id: number, payment: any) {
    return new Promise((resolve, reject) => {
      this.http.put(this.API_REQRES_URL + 'payments/changevalue/' + id, payment)
        .subscribe((result: any) => {
          resolve(result.json())
        },
          (error) => {
            reject(error);
          });
    });
  }

  changePaymentStatus(id: number, payment: any) {
    return new Promise((resolve, reject) => {
      this.http.put(this.API_REQRES_URL + 'payments/changestatus/' + id, payment)
        .subscribe((result: any) => {
          resolve(result.json())
        },
          (error) => {
            reject(error);
          });
    });
  }

}