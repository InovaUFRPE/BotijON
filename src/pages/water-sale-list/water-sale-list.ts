import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductsControllerProvider } from '../../providers/products-controller/products-controller';

@IonicPage()
@Component({
  selector: 'page-water-sale-list',
  templateUrl: 'water-sale-list.html',
})
export class WaterSaleListPage {

  product = { 
    "product_type": "agua", 
    "status": "available" 
  }
  list_waters = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private productsController: ProductsControllerProvider) {
      this.returnProducts();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WaterSaleListPage');
  }

  returnProducts() {
    this.productsController.getProductsPerTypeAndStatus(this.product).then((res:any) => {
      this.list_waters = res.data;
      console.log(this.list_waters);
    }).catch((e) => console.error(e));
  }

}
