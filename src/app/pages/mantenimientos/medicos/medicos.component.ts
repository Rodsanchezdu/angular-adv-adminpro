import { Component, OnInit, OnDestroy } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from '../../../services/medico.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit, OnDestroy {

  public cargando:boolean=true;  
  public medicos: Medico[]=[];
  public medicosTemp: Medico[]=[];

  constructor( private medicoService: MedicoService,
               private modalImagenService: ModalImagenService, 
               private buscarService:BusquedasService            
    ) { }

  ngOnInit(): void {
    this.cargarMedicos();

    this.modalImagenService.obsCambioImgEmmiter
      .pipe(delay(100))
      .subscribe(img=>{
        this.cargarMedicos();
      })
  }

  ngOnDestroy(): void {
    this.modalImagenService.obsCambioImgEmmiter.unsubscribe();
  }

  cargarMedicos(){
    this.cargando=true;  
    this.medicoService.cargarMedicos().subscribe(medicos=>{
      this.cargando=false; 
      this.medicos=medicos;
      this.medicosTemp=medicos;
      console.log(this.medicos);
      console.log(this.cargando);

    })
    // this.medicoService
  }

  abrirModal(medico:Medico){
    this.modalImagenService.abrirModal('medicos', medico.id, medico.img);

  }

  buscar(termino:any){
    if(termino.length===0){
      return this.medicos=this.medicosTemp;
    }

    this.buscarService.buscar('medicos', termino)
      .subscribe((resp:any)=>{
        this.medicos=resp;
      })
      
    return 'medicos Cargados'
  }

  borrarMedico(medico:Medico){ 
    
    Swal.fire({
      title: 'Borrar medico?',
      text: `Está a punto de borrar a ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicoService.eliminarMedico(medico.id)
          .subscribe(resp=>{
            this.cargarMedicos();
            Swal.fire(
            'Medico borrado',
            `${medico.nombre} fue eliminado correctamente`,
            'success'
          )
        })
        
      }
      
    })


  }

}
