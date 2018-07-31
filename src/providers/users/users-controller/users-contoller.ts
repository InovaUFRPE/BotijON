import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { filterQueryId } from '@angular/core/src/view/util';

@Injectable()
export class UsersController {
    private API_REQRES_URL = 'https://botijon.herokuapp.com/api/';
    // private API_REQRES_URL = 'http://localhost:3000/api/';

    constructor(public http: Http) { }

    validationCustomer(customer: any){
        return new Promise((resolve, reject) => {
            this.http.get(this.API_REQRES_URL + 'customers/validation/' + JSON.stringify(customer))
                .subscribe((result: any) => {
                    resolve(result.json())
                },
                    (error) => {
                        reject(error);
                    });
        });
    }

    validationSeller(seller: any){
        return new Promise((resolve, reject) => {
            this.http.get(this.API_REQRES_URL + 'sellers/validation/' + JSON.stringify(seller))
                .subscribe((result: any) => {
                    resolve(result.json())
                },
                    (error) => {
                        reject(error);
                    });
        });
    }

}