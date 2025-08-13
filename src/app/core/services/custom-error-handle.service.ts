import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class CustomErrorHandleService implements ErrorHandler {
  private router = inject(Router);
  constructor() {}

  handleError(error: Error | HttpErrorResponse): void {
    throw new Error('Method not implemented.');
  }
}
