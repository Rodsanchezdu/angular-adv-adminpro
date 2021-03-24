import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from "rxjs/operators";

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit, OnDestroy {

  public obsSubscription:Subscription; 

  constructor() {

    this.obsSubscription = this.retornaObservable().pipe( retry(1)).subscribe(
       valor=> console.log('Subs:', valor),
       error=>{ console.warn(error) }, 
       ()=>{ console.info('Obs terminado')}
    );

    this.retornaIntervalo().subscribe(
      valor=>console.log(valor),
      console.error, //Esto es lo mismo de arriba en el caso del error es una simplifación de JS
    )



  }
  ngOnDestroy(): void {
    this.obsSubscription.unsubscribe(); 
  }

  ngOnInit(): void {
  }

  retornaObservable():Observable<number>{
    let i=-1; 
    const obs$=new Observable<number>( observer=>{
      const intervalo=setInterval(()=>{
        i++;
        if(i===2){
          console.log('^^^^^^^   error acaba de emitir a  2');
          observer.error('I llego a 2');
        }
        observer.next(i);

        if(i===30){
          clearInterval(intervalo);
          observer.complete();
        }

        
      },1000);
    });
    return obs$
  }

  retornaIntervalo(){
    const intervalo$=interval(300).pipe(
      map(valor=>valor+1),
      filter(valor=>{
        if(valor%2===0){
          return true
        }else{
          return false
        }
      } ),
      take(10), 
    );
    return intervalo$; 
  }

}
