import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CadastroPage } from '../cadastro/cadastro';
import {CadastroProdutoPage} from '../cadastro-produto/cadastro-produto';
import { UsersController } from '../../providers/users/users-controller/users-contoller';
import { PedidoPage } from '../pedido/pedido';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  userData = { "email": "", "password": "" }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userController: UsersController){}

  validateLogin() {
    console.log(this.userData);
    this.userController.validationSeller(this.userData).then((res: any) => {
     if(res.status == "success"){
       if (!!res.data[0].cpfcnpj) {
         this.goToMainPageSeller()
       }
     }
    else{
       this.userController.validationCustomer(this.userData).then((res: any) => {
         if (res.status == "success") {
          this.goToMainPageCustomer()
         }
       }).catch(err => {
         alert(err)
       });
    }
    }).catch(err => {
      alert(err)
    });
  }

    goToTabsPage(){
      this.navCtrl.push(CadastroPage)
    }

    goToMainPageSeller(){
      this.navCtrl.push(CadastroProdutoPage)
    }

    goToMainPageCustomer(){
      this.navCtrl.push(PedidoPage)
    }
}
