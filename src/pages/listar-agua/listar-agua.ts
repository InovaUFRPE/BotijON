import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductsControllerProvider } from '../../providers/products-controller/products-controller';
import { ProdutoPage } from '../produto/produto';

@IonicPage()
@Component({
  selector: 'page-listar-agua',
  templateUrl: 'listar-agua.html',
})
export class ListarAguaPage {

  product:any = {
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
    console.log('ionViewDidLoad ListarAguaPage');
  }

  clickItem(product){
    this.navCtrl.push(ProdutoPage, {product: product});
  }

  returnProducts() {
    this.productsController.getProductsPerTypeAndStatus(this.product).then((res: any) => {
      this.list_waters = res.data;
      console.log(this.list_waters);
    }).catch((e) => console.error(e));
  }

}
