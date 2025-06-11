import { Component, signal, computed } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-card-component',
  imports: [MatCard, MatButton, MatCardHeader, MatCardContent, MatCardTitle],
  templateUrl: './card-component.component.html',
  styleUrl: './card-component.component.scss'
})
export class CardComponentComponent {

}
