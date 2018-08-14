import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PaymentsControllerProvider } from '../../providers/payments-controller/payments-controller';
import { Session } from '../../providers/users/session';
import { Storage } from "@ionic/storage";

@IonicPage()
@Component({
  selector: 'page-meus-resultados',
  templateUrl: 'meus-resultados.html',
})
export class MeusResultadosPage {

  lista_vendas: any = [];
  currentUser: any;
  valor = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private session: Session,
    private storage: Storage,
    public paymentController: PaymentsControllerProvider) {

    this.recuperarUser();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MeusResultadosPage');
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

  valorTotal(user_id){
    this.paymentController.getValueTotalToPaymentsSeller(user_id)
    .then((res:any) => {
      console.log("primeiro print aqui: ",res.data[0]);
      this.valor = res.data[0].value_total;
      console.log("segundo print aqui: ",this.valor);
    })
    .catch(e => console.error(e));
  }

  recuperarUser() {
    this.session.get()
      .then(res => {
        this.currentUser = res;
        this.valorTotal(this.currentUser.id)
        this.getAllVendas(this.currentUser.id)
        console.log('usuário logado  >>> ', this.currentUser);
      });
  }

}
