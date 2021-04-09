import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { SidebarService } from '../services/sidebar.service';

//===========función global así se hace que TS confie============
declare function customInitFunctions():any;
//===============================================================

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  
  
  constructor(private settingsService:SettingsService, 
              private SidebarService:SidebarService) { }
  
  ngOnInit(): void {
    customInitFunctions();
    this.SidebarService.cargarMenu();
  }

}
