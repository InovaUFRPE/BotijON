import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductsControllerProvider {
  private API_REQRES_URL = 'https://botijon.herokuapp.com/api/';

  constructor(public http: Http) {
    console.log('Hello ProductsControllerProvider Provider');
  }

  createProduct(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.API_REQRES_URL + 'products/create', data)
        .subscribe((result: any) => {
          resolve(result.json())
        },
          (error) => {
            reject(error.json())
          });
    });
  }

  getProductById(id: number) {
    return new Promise((resolve, reject) => {
      let url = this.API_REQRES_URL + 'products/' + id;
      this.http.get(url)
        .subscribe((result: any) => {
          resolve(result.json())
        },
          (error) => {
            reject(error.json())
          });
    });
  }

  getProductsPerType(type: string) {
    return new Promise((resolve, reject) => {
      let url = this.API_REQRES_URL + 'products/pertype/' + type;
      this.http.get(url)
        .subscribe((result: any) => {
          resolve(result.json())
        },
          (error) => {
            reject(error.json())
          });
    });
  }

  getProductsPerTypeAndStatus(product: any) {
    return new Promise((resolve, reject) => {
      let url = this.API_REQRES_URL + 'products/availabletypes/' + JSON.stringify(product);
      this.http.get(url)
        .subscribe((result: any) => {
          resolve(result.json())
        },
          (error) => {
            reject(error.json())
          });
    });
  }

  getProductsPerDescription(description: string) {
    return new Promise((resolve, reject) => {
      let url = this.API_REQRES_URL + 'products/description/' + description;
      this.http.get(url)
        .subscribe((result: any) => {
          resolve(result.json())
        },
          (error) => {
            reject(error.json())
          });
    });
  }

  getProductsBiggerValue(value: number) {
    return new Promise((resolve, reject) => {
      let url = this.API_REQRES_URL + 'products/biggervalue/' + value;
      this.http.get(url)
        .subscribe((result: any) => {
          resolve(result.json())
        },
          (error) => {
            reject(error.json())
          });
    });
  }

  getProductsSmallerValue(value: number) {
    return new Promise((resolve, reject) => {
      let url = this.API_REQRES_URL + 'products/smallervalue/' + value;
      this.http.get(url)
        .subscribe((result: any) => {
          resolve(result.json())
        },
          (error) => {
            reject(error.json())
          });
    });
  }

  changeProductDescription(id: number, product: any) {
    return new Promise((resolve, reject) => {
      this.http.put(this.API_REQRES_URL + 'products/changedescription/' + id, product)
        .subscribe((result: any) => {
          resolve(result.json())
        },
          (error) => {
            reject(error);
          });
    });
  }

  changeProductValue(id: number, product: any) {
    return new Promise((resolve, reject) => {
      this.http.put(this.API_REQRES_URL + 'products/changevalue/' + id, product)
        .subscribe((result: any) => {
          resolve(result.json())
        },
          (error) => {
            reject(error);
          });
    });
  }

  changeProductStatus(id: number, product: any) {
    return new Promise((resolve, reject) => {
      this.http.put(this.API_REQRES_URL + 'products/changestatus/' + id, product)
        .subscribe((result: any) => {
          resolve(result.json())
        },
          (error) => {
            reject(error);
          });
    });
  }

}
