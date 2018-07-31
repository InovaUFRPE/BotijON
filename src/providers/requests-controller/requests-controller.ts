import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class RequestsControllerProvider {
  private API_REQRES_URL = 'https://botijon.herokuapp.com/api/';
  // private API_REQRES_URL = 'http://localhost:3000/api/';

  constructor(public http: Http) {
    console.log('Hello RequestsControllerProvider Provider');
  }

  createRequest(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.API_REQRES_URL + 'requests/create', data)
        .subscribe((result: any) => {
          resolve(result.json())
        },
          (error) => {
            reject(error.json())
          });
    });
  }

  getRequest(id: number) {
    return new Promise((resolve, reject) => {
      let url = this.API_REQRES_URL + 'requests/' + id;
      this.http.get(url)
        .subscribe((result: any) => {
          resolve(result.json())
        },
          (error) => {
            reject(error.json())
          });
    });
  }

  getIdOfRequest(request: any) {
    return new Promise((resolve, reject) => {
      let url = this.API_REQRES_URL + 'requests/getid/' + JSON.stringify(request);
      this.http.get(url)
        .subscribe((result: any) => {
          resolve(result.json())
        },
          (error) => {
            reject(error.json())
          });
    });
  }

  updateRequest(id: number, request: any) {
    return new Promise((resolve, reject) => {
      this.http.put(this.API_REQRES_URL + 'requests/update/' + id, request)
        .subscribe((result: any) => {
          resolve(result.json())
        },
          (error) => {
            reject(error);
          });
    });
  }

}
