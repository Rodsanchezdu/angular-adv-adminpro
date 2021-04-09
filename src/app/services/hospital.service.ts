import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';
import { Hospital } from '../models/hospital.models';

const base_url=environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

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

  cargarHospitales(){

    const url=`${base_url}/hospitales`;
    // console.log('hospitalService/cargarHos-url', url);
    return this.http.get<{ok:boolean, hospitales:Hospital[]}>(url, this.headers).pipe(
      map( (resp:{ok:boolean, hospitales:Hospital[]})=>resp.hospitales)
    );

  }

  crearHospital(nombre:string){

    const url=`${base_url}/hospitales`;
    // console.log('hospitalService/cargarHos-url', url);
    return this.http.post<{ok:boolean, hospitales:Hospital[]}>(url, {nombre},this.headers,);

  }

  actualizarHospital(_id:string, nombre:string ){

    const url=`${base_url}/hospitales/${_id}`;
    // console.log('hospitalService/cargarHos-url', url);
    return this.http.put<{ok:boolean, msg:string, hospitales:Hospital[]}>(url, {nombre},this.headers,);

  }

  eliminarHospital(_id:string ){

    const url=`${base_url}/hospitales/${_id}`;
    // console.log('hospitalService/cargarHos-url', url);
    return this.http.delete<{ok:boolean, msg:string, hospitales:Hospital[]}>(url,this.headers,);

  }



}
