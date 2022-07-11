import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
declare var webkitSpeechRecognition: any;
@Injectable({
  providedIn: 'root'
})
export class VoiceRecognitionService {

  constructor() { }
  recognition =  new webkitSpeechRecognition();
  isStoppedSpeechRecog = false;
  public text = '';
  public voiceText = new Subject<String>()
  tempWords?: string;

  init() {
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';
    this.recognition.addEventListener('nomatch', (e: Event) => {
      this.text = "unable to recognize the word"
    });

    this.recognition.addEventListener('error ', (e: Error) => {
      this.text = 'Error occurred in recognition: ' + e.message
    });
    this.recognition.addEventListener('result', (e: { results: Iterable<unknown> | ArrayLike<unknown>; }) => {
      const transcript = Array.from(e.results)
        .map((result:any) => result[0])
        .map((result) => result.transcript)
        .join('');
      this.tempWords = transcript;
    });


  }

  start() {
    this.isStoppedSpeechRecog = false;
    this.text = '';
    this.recognition.start();
    console.log("Speech recognition started")

    this.recognition.addEventListener('end', () => {
      if (!this.isStoppedSpeechRecog) {
        this.recognition.stop();
        this.isStoppedSpeechRecog = true;
        console.log("End speech recognition")
      } else {
        this.wordConcat()
      }
    });
  }
  stop() {
    this.isStoppedSpeechRecog = true;
    this.recognition.stop();

    console.log("End speech recognition");
  }

  wordConcat() {
    this.text = this.text + ' ' + this.tempWords;
    this.tempWords = '';
    this.voiceText.next(this.text.trim())
  }
}
