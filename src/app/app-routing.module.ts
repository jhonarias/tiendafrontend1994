import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent as IndexClientesComponent } from './clients/components/index/index.component';
import { CreateComponent as CreateComponentClient } from './clients/components/create/create.component';
import { IndexComponent as IndexProductsComponent } from './products/components/index/index.component';
import { CreateComponent as CreateComponentProduct } from './products/components/create/create.component';

const routes: Routes = [
  {
    path: 'clients', component: IndexClientesComponent
  },
  {
    path: 'clients/create', component: CreateComponentClient
  },
  {
    path: 'clients/update/:id', component: CreateComponentClient
  },
  {
    path: 'products', component: IndexProductsComponent
  },
  {
    path: 'products/create', component: CreateComponentProduct
  },
  {
    path: 'products/update/:id', component: CreateComponentProduct
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
