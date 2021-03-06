import { Component, OnInit, OnDestroy } from '@angular/core';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

import { Usuario } from 'src/app/models/usuario.model';

import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { UsuarioService } from '../../../services/usuario.service';



@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public imgSubs:Subscription=new Subscription();
  public cargando:boolean=true;
  public totalUsuarios:number=0;
  public usuarios:Usuario[]=[];
  public usuariosTemp:Usuario[]=[];
  public desde:number=0; 

  constructor(private usuarioService:UsuarioService,
              private busquedaService:BusquedasService, 
              private modalImagenService:ModalImagenService          
    ) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.CargarUsuarios();
    this.modalImagenService.obsCambioImgEmmiter
      .pipe(delay(100))
      .subscribe(img=>{
        this.CargarUsuarios();
      })
  }

  CargarUsuarios(){
    this.cargando=true; 
    this.usuarioService.cargarUsuarios(this.desde)
      .subscribe(({total, usuarios})=>{
        this.totalUsuarios=total;
        this.usuarios=usuarios; 
        //por si luego se necesita la info anterior se guarda en una temp
        this.usuariosTemp=usuarios; 
        this.cargando=false;
        
      })
  }

  cambiarPagina( valor:number){

    this.desde +=valor;
    if(this.desde<0){
      this.desde=0;
    } else if (this.desde>this.totalUsuarios){
      this.desde-=valor;       
    }
    
    //vuelve a cargar los usuarios con el NUEVO desde
    this.CargarUsuarios();


  }

  buscar(termino:string){

    //si ve que no hay nada le da lo usuarios cargados en el perfil por defecto
    if(termino.length===0){
      return this.usuarios=this.usuariosTemp;
    }

    this.busquedaService.buscar('usuarios', termino).subscribe( resultados=>{
       const resultadoParse:any=resultados;
       this.usuarios=resultadoParse;
    })
    return this.usuarios;
  }

  eliminarUsuario(usuario:Usuario){

    //Evitando que se borre as?? mismo
    if(usuario.uid===this.usuarioService.uid){
      return Swal.fire('Error', 'No puede borrarse as?? mismo', 'error')
    }

    Swal.fire({
      title: 'Borrar usuario?',
      text: `Est?? a punto de borrar a ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(usuario).subscribe(resp=>{
          Swal.fire(
          'Borrado',
          `${usuario.nombre} fue eliminado correctamente`,
          'success'
          )
          return this.CargarUsuarios();
        })
        
      }
      
    })

    return ''; //porque sino retorna en todo lado genera un error


  }

  cambiarRole(usuario:Usuario){
    console.log(usuario);
    console.log(usuario.role);
    this.usuarioService.guardarUsuario(usuario).subscribe(resp=>{
      console.log(resp);
    })
  }

  abrirModal(usuario:Usuario){
    this.modalImagenService.abrirModal('usuarios', usuario.uid, usuario.img);
  }

}
