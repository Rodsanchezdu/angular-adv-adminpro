import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css']
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    this.getUsuarios().then( body=>{
      console.log('data del body', body);
    } )
    // const promesa = new Promise((resolve, reject)=>{
    //   if(false){
    //     resolve('Hola mundo'); 
    //   }else{
    //     reject('Algo salió mal')
    //   }
    // });

    // promesa.then((mensaje)=>{
    //   console.log(mensaje);
    // }).catch(error=>{
    //   console.log(error);
    // })

    // console.log("fin del init");
  }


  getUsuarios(){

    const promesa = new Promise( (res, rej)=>{
      fetch('https://reqres.in/api/users')
      .then( resp=>{
        resp.json().then( body=>{
            res(body.data)
        })
      })
    });

    return promesa; 
  }

}
