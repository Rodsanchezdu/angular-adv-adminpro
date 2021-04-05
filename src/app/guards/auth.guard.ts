import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private usuarioService:UsuarioService,
              private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      // lo normal sería hacer el subscribe acá pero parece que si lo quito igual el guard se encargado de todo
      // tanto de subscribirse como de desubscribirse 
      // this.usuarioService.validarToken().subscribe( resp=>{
      //   console.log('paso el guard del token', resp);
      // })

    return this.usuarioService.validarToken()
      .pipe(
        tap( estaAutenticado=>{
          // se está atrapando el booleando que regresa validarToken
          if(!estaAutenticado){
            console.log("detecto que no está autorizado", estaAutenticado);
            //en caso de que no lo saca de la ruta que intenta y lo manda al login
            this.router.navigateByUrl("/login");
          }
          console.log("detecto que  está autorizado", estaAutenticado);
          
        })
      )
  }
  
}
