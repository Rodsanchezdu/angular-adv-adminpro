import { Injectable, EventEmitter } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { environment } from '../../environments/environment.prod';

const base_url=environment.base_url; 

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  public tipo :'usuarios'| 'medicos'| 'hospitales' = 'usuarios';
  public id:string='';
  img:string=''; 

  //=========================  Usando subject y event emmiter ================================
  public obsModalSubj = new Subject<boolean>(); //tanto observable, es decir stream, como observer. 
  public obsCambioImgEmmiter:EventEmitter<string> = new EventEmitter<string>(); 
  //=========================================================================================
  
  
  
  constructor() { }


  abrirModal( tipo:'usuarios'| 'medicos'| 'hospitales', 
              id:string="",
              img:string='no-img' ){
    // this._ocultarModal=true;
    this.obsModalSubj.next(true);
    this.tipo=tipo; 
    this.id=id;
    if(img.includes('https')) {
      this.img=img; 
    }else{
      console.log(img);
      this.img=`${base_url}/uploads/${tipo}/${img}`
    }
  }

  cerrarModal(){
    // this._ocultarModal=false;
    this.obsModalSubj.next(false);
  }

  obsModal():Observable<boolean>{

    let modal:boolean=false; 
    return this.obsModalSubj.asObservable();
  }


}