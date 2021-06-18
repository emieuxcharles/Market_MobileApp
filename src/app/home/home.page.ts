import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],


})
export class HomePage {

  items: Observable<any[]>;

  test:string;

  dataUser = {
    email: '',
    password: ''
  };

  connecterUserEmail: string;
  connectedUserUid: string;

  connected:boolean;

  dataReceive;

  constructor(public afDB: AngularFireDatabase, public afAuth: AngularFireAuth, public toastController: ToastController, db: AngularFireDatabase) {
    this.afAuth.authState.subscribe(auth => {
      if (!auth) {
        console.log('non connecté');
        this.connected = false;
      } else {
        console.log("connecté");
        this.connected = true;
        this.connecterUserEmail = auth.email;
        this.connectedUserUid = auth.uid;

      }
    })
    this.items = db.list('Users').valueChanges()
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your text have been send.',
      duration: 2000,
    });
    toast.present();
  }

  add(test) {
    this.afDB.list('Users').push({
      text: test,
      fromUser: this.connectedUserUid
    });
    this.test = '';
    this.presentToast();
  }
  

  login(){
    console.log(this.dataUser.email);
    console.log(this.dataUser.password);
    this.afAuth.signInWithEmailAndPassword(this.dataUser.email, this.dataUser.password);
    this.dataUser = {
      email: '',
      password: ''
    };
  }

  signUp(){
    this.afAuth.createUserWithEmailAndPassword(this.dataUser.email, this.dataUser.password);
    this.dataUser = {
      email: '',
      password: ''
    };
  }

  logout(){
    this.afAuth.signOut();
  }

  

}
