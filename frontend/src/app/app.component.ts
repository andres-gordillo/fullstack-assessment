import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormComponentComponent } from "./components/form-component/form-component.component";
import { CardComponentComponent } from "./components/card-component/card-component.component";
import { ListComponentComponent } from "./components/list-component/list-component.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormComponentComponent, CardComponentComponent, ListComponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
}
