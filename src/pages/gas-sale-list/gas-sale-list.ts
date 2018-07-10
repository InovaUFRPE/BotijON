import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductsControllerProvider } from '../../providers/products-controller/products-controller';

@IonicPage()
@Component({
  selector: 'page-gas-sale-list',
  templateUrl: 'gas-sale-list.html',
})
export class GasSaleListPage {

  product = {
    "product_type": "gas",
    "status": "available"
  }
  list_gas = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private productsController: ProductsControllerProvider) {
    this.returnProducts();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GasSaleListPage');
  }

  returnProducts() {
    this.productsController.getProductsPerTypeAndStatus(this.product).then((res: any) => {
      this.list_gas = res.data;
      console.log(this.list_gas);
    }).catch((e) => console.error(e));
  }

}
