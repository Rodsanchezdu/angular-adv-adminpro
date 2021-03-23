import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styleUrls: ['./dona.component.css']
})
export class DonaComponent implements OnInit {

  //de la forma fea por no usar alias--> sigue en ngOnInit
  @Input() labels:string[]=['Valor por defecto 1', 'Valor por defecto 2', 'Valor por defecto 3'];
  
  @Input('data') doughnutChartData:number[][]=[ [250, 350, 100]  ];
  @Input() title:string="Sin título"

  //de la forma fea por no usar alias--> sigue en ngOnInit
  public doughnutChartLabels: Label[] = [];
  
  public colors:Color[]=[
    {backgroundColor:['#68576', '#009FEE','#F02059' ]}
  ]

  constructor() { }

  ngOnInit(): void {
    //por no usar un alias
    this.doughnutChartLabels = this.labels;
  }

  

}
