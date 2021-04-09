import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital.models';
import Swal from 'sweetalert2';
import { HospitalService } from '../../../services/hospital.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedasService } from '../../../services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public hospitales:Hospital[]=[];
  public hospitalesTemp:Hospital[]=[];
  public cargando:boolean=true; 
  public imgSubs:Subscription=new Subscription();


  constructor( private hospitalService:HospitalService,
               private modalImagenService:ModalImagenService,
               private buscarService:BusquedasService 
               ) { }

  ngOnInit(): void {
    this.cargarHospitales(); 
    this.modalImagenService.obsCambioImgEmmiter
      .pipe(delay(100))
      .subscribe(img=>{
        this.cargarHospitales();
      })

  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }


  cargarHospitales(){
    this.cargando=true; 
    this.hospitalService.cargarHospitales().subscribe(hospitales=>{
       this.cargando=false;
       this.hospitales=hospitales;
       this.hospitalesTemp=hospitales;

    })
  }

  guardarCambios(hospital:Hospital){
    console.log(hospital);
    this.hospitalService.actualizarHospital(hospital.id, hospital.nombre).subscribe(resp=>{
      Swal.fire('Actualizado', hospital.nombre, 'success')
    })
  }

  eliminarHospital(hospital:Hospital){
    console.log(hospital);
    this.hospitalService.eliminarHospital(hospital.id).subscribe(resp=>{
      this.cargarHospitales();
      Swal.fire('Borrado', hospital.nombre, 'success')
    })
  }

  async abrirSweetAlertModal(){

    const {value=""}  = await Swal.fire<string>({
      title:'Crear hospital',
      text:'Ingrese el nombre el nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital', 
      showCancelButton:true
    })
    if(value.trim().length>0){
      this.hospitalService.crearHospital(value)
        .subscribe((resp:any)=>{
          console.log(resp);
          this.hospitales.push(resp.hospital)
        })

    }
    

  }

  abrirModal(hospital:Hospital){
    this.modalImagenService.abrirModal('hospitales', hospital.id, hospital.img);
  }

  busquedaHospitales(termino:any){
    if(termino.length===0){
      return this.hospitales=this.hospitalesTemp;
    }

    this.buscarService.buscar('hospitales', termino)
      .subscribe((resp:any)=>{
        this.hospitales=resp;
      })
      
    return 'hospitales Cargados'
  }

}
