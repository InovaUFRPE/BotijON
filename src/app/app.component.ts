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
  typeUser:boolean;

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
          this.currentUser = res;

          //Verifica se usuário é vendedor
          if(!!this.currentUser.cpfcnpj){
            this.typeUser = true;
            splashScreen.hide();
            this.rootPage = CadastroProdutoPage;
          }
          else{ //Caso o usuário seja cliente
            this.typeUser = false;
            splashScreen.hide();
            this.rootPage = PedidoPage;
          }
        }
        else{
          splashScreen.hide();
          this.rootPage = HomePage;
        }
      });
    }

  pushPage(page) {
/*     if(page == this.novoProduto || page == this.pedidoPage){
      this.nav.setRoot(page);
    }
    else{
      this.nav.push(page).then(response => {
        console.log("tipo[true:vendedor|false:cliente]: ",this.typeUser);
        console.log(response);
      }).catch(e => {
        console.log(e);
      });
    } */
    this.nav.setRoot(page);
  }

}