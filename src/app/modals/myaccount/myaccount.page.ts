import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.page.html',
  styleUrls: ['./myaccount.page.scss'],
})
export class MyaccountPage implements OnInit {

  dataUser = {
    email: '',
    password: ''
  };

  connecterUserEmail: string;
  connectedUserUid: string;
  connected:boolean;


  constructor(public afDB: AngularFireDatabase, public afAuth: AngularFireAuth, public modalController: ModalController) {
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
  }

  ngOnInit() {
  }

  closeModal() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss();
  }

  logout(){
    this.afAuth.signOut();
    this.modalController.dismiss();
  }



}
