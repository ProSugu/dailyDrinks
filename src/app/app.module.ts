import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NumberDirective } from '../app/_helper/directives/number.directive'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddComponent } from './drinks/add/add.component';
import { ListComponent } from './drinks/list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NumberDirective,
    AddComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
