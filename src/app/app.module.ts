import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent as IndexClientsComponent } from './clients/components/index/index.component';
import { CreateComponent as CreateComponentClients} from './clients/components/create/create.component';
import { NavigationComponent } from './shared/components/navigation/navigation.component';
import { ClientService } from './clients/services/client.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {IndexComponent as IndexProductsComponent } from './products/components/index/index.component';
import { CreateComponent as CreateComponentProducts } from './products/components/create/create.component';
import { CreateProductComponent } from './products/components/create/components/create-product/create-product.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexClientsComponent,
    CreateComponentClients,
    IndexProductsComponent,
    CreateComponentProducts,
    NavigationComponent,
    CreateProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
