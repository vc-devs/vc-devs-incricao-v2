import { Component, OnInit, Input } from '@angular/core';
import { Client } from 'src/app/models/clients/clients.model';
import { DataPersistenceService } from 'src/app/services/data-persistence/data-persistence.service';
import { listObjShow } from 'src/app/helpers/animations/animations.helper';
import { NotifyService } from 'src/app/services';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css'],
  animations: [listObjShow]
})
export class ClientListComponent implements OnInit {

  public client: Client;

  private clientsBeforeFiltred;
  public clientsAfterFiltred;
  public search: string;

  @Input() clients: Client[];


  constructor(private dataPersistence: DataPersistenceService, private notify: NotifyService) { }


  private hasFilter(client: Client, filter: string): boolean {
    return (
      client.name.toLowerCase().includes(this.replace(filter.toLowerCase())) ||
      client.cpf.toString().toLowerCase().includes(filter.toString().toLowerCase()));
  }


  private replace(name: String) {

    let _name = name.toLowerCase();
    _name = _name.replace(new RegExp('[ÁÀÂÃ]', 'gi'), 'a');
    _name = _name.replace(new RegExp('[ÉÈÊ]', 'gi'), 'e');
    _name = _name.replace(new RegExp('[ÍÌÎ]', 'gi'), 'i');
    _name = _name.replace(new RegExp('[ÓÒÔÕ]', 'gi'), 'o');
    _name = _name.replace(new RegExp('[ÚÙÛ]', 'gi'), 'u');
    return _name;
  }


  public loadData() {
    this.clientsBeforeFiltred = this.dataPersistence.read('client');
    this.clientsAfterFiltred = this.clientsBeforeFiltred;

  }


  public selectDelete($event: any, client: Client) {
    $event.stopPropagation();
    this.client = client;
  }


  public delete() {
    this.dataPersistence.delete('client', this.client);
    this.cancel();
    this.loadData();
    this.notify.show('success', 'Cliente excluido com sucesso');
  }


  public cancel() {
    this.client = null;
  }


  public handleFilter() {
    if (!this.search || this.search === '' || !this.clientsAfterFiltred) {
      this.clientsAfterFiltred = this.clientsBeforeFiltred;
      return;
    }

    this.clientsAfterFiltred = this.clientsBeforeFiltred.filter(client => this.hasFilter(client, this.search));

  }


  ngOnInit() {
    this.loadData();
  }


}
