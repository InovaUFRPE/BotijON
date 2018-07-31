import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListarGasPage } from './listar-gas';

@NgModule({
  declarations: [
    ListarGasPage,
  ],
  imports: [
    IonicPageModule.forChild(ListarGasPage),
  ],
})
export class ListarGasPageModule {}
