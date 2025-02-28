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
        this.aiResponse = this.formatResponse(response.response);
        this.loading = false;
      },  
      error: (error) => {
        this.aiResponse = "<p>Error contacting AI. Please try again.</p>";
        console.error("API Error:", error);
        this.loading = false;
      }   
    }); 
  }

  private formatResponse(response: string): string {
    if (!response) return "";

    // Convert **Bold** to <strong>Bold</strong>
    response = response.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    // Convert numbered lists (1. item) into <ul><li>item</li></ul>
    response = response.replace(/(\d+)\.\s(.+?)(?=\n\d+\.|\n\n|$)/gs, "<li>$2</li>");
    response = response.replace(/(<li>.*<\/li>)/gs, "<ul>$1</ul>");

    // Convert line breaks to paragraphs
    response = response.replace(/\n\n/g, "</p><p>");
    response = `<p>${response}</p>`;

    return response;
  }
}


