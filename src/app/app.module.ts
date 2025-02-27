import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PersonComponent } from './person/person.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { PersonFormComponent } from './person/person-form/person-form.component';

@NgModule({
  declarations: [AppComponent, PersonComponent, PersonFormComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
