import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalImagenService } from '../../services/modal-imagen.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrls: ['./modal-imagen.component.css']
})

export class ModalImagenComponent implements OnInit, OnDestroy {
  public estadoModal:boolean=false; 
  public obsSubscription:Subscription;
  public imagenSubida:any; //FIXME: cambiar a tipo file
  public imgTemp:any='';

  constructor( public modalImagenService:ModalImagenService, 
               public fileUploadService:FileUploadService) {

    this.obsSubscription=this.modalImagenService.obsModal().subscribe( (estadoModal)=>{
      this.estadoModal=estadoModal;
    })
  }

  ngOnDestroy(): void {
   this.obsSubscription.unsubscribe();
  }

  ngOnInit(): void {    
  }

  cerrarModal(){
    this.imgTemp=null; 
    this.modalImagenService.cerrarModal();
    
  }  

  cambiarImagen(event:any){
    const file = event.target.files[0];
    this.imagenSubida=file;

    if(!file){
      this.imgTemp=null
      return;  
    }
    //renderizar la imagen que posiblemente quiera subir   
    const reader = new FileReader(); 
    const url64 = reader.readAsDataURL(file);

    reader.onloadend=()=>{
      this.imgTemp=reader.result;
    }
  }

  subirImagen(){
    
    const uid:string=this.modalImagenService.id;
    const tipo:'usuarios'| 'medicos'| 'hospitales'=this.modalImagenService.tipo;

    this.fileUploadService.actualizarFoto(this.imagenSubida, tipo, uid)
      .then( img=>{
        Swal.fire('Actualización exitosa', 'La imagen fue actualizada con éxito', 'success');
        this.modalImagenService.obsCambioImgEmmiter.emit(img);
        this.cerrarModal(); 
      })
      .catch(error=>{
        console.log(error)
        Swal.fire('Error', 'No se pudo actualizar la imagen', 'warning')
      })
  }

  
}
