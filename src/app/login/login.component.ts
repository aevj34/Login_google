import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  auth2: any;

  constructor() { }

  ngOnInit() {
    this.googleInit();
  }

  
  googleInit() {
    gapi.load('auth2', () => {

      this.auth2 = gapi.auth2.init({
        client_id: '677389099104-di5219bg1u50hl2pjl9adhfnpgebc9pv.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignIn(document.getElementById('btnGoogle'));

    });
  }

attachSignIn(element) {

  this.auth2.attachClickHandler(element, {}, (googleUser) => {

    const profile = googleUser.getBasicProfile();

    const token = googleUser.getAuthResponse().id_token;

    console.log(token);

    // this.usuarioService.loginGoogle(token)
    // .subscribe(resp => {
    //   window.location.href = '#/dashboard';
    // });

  });

}

  ingresar(forma: NgForm) {

    if (forma.invalid) {
      return;
    }


    // const usuario = new Usuario(
    //   null,
    //   forma.value.email,
    //   forma.value.password);

    //   this.usuarioService.login(usuario, forma.value.recuerdame)
    //   .subscribe(resp => {
    //     this.router.navigate(['/dashboard']);
    //   });


  // console.log(forma.valid);
  // console.log(forma.value);



  // this.router.navigate(['/dashboard']);
  }


}
