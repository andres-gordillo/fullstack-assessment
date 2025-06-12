import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatInput, MatFormField, MatLabel } from '@angular/material/input';


@Component({
  selector: 'app-form-component',
  imports: [MatInput, MatFormField, MatCard, MatCardContent, MatCardHeader, MatCardTitle, MatButton, MatLabel ],
  templateUrl: './form-component.component.html',
  styleUrl: './form-component.component.scss'
})
export class FormComponentComponent {

}
