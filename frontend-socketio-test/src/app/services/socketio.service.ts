import * as io from 'socket.io-client';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  data: any;

  socket: any;

  constructor() { }

  // setupSocketConnection() {
  //   this.socket = io(environment.SOCKET_ENDPOINT);
  //   this.socket.emit('my message', 'Hello from Angular');

  //   this.socket.on('my broadcast', (data: string) => {
  //     console.log(data);
  //   });

  //   this.socket.on('call', (msg: { ID: string, duration: number }) => {
  //     console.log(msg);
  //     this.data = msg;
  //   });
  // }

  initSocket() {
    this.socket = io(environment.SOCKET_ENDPOINT);
    // this.socket.on('call', (msg) => {
    //   console.log(msg);
    // });
  }

  listen(eventName: string): Observable<any> {
    return new Observable<any>((observer) => {
      this.socket.on(eventName, (data: any) => {
        observer.next(data);
      })
    })
  }

}
