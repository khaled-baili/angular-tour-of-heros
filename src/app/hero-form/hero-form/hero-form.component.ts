import { Component, OnInit } from '@angular/core';
import {Hero} from "../../class/hero";

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent implements OnInit {
  myHero =  new Hero(42, 'SkyDog',
    'Fetch any object at any distance',
    'Leslie Rollover');
  powers = ['Really Smart', 'Super Flexible',
    'Super Hot', 'Weather Changer'];

  model = new Hero(18, 'Dr IQ', this.powers[0], 'Chuck Overstreet')
  submitted = false;
  newHero() {
    this.model = new Hero(42, '', '');
  }
  onSubmit() { this.submitted = true; }

  constructor() { }


  ngOnInit(): void {
    console.log('My hero is called ' + this.myHero.name)
  }

}
