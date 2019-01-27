import { Component, OnInit, Input } from '@angular/core';
import { listObjShow } from 'src/app/helpers/animations/animations.helper';
import { Candidate } from 'src/app/models/candidates/candidates.models';
import { NotifyService } from 'src/app/services';


@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css'],
  animations: [listObjShow]
})
export class CandidateListComponent implements OnInit {

  public candidate: Candidate;

  private candidatesBeforeFiltred;
  public candidatesAfterFiltred;
  public search: string;

  @Input() candidates: Candidate[];

  constructor(private notify: NotifyService) { }

  private hasFilter(candidate: Candidate, filter: string): boolean {
    return (
      candidate.name.toLowerCase().includes(this.replace(filter.toLowerCase())) ||
      candidate.document_number.toString().toLowerCase().includes(filter.toString().toLowerCase()));
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
    //this.candidatesBeforeFiltred = this.dataPersistence.read('candidate');
    this.candidatesAfterFiltred = this.candidatesBeforeFiltred;

  }


  public selectDelete($event: any, candidate: Candidate) {
    $event.stopPropagation();
    this.candidate = candidate;
  }


  public delete() {
    //this.dataPersistence.delete('client', this.client);
    this.cancel();
    this.loadData();
    this.notify.show('success', 'Candidato excluido com sucesso');
  }

  public cancel() {
    this.candidate = null;
  }


  public handleFilter() {
    if (!this.search || this.search === '' || !this.candidatesAfterFiltred) {
      this.candidatesAfterFiltred = this.candidatesBeforeFiltred;
      return;
    }

    this.candidatesAfterFiltred = this.candidatesBeforeFiltred.filter(candidate => this.hasFilter(candidate, this.search));

  }


  ngOnInit() {
    this.loadData();
  }

}
