import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private linkTheme = document.querySelector('#theme');
  
  constructor() { 
    const themeUrl= localStorage.getItem('theme') || './assets/css/colors/megna.css';
    this.linkTheme?.setAttribute('href', themeUrl);
  }


  changeTheme(theme:string){
    const url = `./assets/css/colors/${theme}.css`;
    this.linkTheme?.setAttribute('href', url);
    localStorage.setItem('theme', url);
    this.checkCurrentTheme();
  }

  checkCurrentTheme(){
    //si bien funciona pero llama DOM cada que se ejecuta
    const links:NodeListOf<Element>= document.querySelectorAll('.selector');  
    
    links.forEach(element=>{
      element.classList.remove('working');
      //creando el posible enlace
      const btnTheme=element.getAttribute('data-theme');
      const btnThemeUrl= `./assets/css/colors/${btnTheme}.css`;

      const currentTheme=this.linkTheme?.getAttribute('href');
      if(btnThemeUrl===currentTheme){
        element.classList.add('working');
      }
    })
  }   
}
