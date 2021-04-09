import { LEADING_TRIVIA_CHARS } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusquedasService } from '../../services/busquedas.service';
import { Usuario } from '../../models/usuario.model';
import { Hospital } from '../../models/hospital.models';
import { Medico } from '../../models/medico.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {

  public usuarios:Usuario[]=[];
  public hospitales:Hospital[]=[];
  public medicos:Medico[]=[];

  constructor( private activatedRouter:ActivatedRoute, 
               private busquedasService:BusquedasService) { }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(({termino})=>{
      this.busquedaGlobal(termino);
    })
  }


  busquedaGlobal(termino:string){
    this.busquedasService.busquedaGlobal(termino).subscribe((resp:any)=>{
      this.usuarios=resp.usuarios;
      this.hospitales=resp.hospitales;
      this.medicos=resp.medicos;

    })
  }

}
