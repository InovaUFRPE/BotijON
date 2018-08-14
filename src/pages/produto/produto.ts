import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, DateTime, ToastController } from 'ionic-angular';
import { SellersController } from '../../providers/sellers/sellers-controller';
import { PagamentoPage } from '../pagamento/pagamento';
import { Session } from '../../providers/users/session';
import { Storage } from "@ionic/storage";
import { RequestsControllerProvider } from '../../providers/requests-controller/requests-controller';
import { EditarEnderecoPage } from '../editar-endereco/editar-endereco';

@IonicPage()
@Component({
  selector: 'page-produto',
  templateUrl: 'produto.html',
})
export class ProdutoPage {

  product = JSON['body'];
  seller: any = {"name":""};
  currentUser: any;
  request:any = {
    "quantity":0,
    "customer_id": "",
    "product_id": ""
  }

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public session: Session,
    public storage: Storage,
    private sellerController: SellersController,
    private requestController: RequestsControllerProvider,
    public toastCtrl: ToastController) {

    this.product = this.navParams.get('product');

    this.recuperarUser();

    this.getId();

    this.getSeller();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProdutoPage');
    console.log(this.product);
  }

  getId(){
    this.request.product_id = this.product.id;
  }

  getSeller() {
    this.sellerController.getUser(this.product.seller_id)
      .then((res: any) => {
        this.seller = res.data[0];
      })
  }

  getType():any{
    if(this.product.product_type == "agua"){
      return true;
    }
    else{
      return false;
    }
  }

  goToBackPage(){
    this.navCtrl.pop();
  }

  comprarProduto(){
    if (this.currentUser.address_id !== null) {
      if(this.validationFields()){
        console.log("A REQUEST ESTA AQUI: ", this.request)

        let temp:any = {
          "customer_id" : "",
          "product_id" : "",
          "quantity": ""
        } 
        temp.customer_id = this.request.customer_id;
        temp.product_id = this.request.product_id;
        temp.quantity = this.request.quantity;
        this.requestController.createRequest(temp)
          .then((res:any) => {
            if(res.status == "success"){
              this.navCtrl.push(PagamentoPage, { request: temp });
            }
            else{
              console.log(res)
            }
          })
          .catch(e => console.error(e));
      }
      else{
        this.presentToast("Digite a quantidade!");
      }
    }
    else {
      this.presentToast("Primeiro cadastre um endereço!");
      this.navCtrl.push(EditarEnderecoPage);
    }
  }

  validationFields():boolean{
    console.log(this.request);
    if(this.request.quantity == "request.quantity" || this.request.quantity == 0 || this.request.quantity === 0 || this.request.quantity < 1 || this.request.quantity == "undefined" || this.request.quantity == null){
      return false;
    }
    else{
      return true;
    }
  }

  recuperarUser() {
    this.session.get()
      .then(res => {
        this.currentUser = res;
        this.request.customer_id = res.id;
        console.log('usuário logado  >>> ', this.currentUser);
      });
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 1500,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

}
