import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductsControllerProvider } from '../../providers/products-controller/products-controller';
import { Session } from '../../providers/users/session';
import { Storage } from "@ionic/storage";

@IonicPage()
@Component({
  selector: 'page-meus-produtos',
  templateUrl: 'meus-produtos.html',
})
export class MeusProdutosPage{

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
