import { Component, signal, computed } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { CardComponentComponent } from '../card-component/card-component.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-component',
  imports: [CardComponentComponent, CommonModule],
  templateUrl: './list-component.component.html',
  styleUrl: './list-component.component.scss'
})
export class ListComponentComponent {

}
