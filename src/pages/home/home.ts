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
         console.log(res.data[0]);
         this.goToMainPageSeller(res.data[0])
       }
     }
    else{
       this.userController.validationCustomer(this.userData).then((res: any) => {
         if (res.status == "success") {
           console.log(res.data[0]);
           this.goToMainPageCustomer(res.data[0])
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

    goToMainPageSeller(user){
      this.navCtrl.push(CadastroProdutoPage, {User: user})
    }

    goToMainPageCustomer(user){
      this.navCtrl.push(PedidoPage, {User: user})
    }
}
