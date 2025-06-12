import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card'
import { MatInputModule } from '@angular/material/input'
import { CardComponentComponent } from './components/card-component/card-component.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule
    
  ],
  exports: [
    MatCardModule,
    MatButtonModule,
    MatInputModule
  ]
})
export class AppModule { }