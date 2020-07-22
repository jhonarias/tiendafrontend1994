import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './clients/components/index/index.component';
import { CreateComponent } from './clients/components/create/create.component';

const routes: Routes = [
  {
    path: 'clients', component: IndexComponent
  },
  {
    path: 'clients/create', component: CreateComponent
  },
  {
    path: 'clients/update/:id', component: CreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
