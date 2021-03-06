import { Component, ChangeDetectorRef  } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Session } from '../../providers/users/session';
import { Storage } from "@ionic/storage";
import { PaymentsControllerProvider } from '../../providers/payments-controller/payments-controller';
import { AddressesControllerProvider } from '../../providers/addresses-controller/addresses-controller';

@IonicPage()
@Component({
  selector: 'page-vendas',
  templateUrl: 'vendas.html',
})
export class VendasPage {

  venda:any = {
    "description" : "Não há vendas registradas",
    "value" : "",
    "product_type" : "",
    "quantity" : "",
    "date" : "",
    "payment_type" : "",
    "address" : "",
    "number" : "",
    "neighborhood" : ""
  }
  lista_vendas: any = [];
  currentUser: any;

  endereco:any = {"id":null};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private session: Session,
    private storage: Storage,
    public paymentController: PaymentsControllerProvider,
    public addressController: AddressesControllerProvider,
    private ref: ChangeDetectorRef) {
    
    this.recuperarUser();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VendasPage');
  }

  getAllVendas(seller_id) {
    this.paymentController.getAllPaymentsToSeller(seller_id)
      .then((res: any) => {
        console.log(res)
        if(res.status == "success"){
          this.lista_vendas = res.data;
          console.log(this.lista_vendas);
        }
        else{
          this.lista_vendas = [this.venda];
        }

      })
      .catch((e) => console.error(e));
  }

  recuperarUser() {
    this.session.get()
      .then(res => {
        this.currentUser = res;
        this.getAllVendas(this.currentUser.id)
        console.log("AQUI TA A VENDA DAJVFVBJKVEVR: ", this.lista_vendas) 
        console.log('usuário logado  >>> ', this.currentUser);
      });
  }

}
