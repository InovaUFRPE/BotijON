import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CadastroPage } from '../cadastro/cadastro';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  cadastroPage = CadastroPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams){}

    goToTabsPage(){
      this.navCtrl.push(CadastroPage)
    }
}
