import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Session } from '../../providers/users/session';
import { Storage } from "@ionic/storage";
import { MeusProdutosPage } from '../meus-produtos/meus-produtos';
import { HomePage } from '../home/home';
import { MeusPedidosPage } from '../meus-pedidos/meus-pedidos';
import { EditarPerfilPage } from '../editar-perfil/editar-perfil';
import { MeusResultadosPage } from '../meus-resultados/meus-resultados';
import { EditarEnderecoPage } from '../editar-endereco/editar-endereco';

@IonicPage()
@Component({
  selector: 'page-meu-perfil',
  templateUrl: 'meu-perfil.html',
})
export class MeuPerfilPage {

  currentUser:any = {
    name: '',
    email: ''
  };

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private session: Session,
    private storage: Storage) {

    this.recuperarUser();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MeuPerfilPage');
    this.recuperarUser();
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter MeuPerfilPage');
    this.recuperarUser();
  }

  getType() {
    if(!!this.currentUser.cpfcnpj){
      return true;
    }
    else{
      return false;
    }
  }

  toMeusProdutos(){
    this.navCtrl.push(MeusProdutosPage);
  }

  toMeusResultados() {
    this.navCtrl.push(MeusResultadosPage);
  }

  toMeusPedidos() {
    this.navCtrl.push(MeusPedidosPage);
  }

  toEditarPerfil() {
    this.navCtrl.push(EditarPerfilPage);
  }

  toEditarEndereco() {
    this.navCtrl.push(EditarEnderecoPage);
  }

  recuperarUser() {
    this.session.get()
      .then(res => {
        this.currentUser = res;
        console.log('usuário logado  >>> ', this.currentUser);
      });
  }

  deslogar() {
    this.session.remove();
    this.navCtrl.setRoot(HomePage);
  }

}

