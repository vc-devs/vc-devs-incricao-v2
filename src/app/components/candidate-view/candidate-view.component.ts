import { Component, OnInit } from '@angular/core';
import { Candidate } from 'src/app/models/candidates/candidates.models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-candidate-view',
  templateUrl: './candidate-view.component.html',
  styleUrls: ['./candidate-view.component.css']
})
export class CandidateViewComponent implements OnInit {
  public candidate: Candidate;


  constructor(private active: ActivatedRoute,) { }

  ngOnInit() {
    const id = this.active.snapshot.params['id'];
    //this.client = this.dataPersistence.get('client', id);
  }

}
