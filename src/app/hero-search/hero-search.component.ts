import {AfterViewInit, Component, ElementRef, OnChanges, OnInit, Renderer2, SimpleChanges,
  ViewChild
} from '@angular/core';
import {BehaviorSubject, debounceTime, distinctUntilChanged, Observable, Subject, switchMap} from "rxjs";

import {Heros} from "../model/heros";
import {HeroService} from "../service/hero.service";
import {Location} from "@angular/common";
import {NavbarComponent} from "../layout/navbar/navbar.component";
import {VoiceRecognitionService} from "../service/voice-recognition.service";
import {LanguageService} from "../service/language.service";

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit, AfterViewInit {
  outSideClick$ = new BehaviorSubject(false);
  heroes$!: Observable<Heros[]>;
  @ViewChild('searchComponent') searchComponent?: ElementRef;
  @ViewChild('globalSearchComp') globalSearchComp?: ElementRef;
  @ViewChild('searchPanel') searchPanel?: ElementRef;
  @ViewChild('searchBox') searchBox?: ElementRef;
  @ViewChild('searchInput') searchInput?: ElementRef;
  @ViewChild('searchLabel') searchLabel?: ElementRef;
  @ViewChild('dropDown') dropDown?: ElementRef;
  private searchTerms = new Subject<string>();
  serviceStarted = false;
  languageList: string[] = [];
  constructor(private heroService: HeroService,
              private renderer: Renderer2,
              private _location: Location,
              public service: VoiceRecognitionService,
              public languageService: LanguageService
  ) {
    this.service.init()

  }

  ngAfterViewInit(): void {
    this.renderer.listen(this.globalSearchComp?.nativeElement,'click',(e: Event)=> {
      if (e.target == this.globalSearchComp?.nativeElement) {
        this._location.back()
      }
    });
    }




  // Push a search term into the observable stream.
  search(value: String): void {
    this.searchTerms.next(value.trim());
  }


  ngOnInit(): void {
    this.getLanguageName();
    this.heroes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
    this.service.voiceText.subscribe({
      next: (v) => this.search(v),
    });
  }
  async startService(){
    this.service.start();

  }

  stopService(){
    this.service.stop();
  }
  getLanguageName():void {
    this.languageService.getLanguages().map(lang=> {
      this.languageList?.push(lang.language)
    })
  }
  getLgSelected(e: any):void {
    this.languageService.getLanguages().map(lang=> {
      if (lang.language === e.value) {
        this.service.recognition.lang = lang.languageCode;
      }
    })
  }



}
