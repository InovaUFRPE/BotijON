import { Storage } from "@ionic/storage";

//pacote para transformar nossa classe em injetável
import { Injectable } from '@angular/core';

@Injectable()
export class Session {

    constructor(public storage: Storage) {

    }
    // setando uma seção e passando o tipo de usuário
    create(usuario: any) {
        this.storage.clear();
        this.storage.set('usuario', usuario);
    }

    get(): Promise<any> {
        return this.storage.get('usuario');
    }

    // Quando deslogar deve remova do storage
    remove() {
        this.storage.remove('usuario');
        this.storage.clear().then(() => {
            console.log('all keys cleared');
        });
    }

    exist() {
        this.get().then(res => {
            console.log('resultado >>> ', res);
            if (res) {
                console.log('resultado IF');
                return true;
            } else {
                console.log('resultado else');
                return false;
            }
        });
    }
}