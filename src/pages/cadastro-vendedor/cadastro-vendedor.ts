import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SellersController } from '../../providers/sellers/sellers-controller';

@IonicPage()
@Component({
  selector: 'page-cadastro-vendedor',
  templateUrl: 'cadastro-vendedor.html',
})
export class CadastroVendedorPage {

  public sellerData = { "name": "", "email": "", "cpfcnpj": "", "password": "", "address": "" };

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private sellerController: SellersController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroVendedorPage');
  }

  registerSeller() {
    console.log(this.sellerData);
    this.sellerController.createAccount(this.sellerData).then((res) => {
      this.goToHomePage()
    }).catch(err => {
      alert(err)
    });
  }

  goToHomePage() {
    this.navCtrl.push(HomePage);
  }

}
