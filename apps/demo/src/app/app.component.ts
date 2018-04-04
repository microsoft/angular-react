import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  disabled = true;
  dialogHidden = true;

  constructor() { }

  ngOnInit() {
  }

  toggle() {
    this.disabled = !this.disabled;
  }

  toggleDialog() {
    this.dialogHidden = !this.dialogHidden;
  }

  click() {
    console.log('clicked');
  }
}
