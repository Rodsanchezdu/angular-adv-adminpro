import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public profileForm:any;
  public usuario:Usuario; 
  public imagenSubida:any; //FIXME: cambiar a tipo file
  public imgTemp:any=''; 

  constructor( private fb : FormBuilder, 
               private usuarioService:UsuarioService, 
               private fileUploadService:FileUploadService) {
  
    this.usuario=usuarioService.usuario;            
  }

  ngOnInit(): void {
    this.profileForm=this.fb.group({
      nombre:[this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]]
    })
  }

  actualizarPerfil(){
    this.usuarioService.actualizarPerfil(this.profileForm.value)
      .subscribe(()=>{
        //actualizando datos con lo que puso en el form
        const{nombre, email}=this.profileForm.value; 
        this.usuario.nombre=nombre;
        this.usuario.email=email;
        Swal.fire('Guardado', 'Los cambios fueron guardados', 'success')
      }, 
      (error)=>{
        Swal.fire('No se pudo actualizar', error.error.msg, 'error')
      })
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
    const uid:string=this.usuario.uid||'';
    this.fileUploadService.actualizarFoto(this.imagenSubida, 'usuarios', uid)
      .then( img=>{
        this.usuario.img=img
        Swal.fire('Actualización exitosa', 'La imagen fue actualizada con éxito', 'success')
      })
      .catch(error=>{
        console.log(error)
        Swal.fire('Error', 'No se pudo actualizar la imagen', 'warning')
      })
  }

}
