import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { CustomersController } from '../../providers/customers/customers-controller';

@IonicPage()
@Component({
  selector: 'page-cadastro-cliente',
  templateUrl: 'cadastro-cliente.html',
})
export class CadastroClientePage {

  public customerData = { "name": "", "password": "", "email": "" };

  constructor(
    private navCtrl: NavController,
    public navParams: NavParams,
    private customerController: CustomersController,
    public toastCtrl: ToastController){
  }

  registerCustomer() {
    if(this.validationFields()){
      this.customerController.createAccount(this.customerData).then((res) => {
        this.presentToast("Cadastro efetuado com sucesso!");
        this.goToHomePage()
      })
      .catch(err => {
        console.log(err);
        this.presentToast("Não foi possível realizar seu cadastro");
      });
    }
    else{
      this.presentToast("Preencha os campos adequadamente");
    }
  }

  goToHomePage() {
    this.navCtrl.push(HomePage);
  }

  validationFields(): boolean{
    if(this.customerData.name === "" || this.customerData.name === null || this.customerData.name.length == 0){
      if (this.customerData.email === "" || this.customerData.email === null || this.customerData.email.length < 5){
        if (this.customerData.password === "" || this.customerData.password === null || this.customerData.password.length < 5){
          return false;
        }
        else{
          return false;
        }
      }
      else{
        return false;
      }
    }
    else{
      if (this.customerData.email === "" || this.customerData.email === null || this.customerData.email.length < 5) {
        if (this.customerData.password === "" || this.customerData.password === null || this.customerData.password.length < 5) {
          return false;
        }
        else {
          return false;
        }
      }
      else {
        if (this.customerData.password === "" || this.customerData.password === null || this.customerData.password.length < 5) {
          return false;
        }
        else{
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
