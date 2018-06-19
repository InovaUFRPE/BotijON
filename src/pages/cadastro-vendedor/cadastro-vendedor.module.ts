import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroVendedorPage } from './cadastro-vendedor';

@NgModule({
  declarations: [
    CadastroVendedorPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastroVendedorPage),
  ],
})
export class CadastroVendedorPageModule {}
