import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  userMessage: string = "";
  aiResponse: string = "";
  loading: boolean = false;

  private apiUrl = "https://ulu6djmvclioldyzuxvmfntwau0rcwht.lambda-url.us-west-2.on.aws"; // Replace with your actual API Gateway URL

  constructor(private http: HttpClient) {}

  sendMessage() {
    if (!this.userMessage.trim()) return;

    this.loading = true;
    this.http.post<any>(this.apiUrl, { message: this.userMessage }).subscribe({
      next: (response) => {
        this.aiResponse = response.response;
        this.loading = false;
      },
      error: (error) => {
        this.aiResponse = "Error contacting AI. Please try again.";
        console.error("API Error:", error);
        this.loading = false;
      }
    });
  }
}

