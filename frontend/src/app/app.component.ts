import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormComponentComponent } from "./components/form-component/form-component.component";
import { ListComponentComponent } from "./components/list-component/list-component.component";
import { Message } from './models/message.model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormComponentComponent, ListComponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @ViewChild('listComponent') listComponentComponent!: ListComponentComponent

  onNewMessage(message: Message): void {
    console.log('Reload')
    if(this.listComponentComponent) {
      this.listComponentComponent.refreshPage()
    }
  }
}
