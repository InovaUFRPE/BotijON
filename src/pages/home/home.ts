import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { CadastroPage } from '../cadastro/cadastro';
import {CadastroProdutoPage} from '../cadastro-produto/cadastro-produto';
import { UsersController } from '../../providers/users/users-controller/users-contoller';
import { PedidoPage } from '../pedido/pedido';
import { Session } from '../../providers/users/session';

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
    public menuCtrl: MenuController
    ){
      this.menuCtrl.enable(false, 'myMenu')
    }

  validateLogin() {
    console.log(this.userData);
    this.userController.validationSeller(this.userData).then((res: any) => {
     if(res.status == "success"){
       if (!!res.data[0].cpfcnpj) {
         console.log(res.data[0]);
         this.session.create(res.data[0])
         this.goToMainPageSeller(res.data[0])
       }
     }
    else{
       this.userController.validationCustomer(this.userData).then((res: any) => {
         if (res.status == "success") {
           console.log(res.data[0]);
           this.session.create(res.data[0])
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
  
  goToMainPageSeller(user){
    this.navCtrl.setRoot(CadastroProdutoPage)
  }

  goToMainPageCustomer(user){
    this.navCtrl.setRoot(PedidoPage)
  }
}
