import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';

interface ErrorMessage {
  error: string;
}

@Component({
  selector: 'app-error-page',
  imports: [],
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.css',
})
export class ErrorPageComponent {
  errorMessage: ErrorMessage = { error: '' };
  constructor(private router: Router) {
    this.errorMessage = router.getCurrentNavigation()?.extras
      .state as ErrorMessage;
    console.log(this.errorMessage);
  }
}
