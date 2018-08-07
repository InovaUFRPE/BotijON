import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ToastController } from 'ionic-angular';
import { ProductsControllerProvider } from '../../providers/products-controller/products-controller';
import { Session } from '../../providers/users/session';
import { Storage } from "@ionic/storage";
import { MeuPerfilPage } from '../meu-perfil/meu-perfil';
import { MeusProdutosPage } from '../meus-produtos/meus-produtos';

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
    public menuCtrl: MenuController,
    public toastCtrl: ToastController) {

    this.recuperarUser();

    this.menuCtrl.enable(true, 'myMenu')

  }

  ionViewDidLoad() {
    // console.log(this.User);
    console.log('ionViewDidLoad CadastroProdutoPage');
  }

  ionViewWillEnter() {
    this.recuperarUser();
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
    
    if(this.validationFields()){
      this.productController.createProduct(this.product)
        .then((res:any) =>{
          if (res.status == "success") {
            console.log(res);
            this.presentToast("Produto cadastrado com sucesso!");
            this.navCtrl.setRoot(MeusProdutosPage);
          }
          else {
            console.log(res);
            this.presentToast("Não foi possível cadastradar o produto");
          }
        })
        .catch((e) => console.error(e));
        this.presentToast("Não foi possível cadastradar o produto");
    }
    else{
      this.presentToast("Não foi possível cadastradar o produto");
    }

  }

  validationFields(): boolean {
    if (this.product.product_type === "" || this.product.product_type === null || this.product.product_type.length == 0) {
      if (this.product.description === "" || this.product.description === null || this.product.description.length == 0) {
        if (this.product.value === "" || this.product.value === null || this.product.value.length == 0) {
          return false;
        }
        else {
          return false;
        }
      }
      else {
        return false;
      }
    }
    else {
      if (this.product.description === "" || this.product.description === null || this.product.description.length == 0) {
        if (this.product.value === "" || this.product.value === null || this.product.value.length == 0) {
          return false;
        }
        else {
          return false;
        }
      }
      else {
        if (this.product.value === "" || this.product.value === null || this.product.value.length == 0) {
          return false;
        }
        else {
          return true;
        }
      }
    }
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
