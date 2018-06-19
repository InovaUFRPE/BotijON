import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CadastroPage } from '../cadastro/cadastro';
import {CadastroProdutoPage} from '../cadastro-produto/cadastro-produto';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  cadastroPage = CadastroPage;
  cadastroprodutoPage = CadastroProdutoPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams){}

    goToTabsPage(){
      this.navCtrl.push(CadastroPage)
    }

    goToCadastroProtudo(){
      this.navCtrl.push(CadastroProdutoPage)
    }
}
