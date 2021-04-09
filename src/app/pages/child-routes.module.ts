import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
//mantenimientos
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../guards/admin.guard';





const childRoutes:Routes=[
  {path:'', component: DashboardComponent, data:{titulo:'Dashboard'}},
    {path:'account-settings', component: AccountSettingsComponent , data:{titulo:'Tema'}},
    {path:'buscar/:termino', component: BusquedaComponent , data:{titulo:'Búsquedas'}},
    {path:'grafica1', component: Grafica1Component , data:{titulo:'Graficas'}},
    {path:'perfil', component:PerfilComponent, data:{titulo:'perfil de usuario'}},
    {path:'progress', component: ProgressComponent, data:{titulo:'Progress'}},
    {path:'promesas', component:PromesasComponent, data:{titulo:'Promesas'}},
    {path:'rxjs', component:RxjsComponent, data:{titulo:'RxJs'}}, 
    //mantenimientos
    {path:'hospitales', component:HospitalesComponent, data:{titulo:'Hospital de aplicación'}}, 
    {path:'medicos', component:MedicosComponent, data:{titulo:'Medico de aplicación'}}, 
    {path:'medico/:id', component:MedicoComponent, data:{titulo:'Medico de aplicación'}}, 
    //rutas admin
    {path:'usuarios',canActivate:[AdminGuard] ,component:UsuariosComponent, data:{titulo:'Usuario de aplicación'}}, 
]

@NgModule({
  imports: [ RouterModule.forChild(childRoutes) ], 
  exports:[RouterModule]
})
export class ChildRoutesModule {  

}
