import { Injectable } from '@angular/core';
import { Language } from '../language';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor() { }
  languages:Language[] = [
    new Language(1,"English","en-US"),
    new Language(2,"Français","fr-FR"),
    new Language(3,"عربي","ar-TN"),
    new Language(4,"German","de-DE")
  ]

  getLanguages():Language[] {
    return this.languages;
  }
}
