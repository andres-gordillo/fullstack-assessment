import { Component, signal, computed, input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent} from '@angular/material/card';
import { Message } from '../../models/message.model';
import { CustomDateFormatPipe } from '../../custom-date-format.pipe';
import { CustomPhonePipe } from '../../custom-phone-pipe.pipe';


@Component({
  selector: 'app-card-component',
  imports: [MatCard, MatCardContent, CustomDateFormatPipe, CustomPhonePipe],
  templateUrl: './card-component.component.html',
  styleUrl: './card-component.component.scss'
})
export class CardComponentComponent {

  message = input.required<Message>();

  readonly statusClass = computed(() => `status-${this.message().status}`)

  readonly statusText = computed(() => {
    switch (this.message().status) {
      case 'sent': return 'Sent';
      case 'failed': return 'Failed';
      case 'pending' : 
      default: return ' Pending'
    }
  })

  readonly messageLength = computed(() => this.message().message_content.length)

}
