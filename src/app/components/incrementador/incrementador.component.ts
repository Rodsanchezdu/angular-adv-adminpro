import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent implements OnInit {

  @Input('valorProgreso') progreso:number=10;
  @Input() btnClass:string='btn-primary';


  @Output() valorSalida:EventEmitter<number>;
  

  constructor() { 
    this.valorSalida=new EventEmitter(); 
  }


  ngOnInit(): void {
    this.btnClass=`btn ${this.btnClass}`
  }
  
  cambiarValor(valor:number){
    if(this.progreso>=100 && valor>=0){
      this.valorSalida.emit(100);
      this.progreso=100;
      return;
    }
    if(this.progreso<=0 && valor<0){
      this.valorSalida.emit(0);

      this.progreso=0;
      return ;
    }
    this.valorSalida.emit(this.progreso);

    this.progreso=this.progreso+valor; 

  }

  onChange(valorEvent: number){
    if(valorEvent>=100){
      this.progreso=100; 
    }else if (valorEvent<=0){
      this.progreso=0; 
    }else{
      this.progreso=valorEvent; 
    }

    this.valorSalida.emit(this.progreso)

  }

}
