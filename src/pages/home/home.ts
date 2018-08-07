import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ToastController } from 'ionic-angular';
import { CadastroPage } from '../cadastro/cadastro';
import {CadastroProdutoPage} from '../cadastro-produto/cadastro-produto';
import { UsersController } from '../../providers/users/users-controller/users-contoller';
import { PedidoPage } from '../pedido/pedido';
import { Session } from '../../providers/users/session';
import { Storage } from "@ionic/storage";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  userData = { "email": "", "password": "" }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userController: UsersController,
    private session: Session,
    public storage: Storage,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController
    ){
      this.menuCtrl.enable(false, 'myMenu')
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage: Login');
    this.session.remove();
    this.storage.clear();
  }

  ionViewWillEnter() {
    this.session.remove();
    this.storage.clear();
  }

  validateLogin() {
    console.log(this.userData);
    //Validação dos campos

    if (this.validationFields()){

      this.userController.validationSeller(this.userData).then((res: any) => {
        if(res.status == "success"){
          if (!!res.data[0].cpfcnpj) {
            console.log(res.data[0]);
            this.session.create(res.data[0]);
            this.presentToast("Login efetuado com sucesso!");
            this.goToMainPageSeller(res.data[0])
          }
        }
        else{
          this.userController.validationCustomer(this.userData).then((res: any) => {
            if (res.status == "success") {
              console.log(res.data[0]);
              this.session.create(res.data[0]);
              this.presentToast("Login efetuado com sucesso!");
              this.goToMainPageCustomer(res.data[0])
            }
            else{
              this.presentToast("Usuário ou senha incorretos!");
            }
          })
          .catch(err => {
            console.error(err);
            this.presentToast("Não foi possível efetuar o login!");
          });
        }
      })
      .catch(err => {
        console.error(err);
        this.presentToast("Não foi possível efetuar o login!");
      });
    }
    //Se os campos não passarem na validação
    else{
      this.presentToast("Não foi possível efetuar o login!");
    }
  }

  validationFields():boolean {
    if(this.userData.email === "" || this.userData.email === null){
      if(this.userData.password === "" || this.userData.password === null || this.userData.password.length < 5){
        return false;
      }
      else{
        return false;
      }
    }
    else if (this.userData.email !== "" || this.userData.email !== null){
      if (this.userData.password === "" || this.userData.password === null || this.userData.password.length < 5) {
        return false;
      }
      else{
        return true
      }
    }
    else{
      return true;
    }
  }

  goToRegisterPage(){
    this.navCtrl.push(CadastroPage);
  }
  
  goToMainPageSeller(user){
    this.navCtrl.setRoot(CadastroProdutoPage)
  }

  goToMainPageCustomer(user){
    this.navCtrl.setRoot(PedidoPage)
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
