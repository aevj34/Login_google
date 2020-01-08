import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Archivo } from '../models/archivo';
import { FileServiceService } from '../services/file-service.service';
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  auth2: any;
  archivos: Archivo[] = [];

  constructor(public fileService: FileServiceService) { }

  ngOnInit() {
    this.googleInit();
    this.getFiles();
  }

  getFiles() {
    this.fileService.getFiles()
    .subscribe((res: any) => {
      this.archivos = res;

      this.archivos.forEach(archivo => {
        archivo.ruta = environment.url + 'files/GetFile?filename=' + archivo.nombre ;
      });

    });
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



  getURLFile(fileName: string) {
    const url = environment.url + 'downloadfile/getfile?filename=' + fileName ;
    return url;
  }

}
