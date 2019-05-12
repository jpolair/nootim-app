import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, FormGroupName } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private alertCtrl: AlertController) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['jpolair@gmail.com', Validators.compose([Validators.required, Validators.email])],
      password: ['123456', Validators.required]
    });
    if (this.authService.isLogged()) {
      this.router.navigate(['/']);
    }
  }

  public login() {
    if (this.loginForm.valid) {
      const email = this.loginForm.controls.email.value;
      const password = this.loginForm.controls.password.value;
      this.authService.login(email, password)
        .subscribe(user => {
          if (this.authService.isLogged()) {
            this.router.navigate(['/']);
          }
          if (!this.authService.isLogged()) {
            this.presentAlert(user.message);
          }
        }, err => {
          console.log('err ', err);
        });
    } else {
      console.log('bla bla');
    }
  }

  public async presentAlert(message: string) {
    const alert = await this.alertCtrl.create({
      header: 'Erreur',
      message
    });
    await alert.present();
  }

}
