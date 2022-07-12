import { Component, OnInit } from '@angular/core';
import {AsyncSubject, BehaviorSubject, from, multicast, ReplaySubject, Subject} from 'rxjs'
@Component({
  selector: 'app-test-script',
  templateUrl: './test-script.component.html',
  styleUrls: ['./test-script.component.css']
})
export class TestScriptComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.test();
  }

  test():void {
    const subject = new AsyncSubject();

    subject.subscribe({
      next: (v) => console.log(`observerA: ${v}`),
    });

    subject.next(1);
    subject.next(2);
    subject.next(3);
    subject.next(4);

    subject.subscribe({
      next: (v) => console.log(`observerB: ${v}`),
    });

    subject.next(5);
    subject.complete();


  }



}
