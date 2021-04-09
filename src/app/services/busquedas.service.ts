import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';
import { Hospital } from '../models/hospital.models';
import { Medico } from '../models/medico.model';
import { Usuario } from '../models/usuario.model';

const base_url=environment.base_url; 

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor( private http:HttpClient) { }

  get token():string{
    return localStorage.getItem('token') || ''; 
  }
  get headers(){
    return{
      headers:{
        'x-token':this.token
      }
    }
  }

  private transformarUsuarios(resultados:any):Usuario[]{
    return resultados.map(
      (user:any)=>{
        return new Usuario(user.nombre, user.email, user.role, user.google, user.img, '', user.uid );
      }
    )
  }

  private transformarHospitales(resultados:any):Hospital[]{
    return resultados.map(
      (hospital:any)=>{
        return new Hospital(hospital.id, hospital.nombre,hospital.img, hospital.usuario );
      }
    )
  }

  private transformarMedicos(resultados:any):Medico[]{
    return resultados.map(
      (medico:any)=>{
        return new Medico(medico.nombre, medico.id,medico.img, medico.usuario, medico.hospital );
      }
    )
  }
  
  buscar( 
    tipo:'usuarios'| 'medicos'| 'hospitales', 
    termino:string
    ){
    const url=`${base_url}/todo/coleccion/${tipo}/${termino}`
    return this.http.get(url, this.headers)
             .pipe(
               map( (resp:any)=> {
                 switch (tipo) {
                   case 'usuarios':
                     return this.transformarUsuarios(resp.resultados);  
                   case 'hospitales':
                     return this.transformarHospitales(resp.resultados);
                   case 'medicos':
                     return this.transformarMedicos(resp.resultados)               
                   default:
                     return;
                 }
               })
             )
  }

}
