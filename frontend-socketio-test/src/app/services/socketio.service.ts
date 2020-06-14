import * as io from 'socket.io-client';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  socket: any;

  initSocket() {
    this.socket = io(environment.SOCKET_ENDPOINT);
  }

  listen(eventName: string): Observable<any> {
    return new Observable<any>((observer) => {
      this.socket.on(eventName, (data: any) => {
        observer.next(data);
      })
    })
  }

}
