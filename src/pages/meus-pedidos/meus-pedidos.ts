import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Session } from '../../providers/users/session';
import { Storage } from "@ionic/storage";
import { PaymentsControllerProvider } from '../../providers/payments-controller/payments-controller';
import { ProductsControllerProvider } from '../../providers/products-controller/products-controller';

@IonicPage()
@Component({
  selector: 'page-meus-pedidos',
  templateUrl: 'meus-pedidos.html',
})
export class MeusPedidosPage {

  lista_pedidos:any = [];
  lista_produtos:any = [];
  currentUser:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private session: Session,
    private storage: Storage,
    public paymentController: PaymentsControllerProvider,
    public productConttroller: ProductsControllerProvider) {

      this.recuperarUser();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MeusPedidosPage');
  }

  getAllPedidos(id){
    this.paymentController.getAllPaymentsByCustomer(id)
    .then((res:any) => {
      this.lista_pedidos = res.data;
      console.log(this.lista_pedidos);
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
