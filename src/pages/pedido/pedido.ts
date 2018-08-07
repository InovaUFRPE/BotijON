import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Session } from '../../providers/users/session';
import { Storage } from "@ionic/storage";
import { ListarGasPage } from '../listar-gas/listar-gas';
import { ListarAguaPage } from '../listar-agua/listar-agua';

@IonicPage()
@Component({
  selector: 'page-pedido',
  templateUrl: 'pedido.html',
})
export class PedidoPage {

  currentUser: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public session: Session,
    public storage: Storage,
    public menuCtrl: MenuController) {

    this.recuperarUser();

    this.menuCtrl.enable(true, 'myMenu')
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PedidoPage');
  }

  ionViewWillEnter() {
    this.recuperarUser();
  }

  recuperarUser(){
    this.session.get()
    .then(res => {
      this.currentUser = res;
      console.log('usuário logado  >>> ', this.currentUser);
    });
  }

  buyGas(){
    this.navCtrl.push(ListarGasPage);
  }

  buyWater(){
    this.navCtrl.push(ListarAguaPage);
  }

}
