import { Component, OnInit, AfterContentInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Candidate } from 'src/app/models/candidates/candidates.models'
import { DataPersistenceService } from 'src/app/services/data-persistence/data-persistence.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilderValidators } from 'src/app/helpers/validators';
import { NotifyService } from 'src/app/services';


@Component({
  selector: 'app-candidate-form',
  templateUrl: './candidate-form.component.html',
  styleUrls: ['./candidate-form.component.css']
})
export class CandidateFormComponent implements OnInit, AfterContentInit {
  private type: string;
  private candidate: Candidate;
  public form: FormGroup;
  

  constructor(
    private dataPersistence: DataPersistenceService,
    private fb: FormBuilder,
    private router: Router,
    private active: ActivatedRoute,
    private custonValidators: FormBuilderValidators,
    private notify: NotifyService
  ) { }

  private initFormControls(): void {

    if (this.type === 'edit') {
      const id = this.active.snapshot.params['id'];
      // this.candidate = this.dataPersistence.get('client', id);
  
    }

    this.form = this.fb.group({
      name: [this.candidate ? this.candidate.name : '', [Validators.required, this.custonValidators.nameFormat]],
      age: [this.candidate ? this.candidate.birthdate : '', [Validators.required, Validators.pattern('^[0-9]{1,3}$'), this.custonValidators.ageFormat]],
      // tslint:disable-next-line:max-line-length
      //cpf: [this.candidate ? this.candidate.document_number : '', [Validators.required, this.custonValidators.cpfFormat, Validators.pattern('^([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})$')]],
      phone: [this.candidate ? this.candidate.phone : '', [Validators.required]],
      email: [this.candidate ? this.candidate.email : '', [Validators.required, this.custonValidators.emailFormat]]
    });

  }

  public set() {
    if (this.form.valid) {
      let data;

      data = this.form.value;

      if (this.type === 'edit') {
        data = {
          ...data,
          id: this.candidate.id
        };
      }

      this.dataPersistence[this.type === 'edit' ? 'update' : 'create']('candidate', data);
      this.notify.show('success', `candidate ${this.type === 'edit' ? 'atualizado' : 'criado'} com sucesso`);

      this.router.navigate(['/']);

    }
  }

  public forceSubmit() {
    const submit = document.getElementById('submit');
    submit.click();
  }

  ngOnInit() {
    this.type = this.active.snapshot.data['type'];
    this.initFormControls();
  }

  ngAfterContentInit() {
    //throw new Error("Method not implemented.");
  }

}
