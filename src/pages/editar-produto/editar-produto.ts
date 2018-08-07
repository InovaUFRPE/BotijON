import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ToastController } from 'ionic-angular';
import { ProductsControllerProvider } from '../../providers/products-controller/products-controller';
import { Session } from '../../providers/users/session';
import { Storage } from "@ionic/storage";
import { MeusProdutosPage } from '../meus-produtos/meus-produtos';

@IonicPage()
@Component({
  selector: 'page-editar-produto',
  templateUrl: 'editar-produto.html',
})
export class EditarProdutoPage {

  currentUser: any;

  product = JSON['body'];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private productController: ProductsControllerProvider,
    private session: Session,
    private storage: Storage,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController) {

    this.recuperarUser();
    this.product = this.navParams.get('product');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditarProdutoPage');
  }

  recuperarUser() {
    this.session.get()
      .then(res => {
        this.currentUser = res;
        console.log('usuário logado  >>> ', this.currentUser);
      });
  }

  goToMeusProdutos() {
    this.navCtrl.setRoot(MeusProdutosPage);
  }

  editarProduto(){
    if(this.validationFields()){
      let temp:any = {"id": ""}
      temp = this.product;;
      console.log("TEMP: ",temp)

      let temp1:any = {"description": ""};
      temp1.description = temp.description;
      console.log(temp1)
      this.productController.changeProductDescription(temp.id, temp1)
        .then((res:any) => {
          if(res.status == "success"){
            console.log("Descrição editada");
          }
        })
        .catch(e => console.error(e));
      
      let temp2:any = {"value": ""};
      temp2.value = temp.value;
      console.log(temp2)
      this.productController.changeProductValue(temp.id, temp2)
        .then((res:any) => {
          if(res.status == "success"){
            console.log("Valor editado");
          }
        })
        .catch(e => console.error(e));
      
      let temp3:any = {"status": ""};
      temp3.status = temp.status;
      console.log(temp3)
      this.productController.changeProductStatus(temp.id, temp3)
        .then((res:any) => {
          if(res.status == "success"){
            console.log("Status editado");
          }
        })
        .catch(e => console.error(e));

      this.presentToast("Produto atualizado");
      this.navCtrl.pop();
    }
    else{
      this.presentToast("Campos em branco não são permitidos")
    }
  }

  getStatus():boolean{
    if(this.product.status == "available"){
      return true;
    }
  }

  validationFields(): boolean {
    if (this.product.description === "" || this.product.description === null || this.product.description.length == 0) {
      if (this.product.value === "" || this.product.value === null || this.product.value.length == 0) {
        if (this.product.status === "" || this.product.status === null || this.product.status.length == 0) {
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
      if (this.product.value === "" || this.product.value === null || this.product.value.length == 0) {
        if (this.product.status === "" || this.product.status === null || this.product.status.length == 0) {
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
