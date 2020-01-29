import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { NavController, AlertController } from '@ionic/angular';




@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage {

  timestamp = Number(new Date());
  date = new Date(this.timestamp);
  verificationCode = '';
  OTP = '';
  phoneNumber = '+91' + '';
  

  constructor(public afAuth: AngularFireAuth, public navCtrl: NavController, private alertCtrl: AlertController,
              )
  {}
getOTP() {

    this.afAuth.auth.signInWithPhoneNumber(this.phoneNumber, new auth.RecaptchaVerifier('recaptcha-container'))
      .then( (confirmationResult) => {
       this.verificationCode = window.prompt('Please enter the verification ' +
            'code that was sent to your mobile device.');
       console.log('Time:' + this.date + 'Phone No: ' + this.phoneNumber);
       this.navCtrl.navigateRoot(['/login']);

       return confirmationResult.confirm(this.verificationCode);
      })
      .catch((error) => {
        // Handle Errors here.
      }); 
  }

}

