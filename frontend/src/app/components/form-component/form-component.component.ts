import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatInput, MatFormField, MatLabel } from '@angular/material/input';
import { MessageService } from '../../services/message.service';


@Component({
  selector: 'app-form-component',
  imports: [MatInput, MatFormField, MatCard, MatCardContent, MatCardHeader, MatCardTitle, MatButton, MatLabel ],
  templateUrl: './form-component.component.html',
  styleUrl: './form-component.component.scss'
})
export class FormComponentComponent {
  private formBuilder = inject(FormBuilder)
  messageService = inject(MessageService)

  private isSubmitting = signal(false)



  messageForm: FormGroup = this.formBuilder.group({
    phoneNumber: ['',
      [
        Validators.required,
        Validators.pattern(/^\+?[1-9]\d{1,14}$/)
      ]
    ],
    messageContent: ['',
      [
        Validators.required,
        Validators.maxLength(250)
      ]
    ]
  })


  phoneErrorState = computed(() => {
    const phoneControl = this.messageForm.get('phoneNumber')
    if(phoneControl?.hasError('pattern')) return 'Please enter a valid number';
    if(phoneControl?.hasError('required')) return 'A phone number is required!';
    return null
  })

  messageErrorState = computed(() => {
    const messageControl = this.messageForm.get('messageContent')
    if(messageControl?.hasError('maxLength')) return 'Message is too long.';
    if(messageControl?.hasError('required')) return 'Message is required!';
    return null
  })

  messageCounter = computed(() => {
    return this.messageForm.get('messageContent')?.value?.length || 0
  })

  buttonDisabled = computed(() => {
    return this.messageForm.invalid || this.isSubmitting() || this.messageService.checkLoading()
  })



  async onSubmit(): Promise<void> {
    if (this.messageForm.valid && !this.isSubmitting()) {
      this.isSubmitting.set(true)
    }

    try {
      const messageData = {
        phone_number: this.messageForm.get('phone_number')?.value,
        message_content: this.messageForm.get('message_content')?.value
      };
      await this.messageService.sendMessage(messageData);
      this.messageForm.reset()
    } catch (e) {
      console.log('Error Message:', e)
    } finally {
      this.isSubmitting.set(false)
    }

    
  }



  

}
