import { Component } from '@angular/core';
import { Server } from './shared/server.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  servers = [
    new Server('Server', 'Matrix', 'This is matrix main server'),
    new Server('Storage', 'Storage-01', 'This is the matrix storage')];

    onServerCreated(server: Server) {
      this.servers.push(server);
    }

    onBlueprintCreated(server: Server) {
      this.servers.push(server);
    }
}
