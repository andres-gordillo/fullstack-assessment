import { Component, signal, computed, OnInit, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { CardComponentComponent } from '../card-component/card-component.component';
import { CommonModule } from '@angular/common';
import { MessageService } from '../../services/message.service';
import { Message, MessageResponse } from '../../models/message.model';
import { Subscription } from 'rxjs';
import { response } from 'express';
import { error } from 'console';

@Component({
  selector: 'app-list-component',
  imports: [CardComponentComponent, CommonModule],
  templateUrl: './list-component.component.html',
  styleUrl: './list-component.component.scss'
})
export class ListComponentComponent implements OnInit {
  messageService = inject(MessageService)
  private subcriptions= new Subscription()

  messages = this.messageService.gatheredMessages
  loading = this.messageService.checkLoading

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(): void {
    const sub = this.messageService.getMessages().subscribe({
      next: (response) => {

      }, 
      error: (error) => {

      }
    })
    this.subcriptions.add(sub)
  }

  refreshPage(): void {
    this.loadMessages()
  }

  trackById(index: number, message: Message): string {
    return message._id || index.toString()
  }

}
