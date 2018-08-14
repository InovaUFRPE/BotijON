import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Session } from '../../providers/users/session';
import { Storage } from "@ionic/storage";
import { AddressesControllerProvider } from '../../providers/addresses-controller/addresses-controller';
import { CustomersController } from '../../providers/customers/customers-controller';
import { SellersController } from '../../providers/sellers/sellers-controller';
import { MeuPerfilPage } from '../meu-perfil/meu-perfil';

@IonicPage()
@Component({
  selector: 'page-editar-endereco',
  templateUrl: 'editar-endereco.html',
})
export class EditarEnderecoPage {

  currentUser:any = {
    "address_id":null
  };

  endereco:any = {
    "address":"",
    "number":"",
    "neighborhood":"",
    "cep":"",
    "reference_point":null
  }

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public session: Session,
    public storage: Storage,
    public addressController: AddressesControllerProvider,
    public customerController: CustomersController,
    public sellerController: SellersController,
    public toastCtrl: ToastController
    ){
    
      this.recuperarUser();

      if (this.currentUser.address_id != null){
        this.addressController.getAddressById(this.currentUser.address_id)
          .then((res:any) => {
            if(res.status == "success"){
              console.log("ENEDERO DO DOIDO AQUI: ", res.data[0]);
              this.endereco = res.data[0];
            }

          })
          .catch(e => console.error(e));
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditarEnderecoPage');
  }

  ionViewDidEnter() {
    console.log('ionViewDidLoad EditarEnderecoPage');
    this.recuperarUser();
    if (this.currentUser.address_id != null) {
      this.addressController.getAddressById(this.currentUser.address_id)
        .then((res: any) => {
          if (res.status == "success") {
            console.log(res.data[0]);
            this.endereco = res.data[0];
          }

        })
        .catch(e => console.error(e));
    }

  }

  goToBeforePage(){
    this.navCtrl.pop();
  }

  editarEndereco(){
    if(this.validationFields()){
      
/*       let addressString = this.addressController.stringAddress(this.endereco);

      this.addressController.getCoordenates(addressString)
        .then((res: any) => {
          console.log(res)
          let data = res.results[0].geometry.location;

          this.endereco.latitude = String(data.lat);
          this.endereco.longitude = String(data.lng); */

          console.log("Verificar se usuario tem algum endereço:")
          if (this.currentUser.address_id == null) {

            let temp: any = { "address": "", "number": "", "cep": "" }
            temp.address = this.endereco.address;
            temp.number = this.endereco.number;
            temp.cep = this.endereco.cep;

            this.addressController.getAddressPerAddressCepAndNumber(temp)
              .then((res:any) => {
                console.log("Verificar se endereço já existe:");

                if(res.status == "success"){

                  console.log("Endereço já existe");

                  let a_id = res.data[0].id;
                  let ad = {"address_id":""}
                  ad.address_id = a_id;

                  console.log("Atualizar endereço já existente com Lat e Long");
                  this.addressController.updateAddress(a_id, this.endereco)
                  .then((res:any) => {
                    console.log(res);

                    console.log("Verificando o tipo do usuário");
                    if(!!this.currentUser.cpfcnpj){
                      this.sellerController.changeAddress(this.currentUser.id, ad);
                      console.log("Modificar endereço vendedor");
                    }
                    else{
                      this.customerController.changeAddress(this.currentUser.id, ad);
                      console.log("Modificar endereço cliente");
                    }

                    this.currentUser.address_id = a_id;
                    this.session.remove();
                    this.session.create(this.currentUser);
                    this.presentToast("Endereço cadastrado!");
                    this.navCtrl.setRoot(MeuPerfilPage);
                  })
                  .catch(e => console.error(e));
                }
                else{
                  console.log("Endereço não criado no banco ainda");
                  this.addressController.createAddress(this.endereco)
                  .then((res:any) => {
                    if(res.status == "success"){

                      console.log("Endereço criado no banco");

                      this.addressController.getAddressPerAddressCepAndNumber(temp)
                        .then((res: any) => {

                          console.log("Recebendo id do novo endereço criado");

                          let temp2:any = {"address_id":""};
                          let a_id2 = res.data[0].id
                          temp2.address_id = a_id2;

                          console.log("Verificando o tipo do usuário");
                          if(!!this.currentUser.cpfcnpj){

                            console.log("Se for do tipo vendedor:");
                            this.sellerController.changeAddress(this.currentUser.id,temp2)
                              .then((res:any) => {
                                if(res.status == "success"){

                                  console.log("Modificar endereço vendedor");
                                  this.currentUser.address_id = a_id2;
                                  this.session.remove();
                                  this.session.create(this.currentUser);
                                  this.presentToast("Endereço cadastrado!");
                                  this.navCtrl.setRoot(MeuPerfilPage);
                                }
                                else{
                                  console.log("Um erro ocorreu ao tentar modificar o endereço");
                                }
                              })
                          }
                          else{
                            console.log("Se for do tipo cliente:");
                            this.customerController.changeAddress(this.currentUser.id, temp2)
                              .then((res: any) => {
                                if (res.status == "success") {

                                  console.log("Modificar endereço cliente");
                                  this.currentUser.address_id = a_id2;
                                  this.session.remove();
                                  this.session.create(this.currentUser);
                                  this.presentToast("Endereço cadastrado!");
                                  this.navCtrl.setRoot(MeuPerfilPage);
                                }
                                else {
                                  console.log("Um erro ocorreu ao tentar modificar o endereço");
                                }
                              })
                          }
                        })
                        .catch(e => console.error(e));
                    }
                    else{
                      console.log("Um erro ocorreu ao tentar modificar o endereço");
                    }
                  })
                }
              })
          }
          else{
            console.log("Usuario já tem endereço")
            this.addressController.updateAddress(this.currentUser.id, this.endereco)
              .then((res: any) => {
                console.log("Atualizar o endereço já existente do usuário:");

                let ad2 = {"address_id":""};
                ad2.address_id = this.endereco.id;

                console.log("Verificar o tipo do usuário:");
                if (!!this.currentUser.cpfcnpj) {

                  console.log("Usuário vendedor");
                  this.sellerController.changeAddress(this.currentUser.id, ad2)
                    .then((res: any) => {
                      if (res.status == "success") {
                        this.presentToast("Endereço cadastrado!");
                        this.navCtrl.setRoot(MeuPerfilPage);
                      }
                      else {
                        console.log("Não foi possível atualizar o endereço");
                      }
                    })
                }
                else {
                  console.log("Usuário cliente");
                  this.customerController.changeAddress(this.currentUser.id, ad2)
                    .then((res: any) => {
                      if (res.status == "success") {
                        this.presentToast("Endereço cadastrado!");
                        this.navCtrl.setRoot(MeuPerfilPage);
                      }
                      else {
                        console.log("Não foi possível atualizar o endereço");
                      }
                    })
                }
                
                console.log(res);
                this.presentToast("Endereço cadastrado!");
                this.navCtrl.setRoot(MeuPerfilPage);
              })
              .catch(e => console.error(e));
          }
/*         }) */

     }
     else{
       this.presentToast("Preencha todos os campos com *");
     }
  }

  recuperarUser() {
    this.session.get()
      .then(res => {
        this.currentUser = res;
        console.log('usuário logado  >>> ', this.currentUser);
      });
  }

  validationFields():boolean{
    if(this.endereco.address === "" || this.endereco.address === " " || this.endereco.address === null || this.endereco.address === "undefined" || this.endereco.address.length < 1 || this.endereco.address === "endereco.address"){
      if(this.endereco.number === "" || this.endereco.number === " " || this.endereco.number === null || this.endereco.number === "undefined" || this.endereco.number.length < 1 || this.endereco.number === "endereco.number"){
        if(this.endereco.neighborhood === "" || this.endereco.neighborhood === " " || this.endereco.neighborhood === null || this.endereco.neighborhood === "undefined" || this.endereco.neighborhood.length < 1 || this.endereco.neighborhood === "endereco.neighborhood"){
          if(this.endereco.cep === "" || this.endereco.cep === " " || this.endereco.cep === null || this.endereco.cep === "undefined" || this.endereco.cep.length < 1 || this.endereco.cep === "endereco.cep"){
            return false;
          }
          else{
            return false;
          }
        }
        else{
          return false;
        }
      }
      else{
        return false;
      }
    }
    else{
      if (this.endereco.number === "" || this.endereco.number === " " || this.endereco.number === null || this.endereco.number === "undefined" || this.endereco.number.length < 1 || this.endereco.number === "endereco.number") {
        if (this.endereco.neighborhood === "" || this.endereco.neighborhood === " " || this.endereco.neighborhood === null || this.endereco.neighborhood === "undefined" || this.endereco.neighborhood.length < 1 || this.endereco.neighborhood === "endereco.neighborhood") {
          if (this.endereco.cep === "" || this.endereco.cep === " " || this.endereco.cep === null || this.endereco.cep === "undefined" || this.endereco.cep.length < 1 || this.endereco.cep === "endereco.cep") {
            return false;
          }
          else{
            return false;
          }
        }
        else{
          return false;
        }

      }
      else{
        if (this.endereco.neighborhood === "" || this.endereco.neighborhood === " " || this.endereco.neighborhood === null || this.endereco.neighborhood === "undefined" || this.endereco.neighborhood.length < 1 || this.endereco.neighborhood === "endereco.neighborhood") {
          if (this.endereco.cep === "" || this.endereco.cep === " " || this.endereco.cep === null || this.endereco.cep === "undefined" || this.endereco.cep.length < 1 || this.endereco.cep === "endereco.cep") {
            return false;
          }
          else {
            return false;
          }
        }
        else {
          if (this.endereco.cep === "" || this.endereco.cep === " " || this.endereco.cep === null || this.endereco.cep === "undefined" || this.endereco.cep.length < 1 || this.endereco.cep === "endereco.cep") {
            return false;
          }
          else {
            return true;
          }
        }
      }
    }
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 1500,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

}
