import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Server } from '../shared/server.model';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {

  @Output() serverCreated = new EventEmitter<Server>();
  @Output() blueprintCreated = new EventEmitter<Server>();

  serverName: string;
  serverContent: string;

  constructor() { }

  ngOnInit() {

  }

  addServer() {
    console.log(this.serverName);
    console.log(this.serverContent);
    this.serverCreated.emit(new Server('Server', this.serverName, this.serverContent));
  }

  addBlueprint() {
    this.blueprintCreated.emit(new Server('Blueprint', this.serverName, this.serverContent));
  }
}
