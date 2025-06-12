import { Component, computed, EventEmitter, inject, Output, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatInput, MatLabel } from '@angular/material/input';
import { MatFormField, MatError } from '@angular/material/form-field';
import { MessageService } from '../../services/message.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { EMPTY, map, startWith } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Message } from '../../models/message.model';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-form-component',
  imports: [MatInput, MatFormField, MatButton, FormsModule, MatError, CommonModule],
  templateUrl: './form-component.component.html',
  styleUrl: './form-component.component.scss'
})
export class FormComponentComponent {
  messageService = inject(MessageService)

  @Output() messageSent = new EventEmitter<Message>()

  private phoneNumberControl = signal('')
  private messageContentControl = signal('')
  private isSubmittingControl = signal(false)

  readonly phoneNumber = this.phoneNumberControl.asReadonly()
  readonly messageContent = this.messageContentControl.asReadonly()
  readonly isSubmitting = this.isSubmittingControl.asReadonly()

  // Computed States

  messageCounter = computed(() => {
    return this.messageContentControl().length || 0
  })

  phoneError = computed(() => {
    const value = this.phoneNumberControl()
    if(!value?.trim()) {
      return 'Phone number is required'
    }

    const phonePatternCheck = /^\+?[1-9]\d{1,14}$/
    if (!phonePatternCheck.test(value)) {
      return 'Please enter valid number!'
    }

    return null
  })

  messageContentError = computed(() => {
    const value = this.messageContentControl()
    if(!value.trim()) {
      return 'Message is required'
    }

    if (value.length > 250) {
      return 'Message is too long'
    }

    return null
  })

  formValid = computed(() => {
    return this.phoneError() === null && this.messageContentError() === null
  })

  buttonDisabled = computed(() => {
    return !this.formValid() || this.isSubmitting() || this.messageService.checkLoading()
  })


  buttonText = computed(() => {
    if(this.isSubmitting()) {
      return "Sending"
    }
    else {
      return "Submit"
    }
  })

  //update signal methods

  updatePhoneNumber(value: string): void {
    this.phoneNumberControl.set(value)
  }
  updateMessageContent(value: string): void {
    this.messageContentControl.set(value)
  }





  onSubmit(event: Event): void {
    if(event) {
      event.preventDefault()
    }
    console.log('test')
    if (!this.formValid() || this.isSubmitting()) {
      return
    }

    this.isSubmittingControl.set(true);
    const messageData = {
      phone_number: this.phoneNumberControl(),
      message_content: this.messageContentControl()
    };

    this.messageService.sendMessage(messageData.message_content, messageData.phone_number).subscribe({
      next: (message) => {
        this.messageSent.emit(message)
        this.messageContentControl.set('')
        this.phoneNumberControl.set('')
        this.isSubmittingControl.set(false)

        window.alert('Message has been sent!')
      },
      error: (error) => {
        console.log(error)
        this.isSubmittingControl.set(false)
      }
    })
  }



  

}
