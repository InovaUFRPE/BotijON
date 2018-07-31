import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { ProductsControllerProvider } from '../../providers/products-controller/products-controller';
import { Session } from '../../providers/users/session';
import { Storage } from "@ionic/storage";
import { MeuPerfilPage } from '../meu-perfil/meu-perfil';

@IonicPage()
@Component({
  selector: 'page-cadastro-produto',
  templateUrl: 'cadastro-produto.html',
})
export class CadastroProdutoPage {

  currentUser:any;

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
    private productController: ProductsControllerProvider,
    private session: Session,
    private storage: Storage,
    public menuCtrl: MenuController) {

    this.recuperarUser();

    this.menuCtrl.enable(true, 'myMenu')

  }

  ionViewDidLoad() {
    // console.log(this.User);
    console.log('ionViewDidLoad CadastroProdutoPage');
  }

  recuperarUser() {
    this.session.get()
      .then(res => {
        this.currentUser = res;
        console.log('usuário logado  >>> ', this.currentUser);
      });
  }

  goToPerfilPage(){
    this.navCtrl.setRoot(MeuPerfilPage);
  }

  cadastrarProduto(){
    this.product.seller_id = this.currentUser.id;
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
