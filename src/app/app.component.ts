import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { Session } from '../providers/users/session';
import { Storage } from "@ionic/storage";

import { CadastroProdutoPage } from '../pages/cadastro-produto/cadastro-produto';
import { PedidoPage } from '../pages/pedido/pedido';
import { MeuPerfilPage } from '../pages/meu-perfil/meu-perfil';
import { MeusProdutosPage } from '../pages/meus-produtos/meus-produtos';
import { MeusPedidosPage } from '../pages/meus-pedidos/meus-pedidos';
import { MeusResultadosPage } from '../pages/meus-resultados/meus-resultados';
import { VendasPage } from '../pages/vendas/vendas';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  meuPerfil: any = MeuPerfilPage;

  pedidoPage: any = PedidoPage;
  meusPedidos: any = MeusPedidosPage;

  novoProduto: any = CadastroProdutoPage;
  meusProdutosPage: any = MeusProdutosPage;
  meusResultados: any = MeusResultadosPage;
  vendas: any = VendasPage;

  currentUser:any;
  typeUser:any;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    public session: Session,
    public storage: Storage, 
    public app: App) {
    
    platform.ready().then(() => {
      
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();

      // Chamando metodo verificarSessao
      this.verificarSessao(splashScreen);
      
    });
  }

  verificarSessao(splashScreen) {
    this.session.get()
      .then(res => {

        if(res != null){
          // Criando usuário
          let temp = res;
          this.session.remove();
          this.storage.clear()
          this.currentUser = temp;

          this.session.create(this.currentUser);
          //Verifica se usuário é vendedor
          if(!!this.currentUser.cpfcnpj){
            this.typeUser = "vendedor";
            splashScreen.hide();
            this.rootPage = CadastroProdutoPage;
          }
          else{ //Caso o usuário seja cliente
            this.typeUser = "cliente";
            splashScreen.hide();
            this.rootPage = PedidoPage;
          }
        }
        else{
          this.typeUser = null;
          this.session.remove();
          this.storage.clear();
          splashScreen.hide();
          this.rootPage = HomePage;
        }
      });
    }

  pushPage(page) {
    this.nav.setRoot(page);
  }

  verificarTipo():boolean{
    if(this.typeUser === "vendedor"){
      return true;
    }
  }

}