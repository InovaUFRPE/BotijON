import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductsControllerProvider } from '../../providers/products-controller/products-controller';
import { Session } from '../../providers/users/session';
import { Storage } from "@ionic/storage";
import { EditarProdutoPage } from '../editar-produto/editar-produto';

@IonicPage()
@Component({
  selector: 'page-meus-produtos',
  templateUrl: 'meus-produtos.html',
})
export class MeusProdutosPage{

  product: any = {
    "product_type": "gas",
    "status": "available"
  }
  lista_produtos: any = [];
  currentUser: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private session: Session,
    private storage: Storage,
    public productConttroller: ProductsControllerProvider) {

    this.recuperarUser();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MeusProdutosPage');
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter MeusProdutosPage');
    this.getAllPedidos(this.currentUser.id);
  }

  clickItem(product) {
    this.navCtrl.push(EditarProdutoPage, { product: product });
  }

  getAllPedidos(id) {
    this.productConttroller.getProductBySeller(id)
      .then((res: any) => {
        console.log(res)
        this.lista_produtos = res.data;
        console.log(this.lista_produtos);
      })
      .catch((e) => console.error(e));
  }

  recuperarUser() {
    this.session.get()
      .then(res => {
        this.currentUser = res;
        this.getAllPedidos(this.currentUser.id)
        console.log('usuário logado  >>> ', this.currentUser);
      });
  }

}
