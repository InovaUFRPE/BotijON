import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Session } from '../../providers/users/session';
import { Storage } from "@ionic/storage";
import { PaymentsControllerProvider } from '../../providers/payments-controller/payments-controller';

@IonicPage()
@Component({
  selector: 'page-vendas',
  templateUrl: 'vendas.html',
})
export class VendasPage {

  lista_vendas: any = [];
  currentUser: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private session: Session,
    private storage: Storage,
    public paymentController: PaymentsControllerProvider) {

    this.recuperarUser();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VendasPage');
  }

  getAllVendas(id) {
    this.paymentController.getAllPaymentsToSeller(id)
      .then((res: any) => {
        console.log(res)
        this.lista_vendas = res.data;
        console.log(this.lista_vendas);
      })
      .catch((e) => console.error(e));
  }

  recuperarUser() {
    this.session.get()
      .then(res => {
        this.currentUser = res;
        this.getAllVendas(this.currentUser.id)
        console.log('usuário logado  >>> ', this.currentUser);
      });
  }

}
