import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomePage} from '../home/home';
import { ProductsControllerProvider } from '../../providers/products-controller/products-controller';

@IonicPage()
@Component({
  selector: 'page-cadastro-produto',
  templateUrl: 'cadastro-produto.html',
})
export class CadastroProdutoPage {

  User = JSON['data[0]'];

  product = {
    "description": "",
    "value": "",
    "seller_id": "",
    "product_type": "",
    "status": "available"
  }

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private productController: ProductsControllerProvider) {
    this.User = this.navParams.get("User");
  }

  ionViewDidLoad() {
    console.log(this.User);
    console.log('ionViewDidLoad CadastroProdutoPage');
  }

  goToHomePage(){
    this.navCtrl.push(HomePage)
  }

  cadastrarProduto(){
    this.product.seller_id = this.User.id;
    console.log(this.product);
    this.productController.createProduct(this.product)
    .then((res:any) =>{
      if (res.status == "success") {
        console.log(res);
      }
      else {
        console.log(res);
      }
    }).catch((e) => console.error(e));

  }

}
