import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MeusProdutosPage } from './meus-produtos';

@NgModule({
  declarations: [
    MeusProdutosPage,
  ],
  imports: [
    IonicPageModule.forChild(MeusProdutosPage),
  ],
})
export class MeusProdutosPageModule {}
