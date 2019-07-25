import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() pageHeaderEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onClick(page: string) {
    this.pageHeaderEvent.emit(page);
  }
}
