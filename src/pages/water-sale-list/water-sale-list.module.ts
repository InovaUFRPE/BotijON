import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WaterSaleListPage } from './water-sale-list';

@NgModule({
  declarations: [
    WaterSaleListPage,
  ],
  imports: [
    IonicPageModule.forChild(WaterSaleListPage),
  ],
})
export class WaterSaleListPageModule {}
