import { Routes } from '@angular/router';
import { ErrorPageComponent } from '@pages/error-page/error-page.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('app/layout/layout.component').then((m) => m.LayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('@pages/list-to-do/list-to-do.component').then(
            (m) => m.ListToDOComponent
          ),
      },
      {
        path: 'create',
        loadComponent: () =>
          import('@pages/create-to-do/create-to-do.component').then(
            (m) => m.CreateTodoComponent
          ),
      },
      {
        path: 'error-page',
        loadComponent: () =>
          import('@pages/error-page/error-page.component').then(
            (m) => m.ErrorPageComponent
          ),
      },
    ],
  },
];
