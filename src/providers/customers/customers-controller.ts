import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { filterQueryId } from '@angular/core/src/view/util';

@Injectable()
export class CustomersController {
    private API_REQRES_URL = 'https://botijon.herokuapp.com/api/';

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

    updateUser(id: number, customer: any) {
        return new Promise((resolve, reject) => {
            this.http.put(this.API_REQRES_URL + 'customers/update/' + id, customer)
                .subscribe((result: any) => {
                    resolve(result.json())
                },
                    (error) => {
                        reject(error);
                    });
        });
    }

}