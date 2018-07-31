import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Session } from '../../providers/users/session';
import { Storage } from "@ionic/storage";
import { ProductsControllerProvider } from '../../providers/products-controller/products-controller';
import { PedidoPage } from '../pedido/pedido';
import { MeusPedidosPage } from '../meus-pedidos/meus-pedidos';
import { AddressesControllerProvider } from '../../providers/addresses-controller/addresses-controller';
import { RequestsControllerProvider } from '../../providers/requests-controller/requests-controller';
import { PaymentsControllerProvider } from '../../providers/payments-controller/payments-controller';

@IonicPage()
@Component({
  selector: 'page-pagamento',
  templateUrl: 'pagamento.html',
})
export class PagamentoPage {

  currentUser:any ={
    "id":"",
    "name":"",
    "email":"",
    "password":"",
    "address_id":""
  };

  address: any = {
    "address": "",
    "number": "",
    "neighborhood": "",
    "city": "",
    "state": "",
    "cep": "",
    "reference_point": "",
    "latitude": "",
    "longitude": ""
  }

  request = JSON['body'];

  payment: any = {
    "value": 0,
    "payment_type": "dinheiro",
    "address_id": "",
    "request_id":"",
    "status": "success"
  }
  product:any = {
    "id":"",
    "description":"",
    "value":"",
    "seller_id":"",
    "product_type":"",
    "status":""
  };

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public session: Session,
    public storage: Storage,
    public productController: ProductsControllerProvider,
    public addressController: AddressesControllerProvider,
    public requestController: RequestsControllerProvider,
    public paymentController: PaymentsControllerProvider) {

    this.recuperarUser();

    this.request = this.navParams.get('request');
    this.request.quantity = parseInt(this.request.quantity);
    this.getProduct();
    this.getRequest();
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PagamentoPage');
  }

  getProduct(){
    this.productController.getProductById(this.request.product_id)
      .then((res:any) => {
        this.product = res.data[0];
        let number1: number = this.request.quantity;
        let number2: number = this.product.value;
        this.payment.value = number1 * number2;
      })
      .catch(e => console.error(e));
  }

  goToPedidoPage(){
    this.navCtrl.setRoot(PedidoPage);
  }

  confirmarPagamento(){
    console.log("CRIAR PAGAMENTO: ",this.payment)
    this.paymentController.createPayment(this.payment)
    .then((res:any) => {
      console.log(res)
      this.navCtrl.setRoot(MeusPedidosPage);
    })
    .catch(e => console.error(e));
  }

  recuperarUser() {
    this.session.get()
      .then(res => {
        this.currentUser = res;
        this.getEndereco(this.currentUser.address_id);
        this.getRequest();
        console.log('usuário logado  >>> ', this.currentUser);
      });
  }

  getEndereco(id){
    this.addressController.getAddressById(id)
    .then((res:any) => {
      this.address = res.data[0];
      this.payment.address_id = this.address.id;

    })
  }

  getRequest(){
    let temp = {
      "customer_id": this.currentUser.id,
      "product_id": this.product.id
    }
    this.requestController.getIdOfRequest(temp)
      .then((res: any) => {
        let new_request:any = res.data[0];
        let number3 = new_request.id
        this.payment.request_id = number3;
      })
      .catch(e => console.error(e))
  }

}
