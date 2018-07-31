import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Session } from '../../providers/users/session';
import { Storage } from "@ionic/storage";
import { CustomersController } from '../../providers/customers/customers-controller';
import { SellersController } from '../../providers/sellers/sellers-controller';
import { MeuPerfilPage } from '../meu-perfil/meu-perfil';

@IonicPage()
@Component({
  selector: 'page-editar-perfil',
  templateUrl: 'editar-perfil.html',
})
export class EditarPerfilPage {

  currentUser:any = {
    'name': '',
    'password': ''
  };

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public session: Session,
    public storage: Storage,
    public customerController: CustomersController,
    public sellerConroller: SellersController
    ) {

    this.recuperarUser();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditarPerfilPage');
  }

  goToBeforePage(){
    this.navCtrl.pop();
  }

  editarUsuario(){
    if(!!this.currentUser.cpfcnpj){
      if (this.currentUser.name != '') {
        let userData: any = { 'name': '' };
        userData.name = this.currentUser.name;
        this.sellerConroller.changeName(this.currentUser.id, userData)
          .then((res: any) => {
            console.log(res)
          })
          .catch(e => console.error(e));
      }
      if (this.currentUser.password != '') {
        let userData: any = { 'password': '' };
        userData.password = this.currentUser.password;
        this.sellerConroller.changePassword(this.currentUser.id, userData)
          .then((res: any) => {
            console.log(res)
          })
          .catch(e => console.error(e));
      }

      this.sellerConroller.getUser(this.currentUser.id)
        .then((res: any) => {
          this.session.remove()
          this.session.create(res.data[0]);
        })
        .catch(e => console.error(e));
    }
    else{
      if (this.currentUser.name != '') {
        let userData: any = { 'name': '' };
        userData.name = this.currentUser.name;
        this.customerController.changeName(this.currentUser.id, userData)
          .then((res: any) => {
            console.log(res)
          })
          .catch(e => console.error(e));
      }
      if (this.currentUser.password != '') {
        let userData: any = { 'password': '' };
        userData.password = this.currentUser.password;
        this.customerController.changePassword(this.currentUser.id, userData)
          .then((res: any) => {
            console.log(res)
          })
          .catch(e => console.error(e));
      }

      this.customerController.getUser(this.currentUser.id)
        .then((res: any) => {
          this.session.remove()
          this.session.create(res.data[0]);
        })
        .catch(e => console.error(e));
    }

    this.navCtrl.setRoot(MeuPerfilPage);

  }

  recuperarUser() {
    this.session.get()
      .then(res => {
        this.currentUser = res;
        console.log('usuário logado  >>> ', this.currentUser);
      });
  }

}
