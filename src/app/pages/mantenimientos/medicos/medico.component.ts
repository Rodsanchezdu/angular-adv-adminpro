import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.models';
import { Medico } from 'src/app/models/medico.model';
import { HospitalService } from 'src/app/services/hospital.service';
import Swal from 'sweetalert2';
import { MedicoService } from '../../../services/medico.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
})
export class MedicoComponent implements OnInit , OnDestroy{

  medicoForm:any;
  public hospitales:Hospital[]=[];
  public hospitalSeleccionado:Hospital | undefined= new Hospital('','');
  public medicoSeleccionado:Medico=new Medico('','','');


  constructor( private fb:FormBuilder, 
               private hospitalService:HospitalService, 
               private medicoService:MedicoService, 
               private router:Router, 
               private activatedRouter:ActivatedRoute
               ) {
                 
                }
  ngOnDestroy(): void {
    this.medicoForm.get('hospital').valueChanges.unsubscribe(); 
    
  }

  ngOnInit(): void {

    this.activatedRouter.params
        .subscribe(({id})=> this.cargarMedico(id));

    // this.medicoService.obtenerMedicoById()
   
    this.cargarHospitales();
    
    this.medicoForm=this.fb.group({
      nombre:['', Validators.required], 
      hospital:['', Validators.required]
    })

    this.medicoForm.get('hospital').valueChanges
      .subscribe((hospitalId:any)=>{

        this.hospitalSeleccionado=this.hospitales.find( h=>h.id===hospitalId);

    });

  }

  

  cargarHospitales(){
    this.hospitalService.cargarHospitales()
    .subscribe((hospitales:Hospital[])=>{
      this.hospitales=hospitales;
      //TODO: hacer la validación en caso de que sea indefinido
    })
  }

  cargarMedico(id:string){
    if(id==='nuevo'){
      return; 
    }

    this.medicoService.obtenerMedicoById(id).pipe(delay(100)).subscribe(medico=>{

      if(!medico){
        this.router.navigateByUrl(`/dashboard/medicos`)

      }
      this.medicoSeleccionado=medico;
      //llenado los valores del form con lo que tiene actualmente
      const {nombre}=medico;
      const medicoPorGay:any=medico; 
      const id = medicoPorGay.hospital?._id;

      console.log(nombre, id);
      this.medicoForm.setValue({nombre, hospital:id })
      
    })
    
  }

  guardarMedico(){

    const {nombre}=this.medicoForm.value;

    if(this.medicoSeleccionado){
      //actualizar
      const data = {
        ...this.medicoForm.value,
        id:this.medicoSeleccionado.id        
      }

      this.medicoService.actualizarMedico(data).subscribe(resp=>{
        console.log(resp);
        Swal.fire('Actuali<ado', `${nombre} actualizado  correctamente`, 'success');


      })
    }else{
      //Crear
      this.medicoService.crearMedico(this.medicoForm.value).subscribe(resp=>{
        console.log(resp);
        Swal.fire('Creado', `${nombre} creado correctamente`, 'success');
        this.router.navigateByUrl(`/dashboard/medico/${resp.medico.id}`)
      })

    }
    

  }

}
