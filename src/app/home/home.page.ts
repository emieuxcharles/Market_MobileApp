import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { MyaccountPage } from '../modals/myaccount/myaccount.page';
import { ModalController } from '@ionic/angular';



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

  dataReturned: any;

  connecterUserEmail: string;
  connectedUserUid: string;

  connected:boolean;

  dataReceive;

  connectedToMarket:boolean = true;

  myProduct = [];
  productCounter = 0;

  constructor(public modalController: ModalController, public afDB: AngularFireDatabase, public afAuth: AngularFireAuth, public toastController: ToastController, db: AngularFireDatabase) {
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

  async myAccount() {
    const modal = await this.modalController.create({
      component: MyaccountPage,
      componentProps: {
        "currentmodal": 'myaccountmodal'
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
        //alert('Modal Sent Data :'+ dataReturned);
      }
    });

    return await modal.present();
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

  connectToMarket(){
    if (this.connectedToMarket == true){
      this.connectedToMarket = false      
    }else{
      this.connectedToMarket = true
    }
  }

  userFromMail(str:string){
    var a = str.split('.')[1];
    return a.charAt(0).toUpperCase() + a.slice(1);
     
  }

  addToMyProduct(){

    this.productCounter++;

    if(this.productCounter == 1){
      this.myProduct.push({"name": "Tomate", "url": "https://fac.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Ffac.2F2020.2F07.2F01.2F87b07c44-7505-4f0b-b5ab-dea24d5d7521.2Ejpeg/750x562/quality/80/crop-from/center/cr/wqkgVW5zcGxhc2ggLyBGZW1tZSBBY3R1ZWxsZQ%3D%3D/quels-sont-les-bienfaits-de-la-tomate.jpeg"})
    } else if(this.productCounter == 2){
      this.myProduct.push({"name": "Cereales", "url": "https://www.carrefour.fr/media/1500x1500/Photosite/PGC/EPICERIE/3421557501890_PHOTOSITE_20200812_102049_0.jpg?placeholder=1"})
    } else if(this.productCounter == 3){
      this.myProduct.push({"name": "Boeuf", "url": "https://barakashop.fr/wp-content/uploads/2018/11/entrecote.jpg"})
    } else if(this.productCounter == 4){
      this.myProduct.push({"name": "Champignon", "url": "https://cuisine-test.com/wp-content/uploads/2019/02/comment-cuisiner-des-champignons-de-paris-930x620.jpg"})
    } else if(this.productCounter == 5){
      this.myProduct.push({"name": "Carotte", "url": "https://lh3.googleusercontent.com/proxy/SB_AWcN-5fDnRcZpKwkdp8QPakJS89IxmTI_3091gTlhc2_kzhYxT5yXVsRVKYIYUYvFLOPtI2SRsCFRyzCIvu8TGUugK0-fw3akazQ-Co-CU-bs"})
    } else {
      this.myProduct.push({"name": "Other Product", "url": "url.html"})
    }



    console.log(this.productCounter)
    console.log(this.myProduct)
    //this.myProduct.push({})
  
    
  }

  

}
