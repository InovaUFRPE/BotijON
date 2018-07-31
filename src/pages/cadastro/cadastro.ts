import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomePage} from '../home/home';
import { CadastroClientePage } from '../cadastro-cliente/cadastro-cliente';
import { CadastroVendedorPage } from '../cadastro-vendedor/cadastro-vendedor';

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
  }

  cadastro_cliente(){
    this.navCtrl.push(CadastroClientePage);
  }

  cadastro_vendedor(){
    this.navCtrl.push(CadastroVendedorPage);
  }

  goToHomePage(){
    this.navCtrl.push(HomePage)
  }

}
