import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';

// PAGES
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { CadastroClientePage } from '../pages/cadastro-cliente/cadastro-cliente';
import { CadastroVendedorPage } from '../pages/cadastro-vendedor/cadastro-vendedor';
import { CadastroProdutoPage } from '../pages/cadastro-produto/cadastro-produto';
import { PedidoPage } from '../pages/pedido/pedido';
import { MeusProdutosPage } from '../pages/meus-produtos/meus-produtos';
import { MeusPedidosPage } from '../pages/meus-pedidos/meus-pedidos';
import { MeuPerfilPage } from '../pages/meu-perfil/meu-perfil';
import { EditarPerfilPage } from '../pages/editar-perfil/editar-perfil';
import { ListarGasPage } from '../pages/listar-gas/listar-gas';
import { ListarAguaPage } from '../pages/listar-agua/listar-agua';
import { VendasPage } from '../pages/vendas/vendas';
import { MeusResultadosPage } from '../pages/meus-resultados/meus-resultados';
import { EditarEnderecoPage } from '../pages/editar-endereco/editar-endereco';
import { ProdutoPage } from '../pages/produto/produto';
import { PagamentoPage } from '../pages/pagamento/pagamento';
import { EditarProdutoPage } from '../pages/editar-produto/editar-produto';

// PROVIDERS
import { UsersController } from '../providers/users/users-controller/users-contoller';
import { CustomersController } from '../providers/customers/customers-controller';
import { SellersController } from '../providers/sellers/sellers-controller';
import { ProductsControllerProvider } from '../providers/products-controller/products-controller';
import { PaymentsControllerProvider } from '../providers/payments-controller/payments-controller';
import { RequestsControllerProvider } from '../providers/requests-controller/requests-controller';
import { AddressesControllerProvider } from '../providers/addresses-controller/addresses-controller';
import { Session } from '../providers/users/session';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CadastroPage,
    CadastroClientePage,
    CadastroVendedorPage,
    CadastroProdutoPage,
    PedidoPage,
    MeusProdutosPage,
    MeusPedidosPage,
    MeuPerfilPage,
    EditarPerfilPage,
    ListarGasPage,
    ListarAguaPage,
    VendasPage,
    MeusResultadosPage,
    EditarEnderecoPage,
    ProdutoPage,
    PagamentoPage,
    EditarProdutoPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
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
    PedidoPage,
    MeusProdutosPage,
    MeusPedidosPage,
    MeuPerfilPage,
    EditarPerfilPage,
    ListarGasPage,
    ListarAguaPage,
    VendasPage,
    MeusResultadosPage,
    EditarEnderecoPage,
    ProdutoPage,
    PagamentoPage,
    EditarProdutoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UsersController,
    CustomersController,
    SellersController,
    ProductsControllerProvider,
    PaymentsControllerProvider,
    RequestsControllerProvider,
    AddressesControllerProvider,
    Session,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
