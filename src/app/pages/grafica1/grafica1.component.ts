import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl:'./grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component  {
  public Labels1:string[] = ['Pan', 'Azúcar', 'Huevos'];
  public Labels2:string[] = ['Arroz', 'Aguacates', 'Ají'];
  public Labels3:string[] = ['Frijol', 'Maíz', 'Lentejas'];
  public Labels4:string[] = ['Arepas', 'Empanadas', 'Mani'];

  public data1 = [ [350, 450, 100]  ];
  public data2 = [ [50, 150, 10]  ];
  public data3 = [ [70, 100, 70]  ];
  public data4 = [ [90, 200, 50]  ];

  
}
