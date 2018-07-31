import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListarAguaPage } from './listar-agua';

@NgModule({
  declarations: [
    ListarAguaPage,
  ],
  imports: [
    IonicPageModule.forChild(ListarAguaPage),
  ],
})
export class ListarAguaPageModule {}
