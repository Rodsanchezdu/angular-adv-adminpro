import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {
  menuItems:any; 

  public imgUrl='';
  public nombre='';
  public usuario:Usuario; 


 
  
  constructor( private sidebarService:SidebarService, 
               private usuarioService:UsuarioService,
               private router: Router) {      
    this.menuItems = sidebarService.menu;
    console.log(this.menuItems);
    this.usuario=usuarioService.usuario; 
    
  }

  ngOnInit(): void {
  }

}
