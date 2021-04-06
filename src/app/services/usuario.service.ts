import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';

import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment.prod';
import { LoginForm } from '../interfaces/login-form.interface';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';

const base_url=environment.base_url;
declare const gapi:any; //para google

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  public auth2:any; //para google
  public usuario:Usuario=new Usuario('','');

  constructor( private http:HttpClient,
               private router:Router,
               private ngZone:NgZone) {
    this.googleInit();
  }
  get token():string{
    return localStorage.getItem('token') || ''; 
  }
  
  get uid():string{
    return this.usuario.uid || '';
  }



  googleInit(){

    return new Promise( resolve=>{    
      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id:
            '847440486088-6pn7uknmh6sb0o8qgevcgc510o719roq.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          // Request scopes in addition to 'profile' and 'email'
          //scope: 'additional_scope'
        });
        resolve('cargado el auth');
      })
    })
  }

  


  logout(){
    localStorage.removeItem('token');
    
    this.auth2 = gapi.auth2.getAuthInstance();
    this.auth2.signOut().then(()=> {
      //luego de salir navegar hacia afuera peeero toca con ngZone
      //porque lo que está acá es como si fuera ejecutado por otro 
      //y no en realidad por angular
      this.ngZone.run(()=>{
        this.router.navigateByUrl('/login');
      })
      // console.log('User signed out.');
    });

  }


  validarToken():Observable<boolean>{
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${base_url}/login/renew`, {
      headers:{
        'x-token':this.token
      }
    }).pipe(
      tap( (resp:any)=>{
        console.log('//creando todas las variables con lo que hay en resp.usuario');
        const {
          email, 
          google, 
          nombre,
          role, 
          img,
          uid
        }=resp.usuario; 

        this.usuario=new Usuario(nombre, email, role, google, img, '', uid); 
        localStorage.setItem('token', resp.token);
        
      }), 
      map(resp=>true),
      catchError( error=> of (false)) //si hay error crear un observable que retorna un false 
                                      //para no parar todo y como decir que solo no está autenticado
    )
  
  }
  
  crearUsuario(formData:RegisterForm){
    console.log('Creando usuario', formData);
    return this.http.post(`${base_url}/usuarios`, formData).pipe(
      tap(
        (resp:any)=>{
          
          localStorage.setItem('email', formData.email);
          localStorage.setItem('id', String(resp.usuario.uid));
          localStorage.setItem('token', resp.token);
          localStorage.setItem('usuario', JSON.stringify(resp.usuario));

        }

      )
    )
  }

  actualizarPerfil(data:{email:string, nombre:string, role:string}){
    const role=this.usuario.role||'';
    
    data={
      ...data, 
      role
    }
    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, {
      headers:{
        'x-token':this.token
      }
    });

  }

  login( formData:LoginForm){
    console.log('Creando usuario', formData);
    return this.http.post(`${base_url}/login`, formData).pipe(
      map(
        (resp:any)=>{

          if(!formData.remember){
            localStorage.setItem('email', '');
          }else{
            localStorage.setItem('email', formData.email);
          }
          localStorage.setItem('id', String(resp.usuario.uid));
          localStorage.setItem('token', resp.token);
          localStorage.setItem('usuario', JSON.stringify(resp.usuario));

          return true;   
        }
      )
    )
  }

  loginGoogle( token:string){
    return this.http.post(`${base_url}/login/google`, {token}).pipe(
      tap(
        (resp:any)=>{
          localStorage.setItem('token', resp.token);
        }
      )
    )
  }

}
