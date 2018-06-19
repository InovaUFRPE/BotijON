import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { filterQueryId } from '@angular/core/src/view/util';

@Injectable()
export class SellersController {
    private API_REQRES_URL = 'http://localhost:3000/api/';

    constructor(public http: Http) { }


    createAccount(data) {
        return new Promise((resolve, reject) => {
            this.http.post(this.API_REQRES_URL + 'sellers/create', data)
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
            let url = this.API_REQRES_URL + 'sellers/' + id;
            this.http.get(url)
                .subscribe((result: any) => {
                    resolve(result.json())
                },
                    (error) => {
                        reject(error.json())
                    });
        });
    }

    updateUser(id: number, seller: any) {
        return new Promise((resolve, reject) => {
            this.http.put(this.API_REQRES_URL + 'sellers/update/' + id, seller)
                .subscribe((result: any) => {
                    resolve(result.json())
                },
                    (error) => {
                        reject(error);
                    });
        });
    }

}