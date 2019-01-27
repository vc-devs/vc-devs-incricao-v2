import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { ClientFormComponent } from './components/client-form/client-form.component';
import { ClientListComponent } from './components/client-list/client-list.component';
import { ClientViewComponent } from './components/client-view/client-view.component';

const routes: Routes = [

  { path: '', component: ClientListComponent },
  { path: 'cadastrar', component: ClientFormComponent, data: {type: 'register'} },
  { path: 'editar/:id', component: ClientFormComponent, data: {type: 'edit'} },
  { path: 'cliente/:id', component: ClientViewComponent },
  { path: '**', redirectTo: '' },

];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
