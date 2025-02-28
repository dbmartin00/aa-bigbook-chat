import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { inject } from '@vercel/analytics';

inject();

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient()]
});

