import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SellersController } from '../../providers/sellers/sellers-controller';

@IonicPage()
@Component({
  selector: 'page-cadastro-vendedor',
  templateUrl: 'cadastro-vendedor.html',
})
export class CadastroVendedorPage {

  public sellerData = { "name": "", "email": "", "cpfcnpj": "", "password": "" };

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private sellerController: SellersController,
    public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroVendedorPage');
  }

  registerSeller() {
    if(this.validationFields()){
      console.log(this.sellerData);
      this.sellerController.createAccount(this.sellerData).then((res) => {
        this.presentToast("Cadastro efetuado com sucesso!");
        this.goToHomePage()
      })
      .catch(err => {
        alert(err);
        this.presentToast("Não foi possível realizar seu cadastro");
      });
    }
    else{
      this.presentToast("Preencha os campos adequadamente");
    }
  }

  validationFields():boolean {
    if (this.sellerData.name === "" || this.sellerData.name === null || this.sellerData.name.length == 0) {
      if (this.sellerData.email === "" || this.sellerData.email === null || this.sellerData.email.length < 5) {
        if(this.sellerData.cpfcnpj === "" || this.sellerData.cpfcnpj === null || this.sellerData.cpfcnpj.length < 11){
          if (this.sellerData.password === "" || this.sellerData.password === null || this.sellerData.password.length < 5) {
            return false;
          }
          else {
            return false;
          }
        }
        else{
          return false;
        }
      }
      else {
        return false;
      }
    }
    else {
      if (this.sellerData.email === "" || this.sellerData.email === null || this.sellerData.email.length < 5) {
        if (this.sellerData.cpfcnpj === "" || this.sellerData.cpfcnpj === null || this.sellerData.cpfcnpj.length < 11){
          if (this.sellerData.password === "" || this.sellerData.password === null || this.sellerData.password.length < 5) {
            return false;
          }
          else {
            return false;
          }
        }
        else{
          return false;
        }
      }
      else {
        if (this.sellerData.cpfcnpj === "" || this.sellerData.cpfcnpj === null || this.sellerData.cpfcnpj.length < 11){
          if (this.sellerData.password === "" || this.sellerData.password === null || this.sellerData.password.length < 5) {
            return false;
          }
          else {
            return false;
          }
        }
        else{
          if (this.sellerData.password === "" || this.sellerData.password === null || this.sellerData.password.length < 5) {
            return false;
          }
          else {
            return true;
          }  
        }
      }
    }
  }

  goToHomePage() {
    this.navCtrl.push(HomePage);
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
