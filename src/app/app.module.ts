import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

// PAGES
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { CadastroClientePage } from '../pages/cadastro-cliente/cadastro-cliente';
import { CadastroVendedorPage } from '../pages/cadastro-vendedor/cadastro-vendedor';
import { CadastroProdutoPage } from '../pages/cadastro-produto/cadastro-produto';
import { PedidoPage } from '../pages/pedido/pedido';

// PROVIDERS
import { UsersController } from '../providers/users/users-controller/users-contoller';
import { CustomersController } from '../providers/customers/customers-controller';
import { SellersController } from '../providers/sellers/sellers-controller';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CadastroPage,
    CadastroClientePage,
    CadastroVendedorPage,
    CadastroProdutoPage,
    PedidoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CadastroPage,
    CadastroClientePage,
    CadastroVendedorPage,
    CadastroProdutoPage,
    PedidoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UsersController,
    CustomersController,
    SellersController,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
