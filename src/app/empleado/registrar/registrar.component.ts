import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import api from 'src/config/config';
import { Router } from '@angular/router';
import Firebase from 'firebase/compat/app';

interface Registrar {
  name: String,
  email: String,
  password: String,
  password_confirmation: String

}

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})

export class RegistrarComponent implements OnInit {


  firebaseConfig ={
    apiKey: "AIzaSyDs5hgzmMFnzj9yBbAzvLIGZo-ZOa8XVcc",
    authDomain: "proyecto3dw.firebaseapp.com",
    projectId: "proyecto3dw",
    storageBucket: "proyecto3dw.appspot.com",
    messagingSenderId: "605446172714",
    appId: "1:605446172714:web:fc6da0c867e53d30cf9353"
   }


  fire=Firebase.initializeApp(this.firebaseConfig);




  constructor(
    public toastr: ToastrService,
    private router: Router,

  ) { }

  ngOnInit(): void {

  }




  async registro(nombre: string, apellido: string, usuario: string, password: string, confirmaPassword: string, dpi:string) {

    console.log(confirmaPassword);
    api.post('Usuario/registro', { nombre: nombre, apellido: apellido, usuario: usuario, contrasena: password, dpi:dpi })
      .then((response: any) => {
        if (response.status === 200) {



          this.toastr.success('Por favor ingresa al login', 'Totalmente registrado', {
            timeOut: 3000,
          });

          this.createUser(usuario,password)

          this.router.navigateByUrl('/');



        } else {
          this.toastr.error('todos los campos solicitados', 'Por favor debes ingresar', {
            timeOut: 3000,
          });
        }
      });



  }





  async createUser(email:string, pass:string) {
    await this.fire.auth().createUserWithEmailAndPassword(email,pass).then(() => {

      this.toastr.success('Ingresado en google', 'Totalmente registrado', {
        timeOut: 3000,
      });
       
     }).catch(response => {
       console.log(response+"aaaaaaa")
     });
 
  }

}
