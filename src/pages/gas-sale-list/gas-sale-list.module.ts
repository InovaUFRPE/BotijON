import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GasSaleListPage } from './gas-sale-list';

@NgModule({
  declarations: [
    GasSaleListPage,
  ],
  imports: [
    IonicPageModule.forChild(GasSaleListPage),
  ],
})
export class GasSaleListPageModule {}
