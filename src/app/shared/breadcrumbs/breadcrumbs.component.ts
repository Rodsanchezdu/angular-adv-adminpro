import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [],
})
export class BreadcrumbsComponent implements OnDestroy{
  public titulo: string = 'Sin título';
  public tituloSubs$: Subscription;

  constructor(private router: Router) {
    this.tituloSubs$ = this.getParamData()
                        .subscribe((data) => {
                          this.titulo = data.titulo;
                          console.log(this.titulo);
                        });
  }
  
  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe(); 
  }

  getParamData() {
    return this.router.events.pipe(
      filter((event: any) => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((data: ActivationEnd) => data.snapshot.data)
    );
  }
}
