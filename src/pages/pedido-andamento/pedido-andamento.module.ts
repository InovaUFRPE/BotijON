import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PedidoAndamentoPage } from './pedido-andamento';

@NgModule({
  declarations: [
    PedidoAndamentoPage,
  ],
  imports: [
    IonicPageModule.forChild(PedidoAndamentoPage),
  ],
})
export class PedidoAndamentoPageModule {}
