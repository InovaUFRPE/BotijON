import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
    "address_id":''
  };

  endereco:any = {
    "address":"",
    "number":"",
    "neighborhood":"",
    "city":"",
    "state":"",
    "cep":"",
    "reference_point":"",
    "latitude":"",
    "longitude":""
  }

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public session: Session,
    public storage: Storage,
    public addressController: AddressesControllerProvider,
    public customerController: CustomersController,
    public sellerController: SellersController
    ){
    
      this.recuperarUser();
      if (this.currentUser.address_id != null){
        this.addressController.getAddressById(this.currentUser.address_id)
          .then((res:any) => {
            console.log(res.data[0]);
            this.endereco = res.data[0];
          })
          .catch(e => console.error(e));
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditarEnderecoPage');
  }

  goToBeforePage(){
    this.navCtrl.pop();
  }

  editarEndereco(){
    let addressString = this.addressController.stringAddress(this.endereco);
    this.addressController.getCoordenates(addressString)
      .then((res: any) => {
        let data = res.results[0].geometry.location;

        this.endereco.latitude = String(data.lat);
        this.endereco.longitude = String(data.lng);

        if (this.currentUser.address_id == null) {

          let temp: any = { "address": "", "number": "", "cep": "" }
          temp.address = this.endereco.address;
          temp.number = this.endereco.number;
          temp.cep = this.endereco.cep;

          this.addressController.getAddressPerAddressCepAndNumber(temp)
            .then((res:any) => {
              if(res.status == "success"){

                let a_id = res.data[0].id;
                let ad = {"address_id":""}
                ad.address_id = a_id;
                console.log("entrou aqui 1");
                this.addressController.updateAddress(a_id, this.endereco)
                .then((res:any) => {
                  console.log(res);
                  console.log("entrou aqui 2");
                  if(!!this.currentUser.cpfcnpj){
                    this.sellerController.changeAddress(this.currentUser.id, ad);
                    console.log("entrou aqui 2.1");
                  }
                  else{
                    this.customerController.changeAddress(this.currentUser.id, ad);
                    console.log("entrou aqui 2.2");
                  }

                  this.currentUser.address_id = a_id;
                  this.session.remove();
                  this.session.create(this.currentUser);
                  this.navCtrl.setRoot(MeuPerfilPage);
                })
                .catch(e => console.error(e));
              }
              else{
                console.log("entrou aqui 3");
                this.addressController.createAddress(this.endereco)
                .then((res:any) => {
                  if(res.status == "success"){

                    console.log("entrou aqui 4");

                    this.addressController.getAddressPerAddressCepAndNumber(temp)
                      .then((res: any) => {

                        console.log("entrou aqui 5");

                        let temp2:any = {"address_id":""};
                        let a_id2 = res.data[0].id
                        temp2.address_id = a_id2;

                        if(!!this.currentUser.cpfcnpj){

                          console.log("entrou aqui 6");
                          this.sellerController.changeAddress(this.currentUser.id,temp2)
                            .then((res:any) => {
                              if(res.status == "success"){

                                console.log("entrou aqui 7");
                                this.currentUser.address_id = a_id2;
                                this.session.remove();
                                this.session.create(this.currentUser);
                                this.navCtrl.setRoot(MeuPerfilPage);
                              }
                              else{
                                console.log("error 2");
                              }
                            })
                        }
                        else{
                          console.log("entrou aqui 8");
                          this.customerController.changeAddress(this.currentUser.id, temp2)
                            .then((res: any) => {
                              if (res.status == "success") {

                                console.log("entrou aqui 9");
                                this.currentUser.address_id = a_id2;
                                this.session.remove();
                                this.session.create(this.currentUser);
                                this.navCtrl.setRoot(MeuPerfilPage);
                              }
                              else {
                                console.log("error 3");
                              }
                            })
                        }
                      })
                      .catch(e => console.error(e));
                  }
                  else{
                    console.log("error 4");
                  }
                })
              }
            })
        }
        else{
          console.log("entrou aqui 10");
          this.addressController.updateAddress(this.currentUser.id, this.endereco)
            .then((res: any) => {
              console.log("entrou aqui 11");

              let ad2 = {"address_id":""};
              ad2.address_id = this.endereco.id;

              if (!!this.currentUser.cpfcnpj) {

                this.sellerController.changeAddress(this.currentUser.id, ad2)
                  .then((res: any) => {
                    if (res.status == "success") {
                      this.navCtrl.setRoot(MeuPerfilPage);
                    }
                    else {
                      console.log("error");
                    }
                  })
              }
              else {
                this.customerController.changeAddress(this.currentUser.id, ad2)
                  .then((res: any) => {
                    if (res.status == "success") {

                      this.navCtrl.setRoot(MeuPerfilPage);
                    }
                    else {
                      console.log("error");
                    }
                  })
              }
              
              console.log(res);
              this.navCtrl.setRoot(MeuPerfilPage);
            })
            .catch(e => console.error(e));
        }
      })

  }

  recuperarUser() {
    this.session.get()
      .then(res => {
        this.currentUser = res;
        console.log('usuário logado  >>> ', this.currentUser);
      });
  }

}
