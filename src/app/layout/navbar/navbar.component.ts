import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  popupVisible = false;

  emailButtonOptions: any;

  closeButtonOptions: any;

  positionOf?: string;
  constructor() { }

  ngOnInit(): void {
    this.closeButtonOptions = {
      text: 'Close',
      onClick() {
        this.popupVisible = false;
      },
    };
  }

  @Input() title = '';
  showMenu = false;
  toggleNavbar(){
    this.showMenu = !this.showMenu;
  }
  showInfo() {
    this.popupVisible = true;
  }

  // openModal() {
  //   this.modalService.open();
  // }
  //
  // closeModal() {
  //   this.modalService.close();
  // }


}
