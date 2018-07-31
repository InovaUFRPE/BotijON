import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { filterQueryId } from '@angular/core/src/view/util';

@Injectable()
export class CustomersController {
    private API_REQRES_URL = 'https://botijon.herokuapp.com/api/';
    // private API_REQRES_URL = 'http://localhost:3000/api/';

    constructor(public http: Http) { }


    createAccount(data) {
        return new Promise((resolve, reject) => {
            this.http.post(this.API_REQRES_URL + 'customers/create', data)
                .subscribe((result: any) => {
                    resolve(result.json())
                },
                    (error) => {
                        reject(error.json())
                    });
        });
    }

    getUser(id: number) {
        return new Promise((resolve, reject) => {
            let url = this.API_REQRES_URL + 'customers/' + id;
            this.http.get(url)
                .subscribe((result: any) => {
                    resolve(result.json())
                },
                    (error) => {
                        reject(error.json())
                    });
        });
    }

    changeName(id: number, customer: any) {
        return new Promise((resolve, reject) => {
            this.http.put(this.API_REQRES_URL + 'customers/changename/' + id, customer)
                .subscribe((result: any) => {
                    resolve(result.json())
                },
                    (error) => {
                        reject(error);
                    });
        });
    }

    changePassword(id: number, customer: any) {
        return new Promise((resolve, reject) => {
            this.http.put(this.API_REQRES_URL + 'customers/changepassword/' + id, customer)
                .subscribe((result: any) => {
                    resolve(result.json())
                },
                    (error) => {
                        reject(error);
                    });
        });
    }

    changeAddress(id: number, customer: any) {
        return new Promise((resolve, reject) => {
            this.http.put(this.API_REQRES_URL + 'customers/changeaddress/' + id, customer)
                .subscribe((result: any) => {
                    resolve(result.json())
                },
                    (error) => {
                        reject(error);
                    });
        });
    }

}