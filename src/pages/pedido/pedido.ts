import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GasSaleListPage } from '../gas-sale-list/gas-sale-list';
import { WaterSaleListPage } from '../water-sale-list/water-sale-list';

@IonicPage()
@Component({
  selector: 'page-pedido',
  templateUrl: 'pedido.html',
})
export class PedidoPage {

  User = JSON['data[0]'];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams) {
    this.User = this.navParams.get("User")
  }

  ionViewDidLoad() {
    console.log(this.User);
    console.log('ionViewDidLoad PedidoPage');
  }

  buyGas(){
    this.navCtrl.push(GasSaleListPage);
  }

  buyWater(){
    this.navCtrl.push(WaterSaleListPage);
  }

}
