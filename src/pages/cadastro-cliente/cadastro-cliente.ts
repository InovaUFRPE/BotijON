import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
    private customerController: CustomersController){
  }

  registerCustomer() {
    this.customerController.createAccount(this.customerData).then((res) => {
      this.goToHomePage()
    }).catch(err => {
      alert(err)
    });
  }

  goToHomePage() {
    this.navCtrl.push(HomePage);
  }

}
