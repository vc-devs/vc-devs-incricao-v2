import { Component, OnInit } from '@angular/core';
import { DataPersistenceService } from 'src/app/services';
import { ActivatedRoute } from '@angular/router';
import { Client } from 'src/app/models/clients/clients.model';

@Component({
  selector: 'app-client-view',
  templateUrl: './client-view.component.html',
  styleUrls: ['./client-view.component.css']
})
export class ClientViewComponent implements OnInit {
  public client: Client;


  constructor(private active: ActivatedRoute, private dataPersistence: DataPersistenceService ) { }


  ngOnInit() {
    const id = this.active.snapshot.params['id'];
    this.client = this.dataPersistence.get('client', id);
  }

}
