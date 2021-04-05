import {
  Component,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder,  Validators, FormGroup } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';
import { NgZone } from '@angular/core';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
  public email: string = '';
  public recuerdame = '';

  //para google
  public googleUser = {};
  public auth2: any = '';

  public loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    remember: [this.recuerdame, Validators.required],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService, 
    private ngZone:NgZone
  ) {}

  ngOnInit(): void {
    this.persistenciaDelRecuerdame();

    // creación del boton de google
    this.startApp();
  }

  persistenciaDelRecuerdame() {
    //Persistencia del recuerdame
    this.email = localStorage.getItem('email') || '';
    //en caso de que email tenga algo quiere decir que antes dijo que lo recordaran:
    if (this.email.length > 2) {
      this.loginForm.get('remember')?.setValue(true);
      this.loginForm.get('email')?.setValue(this.email);
    }
  }

  login() {
    console.log(this.loginForm.value);

    if (this.loginForm.invalid) {
      return;
    }

    this.usuarioService.login(this.loginForm.value).subscribe(
      (resp) => this.router.navigateByUrl('/dashboard'),
      (error) => {
        Swal.fire('Error', error.error.msg, 'error');
      }
    );
  }

  //======================================================================================
  //      métodos para Google
  //======================================================================================

  startApp = async () => {
    
    //Lo primero es renderizar el boton así sin lógica
    this.renderButtonModificado();
    
    //-------------------------------------------------------------------------
    //    ejecutar esto donde se necesite tener el auth2 para algo de google
    await this.usuarioService.googleInit();
    this.auth2 = await this.usuarioService.auth2;
    //-------------------------------------------------------------------------

    this.attachSignin(document.getElementById('my-signin2'));
  };

  attachSignin = (element: any) => {
    this.auth2.attachClickHandler(
      element,
      {},
      (googleUser: any) => {
        this.onSuccess(googleUser);
        this.usuarioService
          .loginGoogle(googleUser.getAuthResponse().id_token)
          .subscribe((resp) => {
            this.ngZone.run(()=>{
               //navegar al dashboard
               this.router.navigateByUrl('/');
            });
            
          });
      },
      (error: any) => {
        this.onFailure(error);
      }
    );
  };

  renderButtonModificado() {
    gapi.signin2.render('my-signin2', {
      scope: 'profile email',
      width: 240,
      height: 50,
      longtitle: true,
      theme: 'dark',
    });
  }

  onSuccess(googleUser: any) {
    var id_token = googleUser.getAuthResponse().id_token;
    console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
    console.log(id_token);
    this.usuarioService.loginGoogle(id_token);
  }

  onFailure(error: any) {
    console.log('*****************FALLO****************');
    console.log(error);
  }

  
}
