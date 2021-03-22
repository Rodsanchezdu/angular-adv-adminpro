import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';

const routes:Routes=[
  {
    path:'dashboard', 
    component:PagesComponent,
    children:[ //va uno de estos tres dentro del padre que se está mostrando
      {path:'', component: DashboardComponent},
      {path:'progress', component: ProgressComponent},
      {path:'grafica1', component: Grafica1Component },
    
    ]
  }

]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ], 
  exports:[
    RouterModule
  ]
})
export class PagesRoutingModule { }
