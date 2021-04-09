import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment.prod';

const base_url=environment.base_url; 
@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img:string='no-img',tipo:'usuarios'|'medicos'|'hospitales'): string {

    if(!img){
      return `${base_url}/uploads/${tipo}/no-img`
    }

    if(img.includes('https')){
      return img;      
    }
    
    if(img){
      return `${base_url}/uploads/${tipo}/${img}`
    }else{
      return `${base_url}/uploads/${tipo}/no-img`
      
    }
  }

}
