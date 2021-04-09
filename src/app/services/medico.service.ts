import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';
import { Hospital } from '../models/hospital.models';
import { Medico } from '../models/medico.model';

const base_url=environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class MedicoService {

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

  cargarMedicos(){
    const url=`${base_url}/medicos`;
    // console.log('hospitalService/cargarHos-url', url);
    return this.http.get<{ok:boolean, medicos:Medico[]}>(url, this.headers).pipe(
      map( (resp:{ok:boolean, medicos:Medico[]})=>resp.medicos)
    );
  }

  
  crearMedico(medico:{nombre:string, hospital:string}){

    const url=`${base_url}/medicos`;
    // console.log('hospitalService/cargarHos-url', url);
    return this.http.post<{ok:boolean, medico:Medico}>(url, medico,this.headers,);

  }

  obtenerMedicoById(id:string){
    const url=`${base_url}/medicos/${id}`;
    return this.http.get<{ok:boolean, medico:Medico}>(url, this.headers).pipe(
      map( (resp:{ok:boolean, medico:Medico})=>resp.medico)
    );
  }

  actualizarMedico(medico:Medico ){

    const url=`${base_url}/medicos/${medico.id}`;
    // console.log('hospitalService/cargarHos-url', url);
    return this.http.put<{ok:boolean, nuevoMedico:Medico}>(url, medico,this.headers,);

  }

  eliminarMedico(_id:string ){

    const url=`${base_url}/medicos/${_id}`;
    // console.log('hospitalService/cargarHos-url', url);
    return this.http.delete<{ok:boolean, msg:string, medicos:Medico[]}>(url,this.headers,);

  }
}
