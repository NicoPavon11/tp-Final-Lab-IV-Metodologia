import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorThemeService {
  private darkModeKey = 'darkMode';

  constructor() {
    this.loadTheme();
  }

  toggleTheme(){
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem(this.darkModeKey,JSON.stringify(isDarkMode));
  }

  private loadTheme(){
    const isDarkMode = JSON.parse(localStorage.getItem(this.darkModeKey) || 'false');
    if(isDarkMode){
      document.body.classList.add('dark-mode')
    }
  }
}
