import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketioService } from '../services/socketio.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit, OnDestroy {
  itemsPerPage = 5;
  totalRecords: number;
  smallnumPages = 0;
  data: any = [];
  currentPage = 1;
  maxSize = 5;
  returnedData = [];
  subs: Subscription;
  connected = false;

  constructor(
    private socketioService: SocketioService
  ) { }

  ngOnInit(): void { }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.returnedData = this.data.slice(startItem, endItem);
  }

  connectSocket() {
    this.connected = true;
    this.socketioService.initSocket();

    this.subs = this.socketioService.listen('call')
      .pipe(
        tap((res) => {
          const currentDate = new Date();
          res.timestamp = currentDate.getTime();
        })
      )
      .subscribe(res => {
        this.data.unshift(res);
        this.returnedData = this.data.slice(0, this.itemsPerPage);
      });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
