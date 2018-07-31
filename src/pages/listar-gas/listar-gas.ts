import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductsControllerProvider } from '../../providers/products-controller/products-controller';
import { ProdutoPage } from '../produto/produto';

@IonicPage()
@Component({
  selector: 'page-listar-gas',
  templateUrl: 'listar-gas.html',
})
export class ListarGasPage {

  product: any = {
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
    console.log('ionViewDidLoad ListarGasPage');
  }

  clickItem(product) {
    this.navCtrl.push(ProdutoPage, { product: product });
  }

  returnProducts() {
    this.productsController.getProductsPerTypeAndStatus(this.product).then((res: any) => {
      this.list_gas = res.data;
      console.log(this.list_gas);
    }).catch((e) => console.error(e));
  }

}
