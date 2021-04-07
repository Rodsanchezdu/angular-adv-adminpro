import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const base_url=environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  async actualizarFoto(
    archivo:File,
    tipo: 'usuarios' | 'medicos' | 'hospitales', 
    id:string
  ){

    try {
      
      //prepación de la url para la petición
      const url=`${base_url}/uploads/${tipo}/${id}`;
      //se alista el body de la petición
      const formData=new FormData();
      formData.append('imagen', archivo);
      //se trabaja la subida del archivo
      const resp=await fetch(
        url,
        {
          method:'PUT',
          headers:{
            'x-token':localStorage.getItem('token') || ''
        },
        body:formData
      });
      // se guarda el resutlado de la petición
      const data = await resp.json();

      if(data.ok){
        return data.nombreArchivo; 
      }else{
        console.log(data);
        return false; 
      }
      

    } catch (error) {
      console.log(error);
      return false; 
      
    }

  }




}
