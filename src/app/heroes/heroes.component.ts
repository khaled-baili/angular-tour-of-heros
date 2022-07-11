import { Component, OnInit } from '@angular/core';
import { Heros } from "../model/heros";
import { HeroService } from '../service/hero.service';
import {MessageService} from "../service/message.service";
import {Hero} from "../class/hero";
import {AppComponent} from "../app.component";


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  selectedHero?: Heros;
  heroes: Heros[] = [];
  constructor(private heroService: HeroService,private messageService: MessageService) {
  }



  ngOnInit(): void {
    this.getHeros();
  }
  getHeros():void {
    this.heroService.getHeroes().subscribe(heroes => {this.heroes = heroes;
    console.log(this.heroes)});

  }
  add(name: string): void {
    console.log(name)
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }
  delete(hero: Heros): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }

}
