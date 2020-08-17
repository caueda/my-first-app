import { Component, OnInit, Input } from '@angular/core';
import { Server } from '../shared/server.model';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css']
})
export class ServerElementComponent implements OnInit {
  @Input() servers: Server[];

  constructor() { }

  ngOnInit() {
  }

}
